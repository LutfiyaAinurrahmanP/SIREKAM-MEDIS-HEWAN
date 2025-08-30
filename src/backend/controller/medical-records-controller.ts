import { NextFunction, Request, Response } from "express";
import {
  CreateMedicalRecordsRequest,
  UpdateMedicalRecordsRequest,
} from "../model/medical-records-model";
import MedicalRecordsService from "../service/medical-records-service";

export default class MedicalRecordsController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateMedicalRecordsRequest =
        req.body as CreateMedicalRecordsRequest;
      const response = await MedicalRecordsService.create(request);
      res.status(201).json({
        message: "Data rekam medis berhasil dibuat!",
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await MedicalRecordsService.list();
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
      const response = await MedicalRecordsService.get(request);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const request: UpdateMedicalRecordsRequest =
        req.body as UpdateMedicalRecordsRequest;
      request.id = Number(req.params.id);
      const response = await MedicalRecordsService.update(request);
      res.status(200).json({
        message: "Data rekam medis berhasil diperbarui!",
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }
}
