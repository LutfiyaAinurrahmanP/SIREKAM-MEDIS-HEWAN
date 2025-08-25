import { NextFunction, Request, Response } from "express";
import { UserRequest } from "../type/user-request";
import { CreateMedicinesRequest } from "../model/medicines-model";
import { MedicinesService } from "../service/medicines-service";

export class MedicinesController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateMedicinesRequest =
        req.body as CreateMedicinesRequest;
      const response = await MedicinesService.create(request);
      res.status(201).json({
        message: "Data obat berhasil dibuat!",
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await MedicinesService.list();
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const medicinesId = Number(req.params.id);
      const response = await MedicinesService.get(medicinesId);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }
}
