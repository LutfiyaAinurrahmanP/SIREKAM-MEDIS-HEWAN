import { TreatmentNotes } from "../generated/prisma";

export type TreatmentNotesResponse = {
  id: number;
  created_by: number;
  medical_record_id: number;
  notes: string;
  created_at?: Date | null;
  updated_at?: Date | null;
};

export type CreateTreatmentNotesRequest = {
  created_by: number;
  medical_record_id: number;
  notes: string;
};

export type UpdateTreatmentNotesRequest = {
  id: number;
  created_by: number;
  medical_record_id: number;
  notes: string;
};

export function toTreatmentNotesResponse(
  treatmentNotes: TreatmentNotes
): TreatmentNotesResponse {
  return {
    id: treatmentNotes.id,
    created_by: treatmentNotes.created_by,
    medical_record_id: treatmentNotes.medical_record_id,
    notes: treatmentNotes.notes,
    created_at: treatmentNotes.created_at,
    updated_at: treatmentNotes.updated_at,
  };
}
