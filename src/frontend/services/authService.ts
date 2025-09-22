import { userLogin, userLogout, userRegister } from "../lib/api/AuthApi";
import { LoginFormData, logoutResponse, RegisterFormData } from "../types/auth";

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

// Update login service untuk handle token
export const loginUser = async (data: LoginFormData): Promise<any> => {
  const response = await userLogin({
    username: data.username,
    password: data.password,
  });

  const responseBody = await response.json();

  if (response.status === 200) {
    let token = null;
    if (responseBody.data.token) {
      token = responseBody.data.token;
    }
    if (!token) {
      token = response.headers.get("SESSION-TOKEN");
    }
    localStorage.setItem("auth_token", token);
    return {
      user: responseBody.data,
      token: token,
    };
  } else {
    const errorMessage = extractRegisterErrorMessage(responseBody);
    throw new Error(errorMessage);
  }
};

export const logoutUser = async (): Promise<logoutResponse> => {
  const token = localStorage.getItem("auth_token");

  if (!token) {
    throw new Error("Tidak ada session yang aktif!");
  }

  try {
    const response = await userLogout();
    const responseBody = await response.json();

    if (response.status === 200 || response.status === 204) {
      return {
        success: true,
        message: responseBody.message || "Logout berhasil!",
      };
    } else {
      // Jika backend error, tetap lakukan logout local
      console.warn("Backend logout failed, performing local logout");
      return {
        success: true,
        message: "Logout berhasil!",
      };
    }
  } catch (error: any) {
    // Jika network error, tetap lakukan logout local
    console.warn(
      "Network error during logout, performing local logout:",
      error
    );
    return {
      success: true,
      message: "Logout berhasil!",
    };
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
