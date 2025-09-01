import { NextFunction, Request, Response } from "express";
import { CreateTreatmentNotesRequest } from "../model/treatment-notes-model";
import { TreatmentNotesService } from "../service/treatment-notes-service";

export class TreatmentNotesController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateTreatmentNotesRequest =
        req.body as CreateTreatmentNotesRequest;
      const response = await TreatmentNotesService.create(request);
      res.status(201).json({
        message: "Data catatan perawatan berhasil dibuat!",
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }
}
