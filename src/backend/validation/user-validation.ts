import { z, ZodType } from "zod";
import { Roles } from "../generated/prisma";

export class UserValidation {
  static readonly REGISTER: ZodType = z.object({
    username: z
      .string()
      .nonempty("Username harus diisi!")
      .min(1, "Username harus diisi!")
      .min(5, "Username memiliki minimal 5 karakter!")
      .max(64, "Username tidak boleh melebihi 64 karakter!"),
    fullname: z
      .string()
      .nonempty("Nama lengkap harus diisi!")
      .min(1, "Nama lengkap harus diisi!")
      .min(5, "Nama lengkap memiliki minimal 5 karakter!")
      .max(64, "Nama lengkap tidak boleh melebihi 64 karakter!"),
    email: z
      .string()
      .email()
      .nonempty("Email harus diisi!")
      .min(1, "Email harus diisi!")
      .min(5, "Email memiliki minimal 5 karakter!")
      .max(64, "Email tidak boleh melebihi 64 karakter!"),
    password: z
      .string()
      .nonempty("Password harus diisi!")
      .min(1, "Password harus diisi!")
      .min(8, "Password memiliki minimal 8 karakter!")
      .max(64, "Password tidak boleh melebihi 64 karakter!"),
    role: z.enum(
      [Roles.admin, Roles.staff, Roles.veterinarian, Roles.client],
      "Hak akses harus dipilih!"
    ),
    phone: z
      .string()
      .nonempty("Nomor telepon harus diisi!")
      .min(1, "Nomor telepon harus diisi!")
      .min(11, "Nomor telepon memiliki minimal 11 angka!")
      .max(14, "Nomor telepon memiliki maksimal 14 angka!"),
  });

  static readonly LOGIN: ZodType = z.object({
    username: z.string().nonempty("Username harus diisi!"),
    password: z.string().nonempty("Password harus diisi!"),
  });
}
