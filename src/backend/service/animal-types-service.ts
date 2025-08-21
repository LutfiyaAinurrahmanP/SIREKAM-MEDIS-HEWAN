import { prismaClient } from "../application/database";
import { UniqueError } from "../error/unique-error";
import { User } from "../generated/prisma";
import {
  AnimalTypesResponse,
  CreateAnimalTypesRequest,
  toAnimalTypesResponse,
} from "../model/animal-types-model";
import { AnimalTypesValidation } from "../validation/animal-types-validation";
import { Validation } from "../validation/validation";

export class AnimalTypesService {
  static async create(
    user: User,
    req: CreateAnimalTypesRequest
  ): Promise<AnimalTypesResponse> {
    const createRequest = Validation.validate(
      AnimalTypesValidation.CREATE,
      req
    );

    const record = {
      ...createRequest,
      
      created_at: new Date(),
    };

    const checkAnimalTypesNameExists = await prismaClient.animalTypes.count({
      where: {
        name: req.name,
      },
    });

    if (checkAnimalTypesNameExists != 0) {
      throw new UniqueError("name", "Nama jenis hewan sudah dipakai!");
    }

    const animalTypes = await prismaClient.animalTypes.create({
      data: record,
    });

    return toAnimalTypesResponse(animalTypes);
  }
}
