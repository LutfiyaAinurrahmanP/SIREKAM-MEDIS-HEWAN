import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { UniqueError } from "../error/unique-error";
import { User } from "../generated/prisma";
import {
  CreateUserRequest,
  LoginUserRequest,
  RegisterUserRequest,
  toUserResponse,
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

  static async list(): Promise<UserResponse[]> {
    const user = await prismaClient.user.findMany({
      orderBy: {
        id: "desc",
      },
    });

    return user.map(toUserResponse);
  }
}
