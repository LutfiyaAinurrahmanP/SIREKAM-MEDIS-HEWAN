import { Link, useNavigate } from "react-router";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import { Toaster } from "react-hot-toast";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  updateField,
  toggleShowPassword,
  toggleShowConfirmPassword,
  toggleCheckbox,
  resetForm,
} from "../../store/slices/auth/registerFormSlice";
import {
  setLoading,
  setError,
  setRegisterSuccess,
  clearMessages,
} from "../../store/slices/auth/authSlice";
import { registerUser } from "../../services/authService";
import { alertError, alertSuccess } from "../../lib/alert";
import { RegisterFormData } from "../../types/auth";
import { useAppDispatch } from "../../hooks/useAppDispatch";

export default function SignUpForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Ambil state dari Redux store
  const { isLoading } = useAppSelector((state) => state.auth);
  const { formData, showPassword, showConfirmPassword, isChecked } =
    useAppSelector((state) => state.registerForm);

  // Validasi form
  const validateForm = (): boolean => {
    if (!isChecked) {
      alertError("Harap setujui syarat dan ketentuan!");
      return false;
    }

    // Cek confirm password
    if (formData.password !== formData.confirmPassword) {
      alertError("Konfirmasi password tidak sama!");
      return false;
    }

    return true;
  };

  // Handle submit form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Dispatch action untuk mulai loading
    dispatch(setLoading(true));
    dispatch(clearMessages());

    try {
      // Panggil service untuk register
      await registerUser(formData);

      // Dispatch action untuk success
      const successMessage = "Data akun berhasil dibuat!";
      dispatch(setRegisterSuccess(successMessage));
      await alertSuccess(successMessage);

      // Reset form dan navigate ke login
      setTimeout(() => {
        dispatch(resetForm());
        navigate("/login");
      }, 2000);
    } catch (error: any) {
      const errorMessage = error.message || "Registrasi gagal!";
      dispatch(setError(errorMessage));
      await alertError(errorMessage);
    }
  };

  // Handle perubahan field
  const handleFieldChange = (field: keyof RegisterFormData, value: string) => {
    dispatch(updateField({ field, value }));
  };

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Daftar akun
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Masukkan data yang valid untuk mendaftar!
            </p>
          </div>

          <div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                {/* Username */}
                <div className="sm:col-span-1">
                  <Label>
                    Username<span className="text-error-500">*</span>
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

                {/* Full Name */}
                <div className="sm:col-span-1">
                  <Label>
                    Nama lengkap<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="fullname"
                    name="fullname"
                    placeholder="Masukkan nama lengkap"
                    required={true}
                    value={formData.fullname}
                    onChange={(e) =>
                      handleFieldChange("fullname", e.target.value)
                    }
                  />
                </div>

                {/* Phone */}
                <div className="sm:col-span-1">
                  <Label>
                    Nomor telepon<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="number"
                    id="phone"
                    name="phone"
                    placeholder="Masukkan nomor telepon"
                    required={true}
                    value={formData.phone}
                    onChange={(e) => handleFieldChange("phone", e.target.value)}
                  />
                </div>

                {/* Email */}
                <div>
                  <Label>
                    Email<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Masukkan email"
                    required={true}
                    value={formData.email}
                    onChange={(e) => handleFieldChange("email", e.target.value)}
                  />
                </div>

                {/* Password */}
                <div>
                  <Label>
                    Password<span className="text-error-500">*</span>
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

                {/* Confirm Password */}
                <div>
                  <Label>
                    Konfirmasi password<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      placeholder="Masukkan konfirmasi password"
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirm_password"
                      name="confirm_password"
                      required={true}
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleFieldChange("confirmPassword", e.target.value)
                      }
                    />
                    <span
                      onClick={() => dispatch(toggleShowConfirmPassword())}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showConfirmPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>

                {/* Checkbox */}
                <div className="flex items-center gap-3">
                  <Checkbox
                    className="w-5 h-5"
                    checked={isChecked}
                    onChange={() => dispatch(toggleCheckbox())}
                  />
                  <p className="inline-block font-normal text-gray-500 dark:text-gray-400">
                    Dengan membuat akun berarti anda setuju dengan{" "}
                    <span className="text-gray-800 dark:text-white/90">
                      Syarat dan Ketentuan,
                    </span>{" "}
                    serta{" "}
                    <span className="text-gray-800 dark:text-white">
                      Kebijakan Privasi{" "}
                    </span>
                    kami.
                  </p>
                </div>

                {/* Button */}
                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Proses daftar..." : "Daftar"}
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Sudah memiliki akun? {""}
                <Link
                  to="/login"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Masuk
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
