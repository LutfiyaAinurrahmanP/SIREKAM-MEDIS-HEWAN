import { NextFunction, Request, Response } from "express";
import {
  CreatePrescriptionItemsRequest,
  UpdatePrescriptionItemsRequest,
} from "../model/prescription-items-model";
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

  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await PrescriptionItemsService.list();
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const request = Number(req.params.id);
      const response = await PrescriptionItemsService.get(request);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const request: UpdatePrescriptionItemsRequest =
        req.body as UpdatePrescriptionItemsRequest;
      request.id = Number(req.params.id);
      const response = await PrescriptionItemsService.update(request);
      res.status(200).json({
        message: "Data resep obat berhasil diperbarui!",
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }
}
