import { NextFunction, Request, Response } from "express";
import { CreatePrescriptionsRequest } from "../model/prescriptions-model";
import { PrescriptionsService } from "../service/prescriptions-service";

export class PrescriptionsController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreatePrescriptionsRequest =
        req.body as CreatePrescriptionsRequest;
      const response = await PrescriptionsService.create(request);
      res.status(200).json({
        message: "Data resep obat berhasil dibuat!",
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }
}
