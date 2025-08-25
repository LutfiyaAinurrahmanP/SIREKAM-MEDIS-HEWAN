import { NextFunction, Request, Response } from "express";
import { CreateServiceCategoriesRequest } from "../model/service-categories";
import { ServiceCategoriesService } from "../service/service-categories-service";

export class ServiceCategoriesController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateServiceCategoriesRequest =
        req.body as CreateServiceCategoriesRequest;
      const response = await ServiceCategoriesService.create(request);
      res.status(201).json({
        message: "Data jenis layanan berhasil dibuat!",
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }
}
