import {
  PaymentMethod,
  PaymentStatus,
  Transactions,
} from "../generated/prisma";

export type TransactionsResponse = {
  id: number;
  created_by: number;
  pet_id: number;
  medical_record_id?: number | null;
  total_amount: number;
  paid_amount: number;
  payment_status: PaymentStatus;
  payment_method: PaymentMethod;
  invoice_date: Date;
  notes?: string | null;
  created_at?: Date | null;
  updated_at?: Date | null;
};

export type CreateTransactionsRequest = {
  created_by: number;
  pet_id: number;
  medical_record_id?: number | null;
  total_amount: number;
  paid_amount: number;
  payment_status: PaymentStatus;
  payment_method: PaymentMethod;
  invoice_date: Date;
  notes?: string | null;
};

export type UpdateTransactionsRequest = {
  id: number;
  created_by: number;
  pet_id: number;
  medical_record_id?: number | null;
  total_amount: number;
  paid_amount: number;
  payment_status: PaymentStatus;
  payment_method: PaymentMethod;
  invoice_date: Date;
  notes?: string | null;
};

export function toTransactionResponse(
  transaction: Transactions
): TransactionsResponse {
  return {
    id: transaction.id,
    created_by: transaction.created_by,
    pet_id: transaction.pet_id,
    medical_record_id: transaction.medical_record_id,
    total_amount: Number(transaction.total_amount),
    paid_amount: Number(transaction.paid_amount),
    payment_status: transaction.payment_status,
    payment_method: transaction.payment_method,
    invoice_date: transaction.invoice_date,
    notes: transaction.notes,
  };
}
