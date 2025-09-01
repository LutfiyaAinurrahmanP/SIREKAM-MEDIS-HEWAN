import { prismaClient } from "../application/database";
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
}
