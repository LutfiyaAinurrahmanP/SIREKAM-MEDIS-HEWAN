import { NextFunction, Request, Response } from "express";
import { CreateTransactionsRequest } from "../model/transactions-model";
import { TransactionsService } from "../service/transactions-service";

export class TransactionsController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateTransactionsRequest =
        req.body as CreateTransactionsRequest;
      const response = await TransactionsService.create(request);
      res.status(201).json({
        message: "Data transaksi berhasil dibuat!",
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await TransactionsService.list();
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
      const response = await TransactionsService.getTransactionById(request);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }
}
