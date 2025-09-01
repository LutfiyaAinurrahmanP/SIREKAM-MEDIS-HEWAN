import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  CreatePrescriptionItemsRequest,
  PrescriptionItemsResponse,
  toPrescriptionItemsResponse,
  UpdatePrescriptionItemsRequest,
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

  static async list(): Promise<PrescriptionItemsResponse[]> {
    const prescriptionItems = await prismaClient.prescriptionItems.findMany({
      orderBy: {
        id: "desc",
      },
    });
    if (!prescriptionItems) {
      throw new ResponseError(404, "Data resep obat tidak ditemukan!");
    }
    return prescriptionItems.map(toPrescriptionItemsResponse);
  }

  static async checkPrescriptionItemsMustExists(prescriptionItemsId: number) {
    const prescriptionItems = await prismaClient.prescriptionItems.findUnique({
      where: {
        id: prescriptionItemsId,
      },
    });
    if (!prescriptionItems) {
      throw new ResponseError(404, "Data resep obat tidak ditemukan!");
    }
    return prescriptionItems;
  }

  static async get(prescriptionItemsId: number) {
    const prescriptionItems = await this.checkPrescriptionItemsMustExists(
      prescriptionItemsId
    );
    return toPrescriptionItemsResponse(prescriptionItems);
  }

  static async update(
    req: UpdatePrescriptionItemsRequest
  ): Promise<PrescriptionItemsResponse> {
    const updateRequest = Validation.validate(
      PrescriptionItemsValidation.UPDATE,
      req
    );
    await this.checkPrescriptionItemsMustExists(updateRequest.id);
    const prescriptionItems = await prismaClient.prescriptionItems.update({
      where: {
        id: updateRequest.id,
      },
      data: {
        ...updateRequest,
        updated_at: new Date(),
      },
    });

    return toPrescriptionItemsResponse(prescriptionItems);
  }

  static async delete(prescriptionItemsId: number) {
    const deleteRequest = await this.checkPrescriptionItemsMustExists(
      prescriptionItemsId
    );
    const prescriptionItems = await prismaClient.prescriptionItems.delete({
      where: {
        id: prescriptionItemsId,
      },
    });
    return prescriptionItems;
  }
}
