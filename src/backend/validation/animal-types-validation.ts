import z, { ZodType } from "zod";

export class AnimalTypesValidation {
  static readonly CREATE: ZodType = z.object({
    name: z
      .string()
      .nonempty("Data jenis hewan harus diisi!")
      .min(1, "Data jenis hewan harus diisi!"),
    description: z.string().optional(),
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.number(),
    name: z
      .string()
      .nonempty("Data jenis hewan harus diisi!")
      .min(1, "Data jenis hewan harus diisi!"),
    description: z.string().optional(),
  });
}
