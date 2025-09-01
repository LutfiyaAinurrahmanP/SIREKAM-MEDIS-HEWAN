import z, { ZodType } from "zod";

export class TreatmentNotesValidation {
  static CREATE: ZodType = z.object({
    created_by: z
      .number("Pembuat catatan harus diisi!")
      .nonoptional("Pembuat catatan harus diisi!"),
    medical_record_id: z
      .number("Rekam medis harus diisi!")
      .nonoptional("Rekam medis harus diisi!"),
    notes: z
      .string("Catatan harus diisi!")
      .min(1, "Catatan harus diisi!")
      .min(5, "Catatan memiliki minimal 5 karakter!")
      .nonoptional("Catatan harus diisi!"),
  });

  static UPDATE: ZodType = z.object({
    id: z.number().nonoptional(),
    created_by: z
      .number("Pembuat catatan harus diisi!")
      .nonoptional("Pembuat catatan harus diisi!"),
    medical_record_id: z
      .number("Rekam medis harus diisi!")
      .nonoptional("Rekam medis harus diisi!"),
    notes: z
      .string("Catatan harus diisi!")
      .min(1, "Catatan harus diisi!")
      .min(5, "Catatan memiliki minimal 5 karakter!")
      .nonoptional("Catatan harus diisi!"),
  });
}
