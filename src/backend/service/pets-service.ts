import { prismaClient } from "../application/database";
import {
  CreatePetsRequest,
  PetsResponse,
  toPetsResponse,
} from "../model/pets-model";
import { PetsValidation } from "../validation/pets-validation";
import { Validation } from "../validation/validation";

export class PetsService {
  static async create(req: CreatePetsRequest): Promise<PetsResponse> {
    const createRequest = Validation.validate(PetsValidation.CREATE, req);
    const record = {
      ...createRequest,
      birth_date: new Date(),
      created_at: new Date(),
    };

    const pets = await prismaClient.pets.create({
      data: record,
    });

    return toPetsResponse(pets);
  }
}
