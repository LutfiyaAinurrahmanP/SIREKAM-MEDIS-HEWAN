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
}
