import { prismaClient } from "../application/database";
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
}
