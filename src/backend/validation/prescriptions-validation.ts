import z, { ZodType } from "zod";

export class PrescriptionsValidation {
  static readonly CREATE: ZodType = z.object({
    medical_record_id: z
      .number("Rekam medis harus diisi!")
      .nonoptional("Rekam medis harus diisi!"),
    veterinarian_id: z
      .number("Dokter hewan harus diisi!")
      .nonoptional("Dokter hewan harus diisi!"),
    notes: z.string().optional(),
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.number().nonoptional(),
    medical_record_id: z
      .number("Rekam medis harus diisi!")
      .nonoptional("Rekam medis harus diisi!"),
    veterinarian_id: z
      .number("Dokter hewan harus diisi!")
      .nonoptional("Dokter hewan harus diisi!"),
    notes: z.string().optional(),
  });
}
