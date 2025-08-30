import z, { ZodType } from "zod";
import { AppointmentStatus } from "../generated/prisma";

export class AppointmentsValidation {
  static readonly CREATE: ZodType = z.object({
    pet_id: z
      .number("Hewan peliharaan harus dipilih!")
      .nonoptional("Hewan peliharaan harus dipilih!"),
    created_by: z
      .number("Pembuat janji temu harus diisi!")
      .nonoptional("Pembuat janji temu harus diisi!"),
    schedule_date: z
      .string("Tanggal janji temu harus diisi!")
      .nonempty("Tanggal janji temu harus diisi!"),
    schedule_time: z
      .string("Jam janji temu harus diisi!")
      .nonempty("Jam janji temu harus diisi!")
      .length(5, "Jam janji temu harus tepat 5 karakter (HH:MM)")
      .regex(
        /^([01][0-9]|2[0-3]):[0-5][0-9]$/,
        "Format Jam janji temu harus HH:MM (contoh: 09:30, 14:45)"
      )
      .nonoptional("Jam janji temu harus diisi!"),
    status: z.enum(
      [
        AppointmentStatus.scheduled,
        AppointmentStatus.completed,
        AppointmentStatus.canceled,
        AppointmentStatus.no_show,
      ],
      "Status harus dipilih!"
    ),
    reason: z.string().optional(),
    notes: z.string().optional(),
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.number(),
    pet_id: z
      .number("Hewan peliharaan harus dipilih!")
      .nonoptional("Hewan peliharaan harus dipilih!"),
    created_by: z
      .number("Pembuat janji temu harus diisi!")
      .nonoptional("Pembuat janji temu harus diisi!"),
    schedule_date: z
      .string("Tanggal janji temu harus diisi!")
      .nonempty("Tanggal janji temu harus diisi!"),
    schedule_time: z
      .string("Jam janji temu harus diisi!")
      .nonempty("Jam janji temu harus diisi!")
      .length(5, "Jam janji temu harus tepat 5 karakter (HH:MM)")
      .regex(
        /^([01][0-9]|2[0-3]):[0-5][0-9]$/,
        "Format Jam janji temu harus HH:MM (contoh: 09:30, 14:45)"
      )
      .nonoptional("Jam janji temu harus diisi!"),
    status: z.enum(
      [
        AppointmentStatus.scheduled,
        AppointmentStatus.completed,
        AppointmentStatus.canceled,
        AppointmentStatus.no_show,
      ],
      "Status harus dipilih!"
    ),
    reason: z.string().optional(),
    notes: z.string().optional(),
  });
}
