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
}
