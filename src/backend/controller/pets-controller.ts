import { NextFunction, Request, Response } from "express";
import { CreatePetsRequest } from "../model/pets-model";
import { PetsService } from "../service/pets-service";

export class PetsController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreatePetsRequest = req.body as CreatePetsRequest;
      const response = await PetsService.create(request);
      res.status(201).json({
        message: "Data hewan peliharaan berhasil dibuat!",
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }
}
