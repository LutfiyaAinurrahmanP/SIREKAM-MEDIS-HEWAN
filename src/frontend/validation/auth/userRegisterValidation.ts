import { alertError } from "../../lib/alert";
import { RegisterFormData } from "../../types/auth";

export const validationMessages = {
  // username
  "username.unique": "Username sudah dipakai!",
  "username.required": "Username harus diisi!",
  "username.min": "Username memiliki minimal 5 karakter!",
  "username.max": "Username tidak boleh melebihi 64 karakter!",
  // fullname
  "fullname.required": "Nama lengkap harus diisi!",
  "fullname.min": "Nama lengkap memiliki minimal 5 karakter!",
  "fullname.max": "Nama lengkap tidak boleh melebihi 64 karakter!",
  // email
  "email.unique": "Email sudah dipakai!",
  "email.required": "Email harus diisi!",
  "email.min": "Email memiliki minimal 5 karakter!",
  "email.max": "Email tidak boleh melebihi 64 karakter!",
  "email.invalid": "Format email tidak valid!",
  // password
  "password.required": "Password harus diisi!",
  "password.min": "Password memiliki minimal 8 karakter!",
  "password.max": "Password tidak boleh melebihi 64 karakter!",
  "password.mismatch": "Konfirmasi password tidak sama!",
  // role
  "role.required": "Hak akses harus dipilih!",
  // phone
  "phone.required": "Nomor telepon harus diisi!",
  "phone.min": "Nomor telepon memiliki minimal 11 angka!",
  "phone.max": "Nomor telepon tidak boleh melebihi 14 angka!",
  "phone.invalid": "Nomor telepon hanya boleh angka!",
};

// Fungsi untuk validasi email
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Fungsi untuk validasi phone (hanya angka)
const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\d+$/;
  return phoneRegex.test(phone);
};

// Fungsi untuk validasi single field
export const validateField = (
  field: keyof RegisterFormData,
  value: string,
  confirmPassword?: string
): string | null => {
  switch (field) {
    case "username":
      if (!value.trim()) return validationMessages["username.required"];
      if (value.length < 5) return validationMessages["username.min"];
      if (value.length > 64) return validationMessages["username.max"];
      break;

    case "fullname":
      if (!value.trim()) return validationMessages["fullname.required"];
      if (value.length < 5) return validationMessages["fullname.min"];
      if (value.length > 64) return validationMessages["fullname.max"];
      break;

    case "email":
      if (!value.trim()) return validationMessages["email.required"];
      if (value.length < 5) return validationMessages["email.min"];
      if (value.length > 64) return validationMessages["email.max"];
      if (!isValidEmail(value)) return validationMessages["email.invalid"];
      break;

    case "password":
      if (!value.trim()) return validationMessages["password.required"];
      if (value.length < 8) return validationMessages["password.min"];
      if (value.length > 64) return validationMessages["password.max"];
      break;

    case "confirmPassword":
      if (!value.trim()) return validationMessages["password.required"];
      if (confirmPassword && value !== confirmPassword)
        return validationMessages["password.mismatch"];
      break;

    case "phone":
      if (!value.trim()) return validationMessages["phone.required"];
      if (!isValidPhone(value)) return validationMessages["phone.invalid"];
      if (value.length < 11) return validationMessages["phone.min"];
      if (value.length > 14) return validationMessages["phone.max"];
      break;

    default:
      break;
  }

  return null;
};

// Function untuk validasi form dengan toast
export const userRegisterValidateToast = async (
  formData: RegisterFormData
): Promise<boolean> => {
  // Validate username
  const usernameError = validateField("username", formData.username);
  if (usernameError) {
    await alertError(usernameError);
    return false;
  }

  // Validate fullname
  const fullnameError = validateField("fullname", formData.fullname);
  if (fullnameError) {
    await alertError(fullnameError);
    return false;
  }

  // Validate email
  const emailError = validateField("email", formData.email);
  if (emailError) {
    await alertError(emailError);
    return false;
  }

  // Validate password
  const passwordError = validateField("password", formData.password);
  if (passwordError) {
    await alertError(passwordError);
    return false;
  }

  // Validate confirm password
  const confirmPasswordError = validateField(
    "confirmPassword",
    formData.confirmPassword,
    formData.password
  );
  if (confirmPasswordError) {
    await alertError(confirmPasswordError);
    return false;
  }

  // Validate phone
  const phoneError = validateField("phone", formData.phone);
  if (phoneError) {
    await alertError(phoneError);
    return false;
  }

  return true;
};

export const userRegisterValidateErrorMessages = (
  responseBody: any
): string => {
  if (responseBody.errors) {
    if (typeof responseBody.errors === "object") {
      const fieldErrors = responseBody.errors;

      // Prioritaskan error berdasarkan field dengan mapping ke pesan Indonesia
      if (fieldErrors.username) {
        if (Array.isArray(fieldErrors.username)) {
          const usernameError = fieldErrors.username[0];
          if (
            usernameError.includes("unique") ||
            usernameError.includes("taken")
          ) {
            return validationMessages["username.unique"];
          } else if (usernameError.includes("required")) {
            return validationMessages["username.required"];
          } else if (usernameError.includes("min")) {
            return validationMessages["username.min"];
          } else if (usernameError.includes("max")) {
            return validationMessages["username.max"];
          }
        }
        return validationMessages["username.unique"]; // Default
      }

      if (fieldErrors.email) {
        if (Array.isArray(fieldErrors.email)) {
          const emailError = fieldErrors.email[0];
          if (emailError.includes("unique") || emailError.includes("taken")) {
            return validationMessages["email.unique"];
          } else if (emailError.includes("required")) {
            return validationMessages["email.required"];
          } else if (emailError.includes("min")) {
            return validationMessages["email.min"];
          } else if (emailError.includes("max")) {
            return validationMessages["email.max"];
          }
        }
        return validationMessages["email.unique"]; // Default
      }

      if (fieldErrors.fullname) {
        if (Array.isArray(fieldErrors.fullname)) {
          const fullnameError = fieldErrors.fullname[0];
          if (fullnameError.includes("required")) {
            return validationMessages["fullname.required"];
          } else if (fullnameError.includes("min")) {
            return validationMessages["fullname.min"];
          } else if (fullnameError.includes("max")) {
            return validationMessages["fullname.max"];
          }
        }
      }

      if (fieldErrors.password) {
        if (Array.isArray(fieldErrors.password)) {
          const passwordError = fieldErrors.password[0];
          if (passwordError.includes("required")) {
            return validationMessages["password.required"];
          } else if (passwordError.includes("min")) {
            return validationMessages["password.min"];
          } else if (passwordError.includes("max")) {
            return validationMessages["password.max"];
          }
        }
      }

      if (fieldErrors.phone) {
        if (Array.isArray(fieldErrors.phone)) {
          const phoneError = fieldErrors.phone[0];
          if (phoneError.includes("required")) {
            return validationMessages["phone.required"];
          } else if (phoneError.includes("min")) {
            return validationMessages["phone.min"];
          } else if (phoneError.includes("max")) {
            return validationMessages["phone.max"];
          }
        }
      }

      // Fallback: ambil error pertama
      const firstErrorField = Object.keys(fieldErrors)[0];
      const firstError = fieldErrors[firstErrorField];
      return Array.isArray(firstError) ? firstError[0] : firstError;
    }

    if (typeof responseBody.errors === "string") {
      return responseBody.errors;
    }
  }

  if (responseBody.message) {
    return responseBody.message;
  }

  return "Registration failed!";
};
