import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  CreatePrescriptionsRequest,
  PrescriptionsResponse,
  toPrescriptionsResponse,
} from "../model/prescriptions-model";
import { PrescriptionsValidation } from "../validation/prescriptions-validation";
import { Validation } from "../validation/validation";

export class PrescriptionsService {
  static async create(
    req: CreatePrescriptionsRequest
  ): Promise<PrescriptionsResponse> {
    const createRequest = Validation.validate(
      PrescriptionsValidation.CREATE,
      req
    );

    const record = {
      ...createRequest,
      created_at: new Date(),
    };

    const prescriptions = await prismaClient.prescriptions.create({
      data: record,
    });

    return toPrescriptionsResponse(prescriptions);
  }

  static async list(): Promise<PrescriptionsResponse[]> {
    const prescriptions = await prismaClient.prescriptions.findMany({
      orderBy: {
        id: "desc"
      }
    });

    if (!prescriptions) {
      throw new ResponseError(404, "Data resep tidak ditemukan!");
    }

    return prescriptions.map(toPrescriptionsResponse);
  }

  static async checkPrescriptionsMustExists(prescriptionsId: number) {
    const prescriptions = await prismaClient.prescriptions.findUnique({
      where: {
        id: prescriptionsId
      }
    });

    if (!prescriptions) {
      throw new ResponseError(404, "Data resep tidak ditemukan!");
    }

    return prescriptions;
  }

  static async get(prescriptionsId: number): Promise<PrescriptionsResponse> {
    const prescriptions = await this.checkPrescriptionsMustExists(prescriptionsId);
    return toPrescriptionsResponse(prescriptions);
  }
}
