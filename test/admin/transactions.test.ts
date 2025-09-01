import supertest from "supertest";
import { web } from "../../src/backend/application/web";
import { logger } from "../../src/backend/application/logging";
import { prismaClient } from "../../src/backend/application/database";
import bcrypt from "bcrypt";
import { createData, deleteData } from "../utils/data";
import { TransactionsTest } from "../test-util";

describe("GET /admin/transactions", () => {
  beforeEach(async () => {
    await createData("transactions");
  });
  afterEach(async () => {
    await deleteData();
  });

  it("should return a list of transactions", async () => {
    const response = await supertest(web)
      .get("/admin/transactions")
      .set("SESSION-TOKEN", "token-admin");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(2);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it("should return error if session is invalid", async () => {
    const response = await supertest(web)
      .get("/admin/transactions")
      .set("SESSION-TOKEN", "invalid_token");

    expect(response.status).toBe(401);
    expect(response.body.errors).toBe("Unauthorized");
  });

  it("should return error if user doesn't have access", async () => {
    await prismaClient.user.create({
      data: {
        username: "dummy data2",
        fullname: "Lutfiya Ainurrahman Prasetyo",
        email: "lutfiyapr2.stu@pnc.ac.id",
        password: await bcrypt.hash("password", 10),
        role: "client",
        phone: "081915133813",
        token: "token234",
      },
    });

    const response = await supertest(web)
      .get("/admin/transactions")
      .set("SESSION-TOKEN", "token234");

    logger.debug(response.body);
    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});

describe("GET /admin/transactions/:id", () => {
  beforeEach(async () => {
    await createData("transactions");
  });
  afterEach(async () => {
    await deleteData();
  });

  it("should get an existing transaction", async () => {
    const transaction = await TransactionsTest.getTransactionsId();
    const response = await supertest(web)
      .get(`/admin/transactions/${transaction?.id}`)
      .set("SESSION-TOKEN", "token-admin");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(transaction?.id);
    expect(response.body.data.created_by).toBeDefined();
    expect(response.body.data.pet_id).toBeDefined();
    expect(response.body.data.total_amount).toBeDefined();
    expect(response.body.data.paid_amount).toBeDefined();
    expect(response.body.data.payment_status).toBeDefined();
    expect(response.body.data.payment_method).toBeDefined();
    expect(response.body.data.invoice_date).toBeDefined();
  });

  it("should return error if transaction not found", async () => {
    const response = await supertest(web)
      .get(`/admin/transactions/99999`)
      .set("SESSION-TOKEN", "token-admin");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBe("Data transaksi tidak ditemukan!");
  });

  it("should return error if session is invalid", async () => {
    const transaction = await TransactionsTest.getTransactionsId();
    const response = await supertest(web)
      .get(`/admin/transactions/${transaction?.id}`)
      .set("SESSION-TOKEN", "invalid_token");

    expect(response.status).toBe(401);
    expect(response.body.errors).toBe("Unauthorized");
  });

  it("should return error if user doesn't have access", async () => {
    const transaction = await TransactionsTest.getTransactionsId();
    await prismaClient.user.create({
      data: {
        username: "dummy data2",
        fullname: "Lutfiya Ainurrahman Prasetyo",
        email: "lutfiyapr2.stu@pnc.ac.id",
        password: await bcrypt.hash("password", 10),
        role: "client",
        phone: "081915133813",
        token: "token234",
      },
    });

    const response = await supertest(web)
      .get(`/admin/transactions/${transaction?.id}`)
      .set("SESSION-TOKEN", "token234");

    logger.debug(response.body);
    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});
