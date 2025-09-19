import { userRegister } from "../lib/api/AuthApi";
import { RegisterFormData } from "../types/auth";

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
    // Handle different error types
    let errorMessage = "Registration failed!";

    if (responseBody.errors) {
      if (responseBody.errors.username) {
        errorMessage = "Username already exists!";
      } else if (responseBody.errors.email) {
        errorMessage = "Email already exists!";
      } else if (typeof responseBody.errors === "string") {
        errorMessage = responseBody.errors;
      } else if (typeof responseBody.errors === "object") {
        const firstError = Object.values(responseBody.errors)[0];
        errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
      }
    } else if (responseBody.message) {
      errorMessage = responseBody.message;
    }

    throw new Error(errorMessage);
  }
};
