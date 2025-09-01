import { NextFunction, Request, Response } from "express";
import { CreatePrescriptionsRequest, UpdatePrescriptionsRequest } from "../model/prescriptions-model";
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

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const request = Number(req.params.id);
      const response = await PrescriptionsService.get(request);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const request: UpdatePrescriptionsRequest = req.body as UpdatePrescriptionsRequest;
      request.id = Number(req.params.id);
      const response = await PrescriptionsService.update(request);
      res.status(200).json({
        message: "Data resep berhasil diperbarui!",
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }
}
