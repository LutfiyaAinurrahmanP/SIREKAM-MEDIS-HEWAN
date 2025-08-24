import { prismaClient } from "../application/database";
import { UniqueError } from "../error/unique-error";
import {
  CreateMedicinesRequest,
  MedicinesResponse,
  toMedicinesResponse,
} from "../model/medicines-model";
import { MedicinesValidation } from "../validation/medicines-validation";
import { Validation } from "../validation/validation";

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
}
