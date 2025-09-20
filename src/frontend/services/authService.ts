import { userLogin, userRegister } from "../lib/api/AuthApi";
import { LoginFormData, RegisterFormData } from "../types/auth";
import { userRegisterValidateErrorMessages } from "../validation/auth/userRegisterValidation";

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
    const errorMessage = userRegisterValidateErrorMessages(responseBody);
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
    let errorMessage = "Username of password is wrong!";

    if (responseBody.errors) {
      if (responseBody.errors.username) {
        errorMessage = "Username of password is wrong!";
      } else if (responseBody.errors.password) {
        errorMessage = "Username of password is wrong!";
      }
    } else if (responseBody.message) {
      errorMessage = responseBody.message;
    }

    throw new Error(errorMessage);
  }
};
