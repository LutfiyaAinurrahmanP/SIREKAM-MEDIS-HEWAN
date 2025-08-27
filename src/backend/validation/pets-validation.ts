import z, { ZodType } from "zod";
import { Gender } from "../generated/prisma";

export class PetsValidation {
  static readonly CREATE: ZodType = z.object({
    owner_id: z.number("Pemilik hewan peliharaan harus diisi!"),
    name: z
      .string()
      .nonempty("Nama hewan peliharaan harus diisi!")
      .min(1, "Nama hewan peliharaan harus diisi!")
      .max(64, "Nama hewan peliharaan memiliki maksimal 64 karakter!"),
    animal_type_id: z.number("Jenis hewan peliharaan harus diisi!"),
    breed: z.string().max(64).optional(),
    gender: z.enum(
      [Gender.male, Gender.female, Gender.unknown],
      "Jenis kelamin hewan peliharaan harus dipilih!"
    ),
    birth_date: z.string().optional(),
    weight: z.number("Berat hewan peliharaan harus berupa angka!"),
    color: z.string().max(64).optional(),
    notes: z.string().optional(),
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.number(),
    owner_id: z.number("Pemilik hewan peliharaan harus diisi!"),
    name: z
      .string()
      .nonempty("Nama hewan peliharaan harus diisi!")
      .min(1, "Nama hewan peliharaan harus diisi!")
      .max(64, "Nama hewan peliharaan memiliki maksimal 64 karakter!"),
    animal_type_id: z.number("Jenis hewan peliharaan harus diisi!"),
    breed: z.string().max(64).optional(),
    gender: z.enum(
      [Gender.male, Gender.female, Gender.unknown],
      "Jenis kelamin hewan peliharaan harus dipilih!"
    ),
    birth_date: z.string().optional(),
    weight: z.number("Berat hewan peliharaan harus berupa angka!"),
    color: z.string().max(64).optional(),
    notes: z.string().optional(),
  });
}
