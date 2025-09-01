import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  CreateMedicalRecordsRequest,
  MedicalRecordsResponse,
  toMedicalRecordsResponse,
  UpdateMedicalRecordsRequest,
} from "../model/medical-records-model";
import { MedicalRecordsValidation } from "../validation/medical-records-validation";
import { Validation } from "../validation/validation";

export default class MedicalRecordsService {
  static async create(
    req: CreateMedicalRecordsRequest
  ): Promise<MedicalRecordsResponse> {
    const createRequest = Validation.validate(
      MedicalRecordsValidation.CREATE,
      req
    );
    const record = {
      ...createRequest,
      created_at: new Date(),
    };

    const medicalRecords = await prismaClient.medicalRecords.create({
      data: record,
    });

    return toMedicalRecordsResponse(medicalRecords);
  }

  static async list(): Promise<MedicalRecordsResponse[]> {
    const medicalRecords = await prismaClient.medicalRecords.findMany({
      orderBy: {
        id: "desc",
      },
    });
    if (!medicalRecords) {
      throw new ResponseError(404, "Data rekam medis tidak ditemukan!");
    }
    return medicalRecords.map(toMedicalRecordsResponse);
  }

  static async checkMedicalRecordsMustExists(medicalRecordId: number) {
    const medicalRecord = await prismaClient.medicalRecords.findUnique({
      where: {
        id: medicalRecordId,
      },
    });
    if (!medicalRecord) {
      throw new ResponseError(404, "Data rekam medis tidak ditemukan!");
    }
    return medicalRecord;
  }

  static async get(medicalRecordId: number): Promise<MedicalRecordsResponse> {
    const medicalRecord = await this.checkMedicalRecordsMustExists(
      medicalRecordId
    );
    return toMedicalRecordsResponse(medicalRecord);
  }

  static async update(
    req: UpdateMedicalRecordsRequest
  ): Promise<MedicalRecordsResponse> {
    const updateRequest = Validation.validate(
      MedicalRecordsValidation.UPDATE,
      req
    );
    await this.checkMedicalRecordsMustExists(updateRequest.id);
    const medicalRecords = await prismaClient.medicalRecords.update({
      where: {
        id: updateRequest.id,
      },
      data: {
        ...updateRequest,
        updated_at: new Date(),
      },
    });

    return toMedicalRecordsResponse(medicalRecords);
  }

  static async delete(
    medicalRecordId: number
  ): Promise<MedicalRecordsResponse> {
    const deleteRequest = await this.checkMedicalRecordsMustExists(
      medicalRecordId
    );
    const medicalRecord = await prismaClient.medicalRecords.delete({
      where: {
        id: deleteRequest.id,
      },
    });
    return toMedicalRecordsResponse(medicalRecord);
  }
}
