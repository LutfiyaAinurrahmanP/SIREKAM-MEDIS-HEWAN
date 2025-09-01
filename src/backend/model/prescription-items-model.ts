import { PrescriptionItems } from "../generated/prisma";

export type PrescriptionItemsResponse = {
  id: number;
  prescription_id: number;
  medicine_id: number;
  dosage?: string | null;
  frequency?: string | null;
  duration_days?: number | null;
  instructions?: string | null;
  created_at?: Date | null;
  updated_at?: Date | null;
};

export type CreatePrescriptionItemsRequest = {
  prescription_id: number;
  medicine_id: number;
  dosage?: string | null;
  frequency?: string | null;
  duration_days?: number | null;
  instructions?: string | null;
};

export type UpdatePrescriptionItemsRequest = {
  id: number;
  prescription_id: number;
  medicine_id: number;
  dosage?: string | null;
  frequency?: string | null;
  duration_days?: number | null;
  instructions?: string | null;
};

export function toPrescriptionItemsResponse(
  prescriptionItems: PrescriptionItems
): PrescriptionItemsResponse {
  return {
    id: prescriptionItems.id,
    prescription_id: prescriptionItems.prescription_id,
    medicine_id: prescriptionItems.medicine_id,
    dosage: prescriptionItems.dosage,
    frequency: prescriptionItems.frequency,
    duration_days: prescriptionItems.duration_days,
    instructions: prescriptionItems.instructions,
    created_at: prescriptionItems.created_at,
    updated_at: prescriptionItems.updated_at,
  };
}
