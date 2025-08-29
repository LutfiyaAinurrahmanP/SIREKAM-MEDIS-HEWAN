import { MedicalRecords, MedicalRecordsStatus } from "../generated/prisma";

export type MedicalRecordsResponse = {
  id: number;
  pet_id: number;
  service_id: number;
  appointment_id?: number | null;
  veterinarian_id: number;
  visit_date: Date;
  subject?: string | null;
  objective?: string | null;
  assessment?: string | null;
  plan?: string | null;
  weight: number;
  temperature_celsius: number;
  next_visit_date?: Date | null;
  status: MedicalRecordsStatus;
  created_at?: Date | null;
  updated_at?: Date | null;
};

export type CreateMedicalRecordsRequest = {
  pet_id: number;
  service_id: number;
  appointment_id?: number | null;
  veterinarian_id: number;
  visit_date: Date;
  subject?: string | null;
  objective?: string | null;
  assessment?: string | null;
  plan?: string | null;
  weight: number;
  temperature_celsius: number;
  next_visit_date?: Date | null;
  status: MedicalRecordsStatus;
};

export type UpdateMedicalRecordsRequest = {
  id: number;
  pet_id: number;
  service_id: number;
  appointment_id?: number | null;
  veterinarian_id: number;
  visit_date: Date;
  subject?: string | null;
  objective?: string | null;
  assessment?: string | null;
  plan?: string | null;
  weight: number;
  temperature_celsius: number;
  next_visit_date?: Date | null;
  status: MedicalRecordsStatus;
};

export function toMedicalRecordsResponse(
  medicalRecords: MedicalRecords
): MedicalRecordsResponse {
  return {
    id: medicalRecords.id,
    pet_id: medicalRecords.pet_id,
    service_id: medicalRecords.service_id,
    appointment_id: medicalRecords.appointment_id,
    veterinarian_id: medicalRecords.veterinarian_id,
    visit_date: medicalRecords.visit_date,
    subject: medicalRecords.subject,
    objective: medicalRecords.objective,
    assessment: medicalRecords.assessment,
    plan: medicalRecords.plan,
    weight: Number(medicalRecords.weight),
    temperature_celsius: Number(medicalRecords.temperature_celsius),
    next_visit_date: medicalRecords.next_visit_date,
    status: medicalRecords.status,
    created_at: medicalRecords.created_at,
    updated_at: medicalRecords.updated_at,
  };
}
