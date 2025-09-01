import { prismaClient } from "../application/database";
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
      throw new Error("Data resep tidak ditemukan!");
    }
    
    return prescriptions.map(toPrescriptionsResponse);
  }
}
