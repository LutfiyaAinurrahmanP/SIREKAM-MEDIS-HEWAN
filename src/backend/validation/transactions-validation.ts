import z, { ZodType } from "zod";
import { PaymentMethod, PaymentStatus } from "../generated/prisma";

export class TransactionsValidation {
  static readonly CREATE: ZodType = z.object({
    created_by: z
      .number("Pembuat transaksi harus diisi!")
      .nonoptional("Pembuat transaksi harus diisi!"),
    pet_id: z
      .number("Hewan peliharaan harus diisi!")
      .nonoptional("Hewan peliharaan harus diisi!"),
    medical_record_id: z.number().optional(),
    total_amount: z
      .number("Total biaya harus berupa angka!")
      .nonoptional("Total biaya harus diisi!"),
    paid_amount: z
      .number("Biaya transaksi harus berupa angka!")
      .nonoptional("Biaya transaksi harus diisi!"),
    payment_status: z
      .enum(
        [PaymentStatus.paid, PaymentStatus.partial, PaymentStatus.pending],
        "Status pembayaran harus diisi!"
      )
      .nonoptional("Status pembayaran harus diisi!"),
    payment_method: z
      .enum(
        [
          PaymentMethod.card,
          PaymentMethod.cash,
          PaymentMethod.other,
          PaymentMethod.transfer,
        ],
        "Metode pembayaran harus diisi!"
      )
      .nonoptional("Metode pembayaran harus diisi!"),
    invoice_date: z
      .string("Tanggal transaksi harus diisi!")
      .nonoptional("Tanggal transaksi harus diisi!"),
    notes: z.string().optional(),
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.number().nonoptional(),
    created_by: z
      .number("Pembuat transaksi harus diisi!")
      .nonoptional("Pembuat transaksi harus diisi!"),
    pet_id: z
      .number("Hewan peliharaan harus diisi!")
      .nonoptional("Hewan peliharaan harus diisi!"),
    medical_record_id: z.number().optional(),
    total_amount: z
      .number("Total biaya harus berupa angka!")
      .nonoptional("Total biaya harus diisi!"),
    paid_amount: z
      .number("Biaya transaksi harus berupa angka!")
      .nonoptional("Biaya transaksi harus diisi!"),
    payment_status: z
      .enum(
        [PaymentStatus.paid, PaymentStatus.partial, PaymentStatus.pending],
        "Status pembayaran harus diisi!"
      )
      .nonoptional("Status pembayaran harus diisi!"),
    payment_method: z
      .enum(
        [
          PaymentMethod.card,
          PaymentMethod.cash,
          PaymentMethod.other,
          PaymentMethod.transfer,
        ],
        "Metode pembayaran harus diisi!"
      )
      .nonoptional("Metode pembayaran harus diisi!"),
    invoice_date: z
      .string("Tanggal transaksi harus diisi!")
      .nonoptional("Tanggal transaksi harus diisi!"),
    notes: z.string().optional(),
  });
}
