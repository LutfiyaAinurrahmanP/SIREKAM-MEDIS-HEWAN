import { prismaClient } from "../application/database";
import {
  CreatePrescriptionItemsRequest,
  PrescriptionItemsResponse,
  toPrescriptionItemsResponse,
} from "../model/prescription-items-model";
import { PrescriptionItemsValidation } from "../validation/prescription-items-validation";
import { Validation } from "../validation/validation";

export class PrescriptionItemsService {
  static async create(
    req: CreatePrescriptionItemsRequest
  ): Promise<PrescriptionItemsResponse> {
    const createRequest = Validation.validate(
      PrescriptionItemsValidation.CREATE,
      req
    );
    const record = {
      ...createRequest,
      created_at: new Date(),
    };
    const prescriptionItems = await prismaClient.prescriptionItems.create({
      data: record,
    });

    return toPrescriptionItemsResponse(prescriptionItems);
  }
}
