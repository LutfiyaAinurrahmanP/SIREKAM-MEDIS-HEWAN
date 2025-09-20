import { Link, useNavigate } from "react-router";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
// import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { alertError, alertSuccess } from "../../lib/alert";
import React, { useEffect } from "react";
import {
  clearMessages,
  restoreAuth,
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
import { getRoleBasedRoute, getRoleDisplayName } from "../../utils/authUtils";

export default function SignInForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Redux state
  const { isLoading, isAuthenticated, user } = useAppSelector(
    (state) => state.auth
  );
  const { formData, showPassword } = useAppSelector((state) => state.loginForm);

  useEffect(() => {
    dispatch(restoreAuth());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated && user) {
      const redirectPath = getRoleBasedRoute(user.role);
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  // Handle submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(setLoading(true));
    dispatch(clearMessages());

    try {
      // Call login API
      const response = await loginUser(formData);

      // Set login success with user data and token
      dispatch(
        setLoginSuccess({
          user: response.user,
          token: response.token,
        })
      );

      // Show success message with role
      const roleDisplayName = getRoleDisplayName(response.user.role);
      const successMessage = `Login berhasil sebagai ${roleDisplayName}!`;
      await alertSuccess(successMessage);

      // Get role-based route
      const redirectPath = getRoleBasedRoute(response.user.role);

      // Reset form and navigate to role-based dashboard
      setTimeout(() => {
        dispatch(resetForm());
        navigate(redirectPath, { replace: true });
      }, 1500);
    } catch (error: any) {
      const errorMessage = error.message || "Login gagal!";
      dispatch(setError(errorMessage));
      await alertError(errorMessage);
    }
  };

  // Handle field change
  const handleFieldChange = (field: keyof LoginFormData, value: string) => {
    dispatch(updateField({ field, value }));
  };

  // Don't render form if already authenticated
  if (isAuthenticated && user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1">
      <Toaster position="top-center" reverseOrder={false} />
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
