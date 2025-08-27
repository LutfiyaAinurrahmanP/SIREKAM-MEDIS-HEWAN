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
}
