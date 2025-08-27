import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { Pets } from "../generated/prisma";
import {
  CreatePetsRequest,
  PetsResponse,
  toPetsResponse,
  UpdatePetsRequest,
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

  static async checkPetsMustExists(petsId: number) {
    const pets = await prismaClient.pets.findUnique({
      where: {
        id: petsId,
      },
    });

    if (!pets) {
      throw new ResponseError(404, "Data hewan peliharaan tidak ditemukan!");
    }

    return pets;
  }

  static async get(petsId: number): Promise<PetsResponse> {
    const pets = await this.checkPetsMustExists(petsId);
    return toPetsResponse(pets!);
  }

  static async update(req: UpdatePetsRequest): Promise<PetsResponse> {
    const updateRequest = Validation.validate(PetsValidation.UPDATE, req);
    await this.checkPetsMustExists(updateRequest.id);
    const pets = await prismaClient.pets.update({
      where: {
        id: updateRequest.id,
      },
      data: {
        ...updateRequest,
        updated_at: new Date(),
      },
    });

    return toPetsResponse(pets);
  }

  static async delete(petsId: number): Promise<PetsResponse> {
    const deleteRequest = await this.checkPetsMustExists(petsId);
    const pets = await prismaClient.pets.delete({
      where: {
        id: deleteRequest.id,
      },
    });
    return toPetsResponse(pets);
  }
}
