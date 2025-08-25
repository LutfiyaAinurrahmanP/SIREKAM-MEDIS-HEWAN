import z, { number, ZodType } from "zod";

export class ServiceCategoriesValidation {
  static readonly CREATE: ZodType = z.object({
    name: z
      .string()
      .nonempty("Nama jenis layanan harus diisi!")
      .min(1, "Nama jenis layanan harus diisi!")
      .min(5, "Nama jenis layanan memiliki minimal 5 karakter!")
      .max(64, "Nama jenis layanan tidak boleh melebihi 64 karakter!"),
    description: z.string().optional(),
    price: z
      .number("Harga jenis layanan harus berupa angka!")
      .min(0, "Harga layanan tidak boleh kurang dari 0!"),
    is_active: z.boolean(
      "Status keaktifan harus berupa aktif atau tidak aktif!"
    ),
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.number(),
    name: z
      .string()
      .nonempty("Nama jenis layanan harus diisi!")
      .min(1, "Nama jenis layanan harus diisi!")
      .min(5, "Nama jenis layanan memiliki minimal 5 karakter!")
      .max(64, "Nama jenis layanan tidak boleh melebihi 64 karakter!"),
    description: z.string().optional(),
    price: z
      .number("Harga jenis layanan harus berupa angka!")
      .min(0, "Harga layanan tidak boleh kurang dari 0!"),
    is_active: z.boolean(
      "Status keaktifan harus berupa aktif atau tidak aktif!"
    ),
  });
}
