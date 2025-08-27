import { NextFunction, Request, Response } from "express";
import { CreateAppointmentsRequest } from "../model/appointments-model";
import { AppointmentsService } from "../service/appointments-service";

export class AppointmentsController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateAppointmentsRequest =
        req.body as CreateAppointmentsRequest;
      const response = await AppointmentsService.create(request);
      res.status(201).json({
        message: "Data janji temu berhasil dibuat!",
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await AppointmentsService.list();
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const appointmentsId = Number(req.params.id);
      const response = await AppointmentsService.get(appointmentsId);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }
}
