import { error } from "winston";
import { prismaClient } from "../application/database";
import { UniqueError } from "../error/unique-error";
import {
  CreateMedicinesRequest,
  MedicinesResponse,
  toMedicinesResponse,
  UpdateMedicinesRequest,
} from "../model/medicines-model";
import { MedicinesValidation } from "../validation/medicines-validation";
import { Validation } from "../validation/validation";
import { ResponseError } from "../error/response-error";

export class MedicinesService {
  static async create(req: CreateMedicinesRequest): Promise<MedicinesResponse> {
    const createRequest = Validation.validate(MedicinesValidation.CREATE, req);

    const record = {
      ...createRequest,
      created_at: new Date(),
    };

    const checkMedicinesCodeExists = await prismaClient.medicines.count({
      where: {
        code: req.code,
      },
    });

    if (checkMedicinesCodeExists != 0) {
      throw new UniqueError("code", "Kode obat sudah dipakai!");
    }

    const medicines = await prismaClient.medicines.create({
      data: record,
    });

    return toMedicinesResponse(medicines);
  }

  static async list(): Promise<MedicinesResponse[]> {
    const medicines = await prismaClient.medicines.findMany({
      orderBy: {
        created_at: "desc",
      },
    });
    return medicines.map(toMedicinesResponse);
  }

  static async checkMedicinesMustExists(medicinesId: number) {
    const medicines = await prismaClient.medicines.findUnique({
      where: {
        id: medicinesId,
      },
    });

    if (!medicines) {
      throw new ResponseError(404, "Data obat tidak ditemukan!");
    }
    return medicines;
  }

  static async get(medicinesId: number) {
    const medicines = await this.checkMedicinesMustExists(medicinesId);
    return toMedicinesResponse(medicines!);
  }

  static async update(req: UpdateMedicinesRequest): Promise<MedicinesResponse> {
    const updateRequest = Validation.validate(MedicinesValidation.UPDATE, req);
    await this.checkMedicinesMustExists(updateRequest.id);
    const medicines = await prismaClient.medicines.update({
      where: {
        id: updateRequest.id,
      },
      data: {
        ...updateRequest,
        updated_at: new Date(),
      },
    });
    
    return toMedicinesResponse(medicines!);
  }

  static async delete(medicinesId: number) {
    const deleteRequest = await this.checkMedicinesMustExists(medicinesId);
    const medicines = await prismaClient.medicines.delete({
      where: {
        id: deleteRequest.id,
      },
    });
    return medicines;
  }
}
