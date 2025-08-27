import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
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

  static async list(): Promise<PetsResponse[]> {
    const pets = await prismaClient.pets.findMany({
      orderBy: {
        id: "desc",
      },
    });

    if (!pets) {
      throw new ResponseError(404, "Data hewan peliharaan tidak ditemukan!");
    }

    return pets.map(toPetsResponse);
  }
}
