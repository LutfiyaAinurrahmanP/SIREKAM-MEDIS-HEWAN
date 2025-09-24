import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { UniqueError } from "../error/unique-error";
import { User } from "../generated/prisma";
import {
  CreateUserRequest,
  LoginUserRequest,
  RegisterUserRequest,
  toUserResponse,
  UpdateUserRequest,
  UserResponse,
} from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export class UserService {
  static async register(req: RegisterUserRequest): Promise<UserResponse> {
    const registerRequest = Validation.validate(UserValidation.REGISTER, req);
    const checkUserExists = await prismaClient.user.count({
      where: {
        username: req.username,
      },
    });

    if (checkUserExists != 0) {
      throw new UniqueError("username", "Username sudah dipakai!");
    }

    const checkEmailExists = await prismaClient.user.count({
      where: {
        email: registerRequest.email,
      },
    });

    if (checkEmailExists != 0) {
      throw new UniqueError("email", "Email sudah dipakai!");
    }

    registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

    const user = await prismaClient.user.create({
      data: registerRequest,
    });

    return toUserResponse(user);
  }

  static async login(req: LoginUserRequest): Promise<UserResponse> {
    const loginRequest = Validation.validate(UserValidation.LOGIN, req);

    let user = await prismaClient.user.findUnique({
      where: {
        username: loginRequest.username,
      },
    });

    if (!user) {
      throw new ResponseError(400, "Username atau kata sandi salah!");
    }

    const isPasswordValid = await bcrypt.compare(
      loginRequest.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new ResponseError(400, "Username atau kata sandi salah!");
    }

    user = await prismaClient.user.update({
      where: {
        username: loginRequest.username,
      },
      data: {
        token: uuid(),
      },
    });

    const response = toUserResponse(user);
    response.token = user.token;

    return response;
  }

  static async logout(user: User): Promise<UserResponse> {
    const result = await prismaClient.user.update({
      where: {
        username: user.username,
      },
      data: {
        token: null,
      },
    });

    return toUserResponse(result);
  }

  static async create(req: CreateUserRequest): Promise<UserResponse> {
    const createRequest = Validation.validate(UserValidation.CREATE, req);

    const record = {
      ...createRequest,
      created_at: new Date(),
    };

    const checkUserMustExists = await prismaClient.user.count({
      where: {
        username: req.username,
      },
    });

    if (checkUserMustExists != 0) {
      throw new UniqueError("username", "Username sudah dipakai!");
    }

    const checkEmailExists = await prismaClient.user.count({
      where: {
        email: createRequest.email,
      },
    });

    if (checkEmailExists != 0) {
      throw new UniqueError("email", "Email sudah dipakai!");
    }

    createRequest.password = await bcrypt.hash(createRequest.password, 10);

    const user = await prismaClient.user.create({
      data: record,
    });

    return toUserResponse(user);
  }

  static async list(
    page: number = 1,
    perPage: number = 10
  ): Promise<{
    data: UserResponse[];
    pagination: {
      current_page: number;
      total_pages: number;
      total_items: number;
      per_page: number;
    };
  }> {
    const totalItems = await prismaClient.user.count();

    if (totalItems === 0) {
      throw new ResponseError(404, "Data user tidak ditemukan!");
    }

    const users = await prismaClient.user.findMany({
      orderBy: { id: "desc" },
      skip: (page - 1) * perPage,
      take: perPage,
    });

    return {
      data: users.map(toUserResponse),
      pagination: {
        current_page: page,
        total_pages: Math.ceil(totalItems / perPage),
        total_items: totalItems,
        per_page: perPage,
      },
    };
  }

  static async checkUserMustExists(userId: number) {
    const user = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new ResponseError(404, "Data user tidak ditemukan!");
    }

    return user;
  }

  static async get(userId: number): Promise<UserResponse> {
    const user = await this.checkUserMustExists(userId);
    return toUserResponse(user);
  }

  static async update(req: UpdateUserRequest): Promise<UserResponse> {
    const updateRequest = Validation.validate(UserValidation.UPDATE, req);
    await this.checkUserMustExists(updateRequest.id);
    const user = await prismaClient.user.update({
      where: {
        id: updateRequest.id,
      },
      data: {
        ...updateRequest,
        updated_at: new Date(),
      },
    });
    return toUserResponse(user);
  }

  static async delete(userId: number): Promise<UserResponse> {
    const deleteRequest = await this.checkUserMustExists(userId);
    const user = await prismaClient.user.delete({
      where: {
        id: deleteRequest.id,
      },
    });
    return user;
  }
}
