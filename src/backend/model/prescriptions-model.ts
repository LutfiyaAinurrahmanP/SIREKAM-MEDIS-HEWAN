import { Prescriptions } from "../generated/prisma";

export type PrescriptionsResponse = {
  id: number;
  medical_record_id: number;
  veterinarian_id: number;
  notes: string | null;
  created_at: Date | null;
  updated_at: Date | null;
};

export type CreatePrescriptionsRequest = {
  medical_record_id: number;
  veterinarian_id: number;
  notes?: string | null;
};

export type UpdatePrescriptionsRequest = {
  id: number;
  medical_record_id: number;
  veterinarian_id: number;
  notes?: string | null;
};

export function toPrescriptionsResponse(
  prescriptions: Prescriptions
): PrescriptionsResponse {
  return {
    id: prescriptions.id,
    medical_record_id: prescriptions.medical_record_id,
    veterinarian_id: prescriptions.veterinarian_id,
    notes: prescriptions.notes,
    created_at: prescriptions.created_at,
    updated_at: prescriptions.updated_at,
  };
}
