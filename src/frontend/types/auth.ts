export enum UserRoleEnum {
  ADMIN = "admin",
  STAFF = "staff",
  VETERINARIAN = "veterinarian",
  CLIENT = "client",
}

export interface User {
  username: string;
  fullname: string;
  email: string;
  role: UserRoleEnum;
  phone: string;
}

export interface AuthState {
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
}

export interface RegisterFormData {
  username: string;
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRoleEnum;
  phone: string;
}

export interface RegisterFormState {
  formData: RegisterFormData;
  showPassword: boolean;
  showConfirmPassword: boolean;
  isChecked: boolean;
}

export interface LoginFormData {
  username: string;
  password: string;
}

export interface LoginFormState {
  formData: LoginFormData;
  showPassword: boolean;
}

export const ROLE_ROUTES = {
  [UserRoleEnum.ADMIN]: "/admin",
  [UserRoleEnum.STAFF]: "/staff",
  [UserRoleEnum.VETERINARIAN]: "/veterinarian",
  [UserRoleEnum.CLIENT]: "/client",
} as const;
