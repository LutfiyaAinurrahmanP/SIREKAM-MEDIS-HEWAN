import { NextFunction, Request, Response } from "express";
import { CreatePrescriptionItemsRequest } from "../model/prescription-items-model";
import { PrescriptionItemsService } from "../service/prescription-items-service";

export class PrescriptionItemsController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreatePrescriptionItemsRequest =
        req.body as CreatePrescriptionItemsRequest;
      const response = await PrescriptionItemsService.create(request);
      res.status(201).json({
        message: "Data resep obat berhasil dibuat!",
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }
}
