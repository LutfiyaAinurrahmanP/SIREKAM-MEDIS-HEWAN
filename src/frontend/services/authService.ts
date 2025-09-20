import { userLogin, userRegister } from "../lib/api/AuthApi";
import { LoginFormData, RegisterFormData } from "../types/auth";

// Helper function untuk extract error dari backend
const extractErrorMessage = (responseBody: any): string => {
  if (responseBody.errors) {
    if (typeof responseBody.errors === "string") {
      return responseBody.errors;
    }

    if (typeof responseBody.errors === "object") {
      const errorPriority = [
        "username",
        "fullname",
        "phone",
        "email",
        "password",
        "role",
      ];

      for (const field of errorPriority) {
        if (responseBody.errors[field]) {
          const fieldErrors = responseBody.errors[field];

          const typePriority = ["unique", "required", "min", "max", "enum"];

          for (const type of typePriority) {
            if (fieldErrors[type]) {
              return fieldErrors[type];
            }
          }

          // Fallback: ambil error pertama dari field
          const firstErrorKey = Object.keys(fieldErrors)[0];
          return fieldErrors[firstErrorKey];
        }
      }

      // Fallback: ambil error pertama yang ada
      const firstField = Object.keys(responseBody.errors)[0];
      const fieldErrors = responseBody.errors[firstField];
      const firstErrorKey = Object.keys(fieldErrors)[0];
      return fieldErrors[firstErrorKey];
    }
  }

  if (responseBody.message) {
    return responseBody.message;
  }

  return "Registrasi gagal!";
};

export const registerUser = async (data: RegisterFormData): Promise<any> => {
  const response = await userRegister({
    username: data.username,
    fullname: data.fullname,
    email: data.email,
    password: data.password,
    role: data.role,
    phone: data.phone,
  });

  const responseBody = await response.json();

  if (response.status === 201) {
    return responseBody;
  } else {
    // Extract error message from backend response
    const errorMessage = extractErrorMessage(responseBody);
    throw new Error(errorMessage);
  }
};

export const loginUser = async (data: LoginFormData): Promise<any> => {
  const response = await userLogin({
    username: data.username,
    password: data.password,
  });

  const responseBody = await response.json();

  if (response.status === 200) {
    return responseBody;
  } else {
    const errorMessage = extractErrorMessage(responseBody);
    throw new Error(errorMessage);
  }
};
