import { userLogin, userRegister } from "../lib/api/AuthApi";
import { LoginFormData, RegisterFormData } from "../types/auth";

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
    const errorMessage = extractRegisterErrorMessage(responseBody);
    throw new Error(errorMessage);
  }
};

// 👈 Update login service untuk handle token
export const loginUser = async (data: LoginFormData): Promise<any> => {
  const response = await userLogin({
    username: data.username,
    password: data.password,
  });

  const responseBody = await response.json();

  if (response.status === 200) {
    // Assuming backend returns token in response
    // Adjust based on your actual API response structure
    return {
      user: responseBody.data,
      token:
        responseBody.token ||
        response.headers.get("SESSION-TOKEN") ||
        "default-token",
    };
  } else {
    const errorMessage =
      responseBody.errors || "Username atau kata sandi salah!";
    throw new Error(errorMessage);
  }
};

export const logoutUser = async (): Promise<void> => {
  // Get token from localStorage or Redux state
  const token = localStorage.getItem("auth_token");

  if (!token) return;

  try {
    // Call logout endpoint based on user role
    // You'll need to adjust this based on your backend API
    const response = await fetch("/api/logout", {
      method: "DELETE",
      headers: {
        "SESSION-TOKEN": token,
        "Content-Type": "application/json",
      },
    });

    // Handle response if needed
    if (!response.ok) {
      console.warn("Logout request failed, but continuing with local logout");
    }
  } catch (error) {
    console.warn(
      "Logout request failed, but continuing with local logout:",
      error
    );
  }
};

// Helper untuk register errors
const extractRegisterErrorMessage = (responseBody: any): string => {
  if (responseBody.errors) {
    if (typeof responseBody.errors === "string") {
      return responseBody.errors;
    }

    if (typeof responseBody.errors === "object") {
      const errorPriority = [
        "username",
        "email",
        "fullname",
        "password",
        "phone",
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

          const firstErrorKey = Object.keys(fieldErrors)[0];
          return fieldErrors[firstErrorKey];
        }
      }
    }
  }

  return responseBody.message || "Registrasi gagal!";
};
