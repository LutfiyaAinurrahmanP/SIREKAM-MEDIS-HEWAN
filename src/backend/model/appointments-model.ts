import { Appointments, AppointmentStatus } from "../generated/prisma";

export type AppointmentsResponse = {
  id: number;
  pet_id: number;
  created_by: number;
  schedule_date: Date;
  schedule_time: string;
  status: AppointmentStatus;
  reason?: string | null;
  notes?: string | null;
  created_at?: Date | null;
  updated_at?: Date | null;
};
export type CreateAppointmentsRequest = {
  pet_id: number;
  created_by: number;
  schedule_date: Date;
  schedule_time: string;
  status: AppointmentStatus;
  reason?: string | null;
  notes?: string | null;
};
export type UpdateAppointmentsRequest = {
  id: number;
  pet_id: number;
  created_by: number;
  schedule_date: Date;
  schedule_time: string;
  status: AppointmentStatus;
  reason?: string | null;
  notes?: string | null;
};

export function toAppointmentsResponse(
  appointments: Appointments
): AppointmentsResponse {
  return {
    id: appointments.id,
    pet_id: appointments.pet_id,
    created_by: appointments.created_by,
    schedule_date: appointments.schedule_date,
    schedule_time: appointments.schedule_time,
    status: appointments.status,
    reason: appointments.reason,
    notes: appointments.notes,
    created_at: appointments.created_at,
    updated_at: appointments.updated_at,
  };
}
