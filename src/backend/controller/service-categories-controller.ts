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

  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await ServiceCategoriesService.list();
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const serviceCategoriesId = Number(req.params.id);
      const response = await ServiceCategoriesService.get(serviceCategoriesId);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }
}
