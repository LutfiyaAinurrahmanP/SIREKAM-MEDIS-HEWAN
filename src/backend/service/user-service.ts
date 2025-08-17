import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  RegisterUserRequest,
  toUserResponse,
  UserResponse,
} from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt";

export class UserService {
  static async register(req: RegisterUserRequest): Promise<UserResponse> {
    const registerRequest = Validation.validate(UserValidation.REGISTER, req);
    const checkUserExists = await prismaClient.user.count({
      where: {
        username: req.username,
      },
    });

    if (checkUserExists != 0) {
      throw new ResponseError(400, "Username sudah dipakai!");
    }

    registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

    const user = await prismaClient.user.create({
      data: registerRequest,
    });

    return toUserResponse(user);
  }
}
