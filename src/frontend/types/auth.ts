export enum UserRoleEnum {
  ADMIN = "admin",
  STAFF = "staff",
  VETERINARIAN = "veterinarian",
  CLIENT = "client",
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

export interface AuthState {
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
}

export interface FormState {
  formData: RegisterFormData;
  showPassword: boolean;
  showConfirmPassword: boolean;
  isChecked: boolean;
}