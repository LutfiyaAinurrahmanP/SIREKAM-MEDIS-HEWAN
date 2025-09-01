import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  CreateTransactionsRequest,
  toTransactionResponse,
  TransactionsResponse,
} from "../model/transactions-model";
import { TransactionsValidation } from "../validation/transactions-validation";
import { Validation } from "../validation/validation";

export class TransactionsService {
  static async create(
    req: CreateTransactionsRequest
  ): Promise<TransactionsResponse> {
    const createRequest = Validation.validate(
      TransactionsValidation.CREATE,
      req
    );

    const record = {
      ...createRequest,
      created_at: new Date(),
    };

    const transactions = await prismaClient.transactions.create({
      data: record,
    });

    return toTransactionResponse(transactions);
  }

  static async list(): Promise<TransactionsResponse[]> {
    const transactions = await prismaClient.transactions.findMany();
    return transactions.map(toTransactionResponse);
  }

  static async checkTransactionsMustExists(transactionsId: number) {
    const transaction = await prismaClient.transactions.findUnique({
      where: { id: transactionsId },
    });

    if (!transaction) {
      throw new ResponseError(404, "Data transaksi tidak ditemukan!");
    }
    return transaction;
  }

  static async getTransactionById(
    transactionsId: number
  ): Promise<TransactionsResponse> {
    const transaction = await TransactionsService.checkTransactionsMustExists(
      transactionsId
    );
    return toTransactionResponse(transaction);
  }
}
