import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { UniqueError } from "../error/unique-error";
import { AnimalTypes, User } from "../generated/prisma";
import {
  AnimalTypesResponse,
  CreateAnimalTypesRequest,
  toAnimalTypesResponse,
  UpdateAnimalTypesRequest,
} from "../model/animal-types-model";
import { AnimalTypesValidation } from "../validation/animal-types-validation";
import { Validation } from "../validation/validation";

export class AnimalTypesService {
  static async create(
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

  static async list(): Promise<AnimalTypesResponse[]> {
    const animalTypes = await prismaClient.animalTypes.findMany({
      orderBy: {
        created_at: "desc",
      },
    });

    return animalTypes.map(toAnimalTypesResponse);
  }

  static async checkAnimalTypesMustExists(animalTypesId: number) {
    const animalTypes = await prismaClient.animalTypes.findUnique({
      where: {
        id: animalTypesId,
      },
    });

    if (!animalTypes) {
      throw new ResponseError(404, "Jenis hewan tidak ditemukan!");
    }

    return animalTypes;
  }

  static async get(animalTypesId: number): Promise<AnimalTypesResponse> {
    const animalTypes = await this.checkAnimalTypesMustExists(animalTypesId);
    return toAnimalTypesResponse(animalTypes);
  }

  static async update(
    req: UpdateAnimalTypesRequest
  ): Promise<AnimalTypesResponse> {
    const updateRequest = Validation.validate(
      AnimalTypesValidation.UPDATE,
      req
    );

    await this.checkAnimalTypesMustExists(updateRequest.id);

    const animalTypes = await prismaClient.animalTypes.update({
      where: {
        id: updateRequest.id,
      },
      data: {
        ...updateRequest,
        updated_at: new Date(),
      },
    });

    return toAnimalTypesResponse(animalTypes!);
  }

  static async delete(animalTypesId: number): Promise<AnimalTypesResponse> {
    const deleteRequest = await this.checkAnimalTypesMustExists(animalTypesId);
    const animalServices = await prismaClient.animalTypes.delete({
      where: {
        id: deleteRequest.id,
      },
    });
    return animalServices;
  }
}
