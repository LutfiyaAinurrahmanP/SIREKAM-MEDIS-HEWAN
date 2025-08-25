import { date } from "zod";
import {
  CreateServiceCategoriesRequest,
  ServiceCategoriesResponse,
  toServiceCategoriesResponse,
  UpdateServiceCategoriesRequest,
} from "../model/service-categories";
import { ServiceCategoriesValidation } from "../validation/service-categories-validation";
import { Validation } from "../validation/validation";
import { prismaClient } from "../application/database";
import { UniqueError } from "../error/unique-error";
import { ResponseError } from "../error/response-error";

export class ServiceCategoriesService {
  static async create(
    req: CreateServiceCategoriesRequest
  ): Promise<ServiceCategoriesResponse> {
    const createRequest = Validation.validate(
      ServiceCategoriesValidation.CREATE,
      req
    );

    const record = {
      ...createRequest,
      created_at: new Date(),
    };

    const serviceCategoris = await prismaClient.serviceCategories.create({
      data: record,
    });

    return toServiceCategoriesResponse(serviceCategoris);
  }

  static async list(): Promise<ServiceCategoriesResponse[]> {
    const serviceCategories = await prismaClient.serviceCategories.findMany({
      orderBy: {
        id: "desc",
      },
    });

    if (!serviceCategories) {
      throw new ResponseError(404, "Data jenis layanan tidak ditemukan!");
    }

    return serviceCategories.map(toServiceCategoriesResponse);
  }

  static async checkServiceCategoriesMustExists(serviceCategoriesId: number) {
    const serviceCategories = await prismaClient.serviceCategories.findUnique({
      where: {
        id: serviceCategoriesId,
      },
    });

    if (!serviceCategories) {
      throw new ResponseError(404, "Data jenis layanan tidak ditemukan!");
    }
    return serviceCategories;
  }

  static async get(
    serviceCategoriesId: number
  ): Promise<ServiceCategoriesResponse> {
    const serviceCategories = await this.checkServiceCategoriesMustExists(
      serviceCategoriesId
    );
    return toServiceCategoriesResponse(serviceCategories);
  }

  static async update(
    req: UpdateServiceCategoriesRequest
  ): Promise<ServiceCategoriesResponse> {
    const updateRequest = Validation.validate(
      ServiceCategoriesValidation.UPDATE,
      req
    );
    await this.checkServiceCategoriesMustExists(updateRequest.id);
    const serviceCategories = await prismaClient.serviceCategories.update({
      where: {
        id: updateRequest.id,
      },
      data: {
        ...updateRequest,
        updated_at: new Date(),
      },
    });

    return toServiceCategoriesResponse(serviceCategories!);
  }
}
