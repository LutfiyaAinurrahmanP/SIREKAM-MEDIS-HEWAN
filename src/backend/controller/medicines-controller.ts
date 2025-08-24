import { NextFunction, Response } from "express";
import { UserRequest } from "../type/user-request";
import { CreateMedicinesRequest } from "../model/medicines-model";
import { MedicinesService } from "../service/medicines-service";

export class MedicinesController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
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
}
