import { NextFunction, Response } from "express";
import { AnimalTypesRequest } from "../type/animal-types-request";
import { AnimalTypesService } from "../service/animal-types-service";
import { UserRequest } from "../type/user-request";
import { CreateAnimalTypesRequest } from "../model/animal-types-model";

export class AnimalTypesController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: CreateAnimalTypesRequest =
        req.body as CreateAnimalTypesRequest;
      const response = await AnimalTypesService.create(req.user!, request);
      res.status(201).json({
        message: "Data jenis hewan berhasil dibuat!",
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }
}
