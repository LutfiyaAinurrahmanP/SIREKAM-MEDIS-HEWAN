import { NextFunction, Request, Response } from "express";
import { CreatePrescriptionsRequest } from "../model/prescriptions-model";
import { PrescriptionsService } from "../service/prescriptions-service";

export class PrescriptionsController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreatePrescriptionsRequest =
        req.body as CreatePrescriptionsRequest;
      const response = await PrescriptionsService.create(request);
      res.status(201).json({
        message: "Data resep berhasil dibuat!",
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await PrescriptionsService.list();
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }
}
