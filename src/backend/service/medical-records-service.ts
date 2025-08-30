import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  CreateMedicalRecordsRequest,
  MedicalRecordsResponse,
  toMedicalRecordsResponse,
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
}
