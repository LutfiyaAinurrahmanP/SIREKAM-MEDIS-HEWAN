import z, { ZodType } from "zod";
import { MedicinesType, MedicineUnit } from "../generated/prisma";

export class MedicinesValidation {
  static readonly CREATE: ZodType = z.object({
    name: z
      .string()
      .nonempty("Nama obat harus diisi!")
      .min(1, "Nama obat harus diisi!")
      .min(5, "Nama obat memiliki minimal 5 karakter!")
      .max(64, "Nama obat tidak boleh melebihi 64 karakter!"),
    code: z
      .string()
      .nonempty("Kode obat harus diisi!")
      .min(1, "Kode obat harus diisi!")
      .min(5, "Kode obat memiliki minimal 5 karakter!")
      .max(64, "Kode obat tidak boleh melebihi 64 karakter!"),
    type: z.enum(
      [
        MedicinesType.injections,
        MedicinesType.ointments,
        MedicinesType.others,
        MedicinesType.syrups,
        MedicinesType.tablets,
      ],
      "Tipe obat harus diisi!"
    ),
    unit: z.enum(
      [
        MedicineUnit.bottles,
        MedicineUnit.ml,
        MedicineUnit.pcs,
        MedicineUnit.tablets,
        MedicineUnit.vials,
      ],
      "Unit obat harus diisi!"
    ),
    stock_qty: z
      .number("Stok harus berupa angka!")
      .min(0, "Stok tidak boleh kurang dari 0!"),
    price: z
      .number("Harga harus berupa angka!")
      .min(0, "Harga tidak boleh kurang dari 0!"),
    is_active: z.boolean(
      "Status keaktifan harus berupa aktif atau tidak aktif!"
    ),
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.number(),
    name: z
      .string()
      .nonempty("Nama obat harus diisi!")
      .min(1, "Nama obat harus diisi!")
      .min(5, "Nama obat memiliki minimal 5 karakter!")
      .max(64, "Nama obat tidak boleh melebihi 64 karakter!"),
    code: z
      .string()
      .nonempty("Kode obat harus diisi!")
      .min(1, "Kode obat memiliki minimal 5 karakter!")
      .min(5, "Kode obat memiliki minimal 5 karakter!")
      .max(64, "Kode obat tidak boleh melebihi 64 karakter!"),
    type: z.enum(
      [
        MedicinesType.injections,
        MedicinesType.ointments,
        MedicinesType.others,
        MedicinesType.syrups,
        MedicinesType.tablets,
      ],
      "Tipe obat harus diisi!"
    ),
    unit: z.enum(
      [
        MedicineUnit.bottles,
        MedicineUnit.ml,
        MedicineUnit.pcs,
        MedicineUnit.tablets,
        MedicineUnit.vials,
      ],
      "Unit obat harus diisi!"
    ),
    stock_qty: z
      .number("Stok harus berupa angka!")
      .min(1, "Stok tidak boleh kurang dari 0!"),
    price: z
      .number("Harga harus berupa angka!")
      .min(1, "Harga tidak boleh kurang dari 0!"),
    is_active: z.boolean(
      "Status keaktifan harus berupa aktif atau tidak aktif!"
    ),
  });
}
