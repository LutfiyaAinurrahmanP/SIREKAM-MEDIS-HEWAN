import { Roles, User } from "../generated/prisma";

export type UserResponse = {
  id: number;
  username: string;
  fullname: string;
  email: string;
  role: Roles;
  phone: string;
  token?: string | null;
  created_at: Date | null;
  updated_at: Date | null;
};

export type RegisterUserRequest = {
  username: string;
  fullname: string;
  email: string;
  password: string;
  role: Roles;
  phone: string;
};

export type LoginUserRequest = {
  username: string;
  password: string;
};

export type CreateUserRequest = {
  username: string;
  fullname: string;
  email: string;
  password: string;
  role: Roles;
  phone: string;
};

export type UpdateUserRequest = {
  id: number;
  username: string;
  fullname: string;
  email: string;
  password: string;
  role: Roles;
  phone: string;
};

export function toUserResponse(user: User): UserResponse {
  return {
    id: user.id,
    username: user.username,
    fullname: user.fullname,
    email: user.email,
    role: user.role,
    phone: user.phone,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };
}
