import z, { ZodType } from "zod";

export class PrescriptionItemsValidation {
  static readonly CREATE: ZodType = z.object({
    prescription_id: z
      .number("Resep harus diisi!")
      .nonoptional("Resep harus diisi!"),
    medicine_id: z.number("Obat harus diisi!").nonoptional("Obat harus diisi!"),
    dosage: z.string().max(64).optional(),
    frequency: z.string().max(64).optional(),
    duration_days: z.number().min(1).optional(),
    instructions: z.string().optional(),
  });
  static readonly UPDATE: ZodType = z.object({
    id: z.number().nonoptional(),
    prescription_id: z
      .number("Resep harus diisi!")
      .nonoptional("Resep harus diisi!"),
    medicine_id: z.number("Obat harus diisi!").nonoptional("Obat harus diisi!"),
    dosage: z.string().max(64).optional(),
    frequency: z.string().max(64).optional(),
    duration_days: z.number().min(1).optional(),
    instructions: z.string().optional(),
  });
}
