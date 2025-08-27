import { NextFunction, Request, Response } from "express";
import { CreatePetsRequest, UpdatePetsRequest } from "../model/pets-model";
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

  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await PetsService.list();
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const petsId = Number(req.params.id);
      const response = await PetsService.get(petsId);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const request: UpdatePetsRequest = req.body as UpdatePetsRequest;
      request.id = Number(req.params.id);
      const response = await PetsService.update(request);
      res.status(200).json({
        message: "Data hewan peliharaan berhasil diperbarui!",
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const petsId = Number(req.params.id);
      const response = await PetsService.delete(petsId);
      res.status(200).json({
        message: "Data hewan peliharaan berhasil dihapus!",
      });
    } catch (e) {
      next(e);
    }
  }
}
