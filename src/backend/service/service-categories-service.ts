import { date } from "zod";
import {
  CreateServiceCategoriesRequest,
  ServiceCategoriesResponse,
  toServiceCategoriesResponse,
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
}
