import z, { ZodType } from "zod";
import { MedicalRecordsStatus } from "../generated/prisma";

export class MedicalRecordsValidation {
  static readonly CREATE: ZodType = z.object({
    pet_id: z
      .number("Hewan peliharaan harus dipilih!")
      .nonoptional("Hewan peliharaan harus dipilih!"),
    service_id: z
      .number("Kategori layanan harus dipilih!")
      .nonoptional("Kategori layanan harus dipilih!"),
    appointment_id: z.number().optional(),
    veterinarian_id: z
      .number("Dokter hewan harus dipilih!")
      .nonoptional("Dokter hewan harus dipilih!"),
    visit_date: z
      .string("Tanggal kunjungan harus diisi!")
      .nonempty("Tanggal kunjungan harus diisi!"),
    subject: z.string().optional(),
    objective: z.string().optional(),
    assessment: z.string().optional(),
    plan: z.string().optional(),
    weight: z
      .number("Berat badan harus berupa angka!")
      .nonoptional("Berat badan harus diisi!"),
    temperature_celsius: z
      .number("Suhu tubuh harus berupa angka!")
      .nonoptional("Suhu tubuh harus diisi!"),
    next_visit_date: z.string().optional(),
    status: z
      .enum(
        [MedicalRecordsStatus.final, MedicalRecordsStatus.draft],
        "Status harus dipilih!"
      )
      .nonoptional("Status harus dipilih!"),
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.number().nonoptional(),
    pet_id: z
      .number("Hewan peliharaan harus dipilih!")
      .nonoptional("Hewan peliharaan harus dipilih!"),
    service_id: z
      .number("Kategori layanan harus dipilih!")
      .nonoptional("Kategori layanan harus dipilih!"),
    appointment_id: z.number().optional(),
    veterinarian_id: z
      .number("Dokter hewan harus dipilih!")
      .nonoptional("Dokter hewan harus dipilih!"),
    visit_date: z
      .string("Tanggal kunjungan harus diisi!")
      .nonempty("Tanggal kunjungan harus diisi!"),
    subject: z.string().optional(),
    objective: z.string().optional(),
    assessment: z.string().optional(),
    plan: z.string().optional(),
    weight: z
      .number("Berat badan harus berupa angka!")
      .nonoptional("Berat badan harus diisi!"),
    temperature_celsius: z
      .number("Suhu tubuh harus berupa angka!")
      .nonoptional("Suhu tubuh harus diisi!"),
    next_visit_date: z.string().optional(),
    status: z
      .enum(
        [MedicalRecordsStatus.final, MedicalRecordsStatus.draft],
        "Status harus dipilih!"
      )
      .nonoptional("Status harus dipilih!"),
  });
}
