import { NextFunction, Response } from "express";
import { AnimalTypesService } from "../service/animal-types-service";
import { UserRequest } from "../type/user-request";
import {
  CreateAnimalTypesRequest,
  UpdateAnimalTypesRequest,
} from "../model/animal-types-model";

export class AnimalTypesController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: CreateAnimalTypesRequest =
        req.body as CreateAnimalTypesRequest;
      const response = await AnimalTypesService.create(request);
      res.status(201).json({
        message: "Data jenis hewan berhasil dibuat!",
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async list(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const response = await AnimalTypesService.list();
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async get(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const animalTypesId = Number(req.params.id);
      const response = await AnimalTypesService.get(animalTypesId);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: UpdateAnimalTypesRequest =
        req.body as UpdateAnimalTypesRequest;
      request.id = Number(req.params.id);
      const response = await AnimalTypesService.update(request);
      res.status(200).json({
        message: "Data jenis hewan berhasil diperbarui!",
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }
}
