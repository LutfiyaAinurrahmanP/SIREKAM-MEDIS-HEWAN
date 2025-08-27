import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  AppointmentsResponse,
  CreateAppointmentsRequest,
  toAppointmentsResponse,
} from "../model/appointments-model";
import { AppointmentsValidation } from "../validation/appointments-validation";
import { Validation } from "../validation/validation";

export class AppointmentsService {
  static async create(
    req: CreateAppointmentsRequest
  ): Promise<AppointmentsResponse> {
    const createRequest = Validation.validate(
      AppointmentsValidation.CREATE,
      req
    );
    const record = {
      ...createRequest,
      created_at: new Date(),
    };
    const appointments = await prismaClient.appointments.create({
      data: record,
    });

    return toAppointmentsResponse(appointments);
  }

  static async list(): Promise<AppointmentsResponse[]> {
    const appointments = await prismaClient.appointments.findMany({
      orderBy: {
        created_at: "desc",
      },
    });
    if (!appointments) {
      throw new ResponseError(404, "Data janji temu tidak ditemukan!");
    }
    return appointments.map(toAppointmentsResponse);
  }

  static async checkAppointmentsMustExists(appointmentsId: number) {
    const appointments = await prismaClient.appointments.findUnique({
      where: {
        id: appointmentsId,
      },
    });

    if (!appointments) {
      throw new ResponseError(404, "Data janji temu tidak ditemukan!");
    }
    return appointments;
  }

  static async get(appointmentsId: number): Promise<AppointmentsResponse> {
    const appointments = await this.checkAppointmentsMustExists(appointmentsId);
    return toAppointmentsResponse(appointments);
  }
}
