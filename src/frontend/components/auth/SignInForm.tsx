import { Link, useNavigate } from "react-router";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { alertError, alertSuccess } from "../../lib/alert";
import React from "react";
import {
  clearMessages,
  setError,
  setLoading,
  setLoginSuccess,
} from "../../store/slices/auth/authSlice";
import { loginUser } from "../../services/authService";
import { LoginFormData } from "../../types/auth";
import {
  resetForm,
  toggleShowPassword,
  updateField,
} from "../../store/slices/auth/loginFormSlice";
import { Toaster } from "react-hot-toast";

export default function SignInForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading, error } = useAppSelector((state) => state.auth);
  const { formData, showPassword } = useAppSelector((state) => state.loginForm);

  const validateForm = (): boolean => {
    if (!formData.username.trim()) {
      alertError("Username is required");
      return false;
    }
    if (!formData.password.trim()) {
      alertError("Password is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    dispatch(setLoading(true));
    dispatch(clearMessages());

    try {
      const userData = await loginUser(formData);
      dispatch(setLoginSuccess(userData));
      await alertSuccess("Login successfull!");

      setTimeout(() => {
        dispatch(resetForm());
        navigate("/admin");
      }, 1000);
    } catch (error: any) {
      dispatch(setError(error.message || "Login failed!"));
      await alertError(error.message || "Login failed!");
    }
  };

  const handleFieldChange = (field: keyof LoginFormData, value: string) => {
    dispatch(updateField({ field, value }));
  };

  return (
    <div className="flex flex-col flex-1">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Masuk
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Harap masukkan username dan password yang valid!
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <Label>
                    Username <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Masukkan username"
                    required={true}
                    value={formData.username}
                    onChange={(e) =>
                      handleFieldChange("username", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label>
                    Password <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      placeholder="Masukkan password"
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      required={true}
                      value={formData.password}
                      onChange={(e) =>
                        handleFieldChange("password", e.target.value)
                      }
                    />
                    <span
                      onClick={() => dispatch(toggleShowPassword())}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* <Checkbox checked={isChecked} onChange={setIsChecked} />
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      Keep me logged in
                    </span> */}
                  </div>
                  <Link
                    to="/reset-password"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    Lupa password?
                  </Link>
                </div>
                <div>
                  <Button
                    className="w-full"
                    size="sm"
                    disabled={isLoading}
                    type="submit"
                  >
                    Masuk
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Tidak memiliki akun? {""}
                <Link
                  to="/register"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Daftar
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
