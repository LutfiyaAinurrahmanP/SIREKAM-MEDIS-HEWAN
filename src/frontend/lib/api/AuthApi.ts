import { LoginFormData } from "../../types/auth";

export enum UserRoleEnum {
  ADMIN = "admin",
  STAFF = "staff",
  VETERINARIAN = "veterinarian",
  CLIENT = "client",
}

interface UserRegisterProps {
  username: string;
  fullname: string;
  email: string;
  password: string;
  role: UserRoleEnum;
  phone: string;
}

export const userRegister = async ({
  username,
  fullname,
  email,
  password,
  role,
  phone,
}: UserRegisterProps) => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      username,
      fullname,
      email,
      password,
      role,
      phone,
    }),
  });
};

export const userLogin = async ({ username, password }: LoginFormData) => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
};

export const userLogout = async (): Promise<Response> => {
  const token = localStorage.getItem("auth_token");

  return await fetch(`${import.meta.env.VITE_API_PATH}/logout`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "TOKEN-SESSION": token || "",
    },
  });
};
