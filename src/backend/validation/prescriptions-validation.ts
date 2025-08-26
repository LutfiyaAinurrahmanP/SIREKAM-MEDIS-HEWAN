import z, { ZodType } from "zod";

export class PrescriptionsValidation {
  static readonly CREATE: ZodType = z.object({
    medical_record_id: z.number(),
    veterinarian_id: z.number(),
    notes: z.string().optional(),
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.number(),
    medical_record_id: z.number(),
    veterinarian_id: z.number(),
    notes: z.string().optional(),
  });
}
