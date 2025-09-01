import supertest from "supertest";
import {
  MedicinesTest,
  PrescriptionsTest,
  PrescriptionItemsTest,
} from "../test-util";
import { web } from "../../src/backend/application/web";
import { logger } from "../../src/backend/application/logging";
import { prismaClient } from "../../src/backend/application/database";
import bcrypt from "bcrypt";
import { createData, deleteData } from "../utils/data";

describe("GET /client/prescription-items", () => {
  beforeEach(async () => {
    await createData("transactions");
  });
  afterEach(async () => {
    await deleteData();
  });

  it("should return a list of prescription items", async () => {
    const response = await supertest(web)
      .get("/client/prescription-items")
      .set("SESSION-TOKEN", "token-client");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(2);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it("should return error if session is invalid", async () => {
    const response = await supertest(web)
      .get("/client/prescription-items")
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
        token: "token-veterinarian",
      },
    });

    const response = await supertest(web)
      .get("/client/prescription-items")
      .set("SESSION-TOKEN", "token-veterinarian");

    logger.debug(response.body);
    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});

describe("GET /client/prescription-items/:id", () => {
  beforeEach(async () => {
    await createData("transactions");
  });
  afterEach(async () => {
    await deleteData();
  });

  it("should get an existing prescription item", async () => {
    const item = await PrescriptionItemsTest.getPrescriptionItemsId();
    const response = await supertest(web)
      .get(`/client/prescription-items/${item?.id}`)
      .set("SESSION-TOKEN", "token-client");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(item?.id);
    expect(response.body.data.prescription_id).toBeDefined();
    expect(response.body.data.medicine_id).toBeDefined();
    expect(response.body.data.dosage).toBeDefined();
    expect(response.body.data.frequency).toBeDefined();
    expect(response.body.data.duration_days).toBeDefined();
    expect(response.body.data.instructions).toBeDefined();
  });

  it("should return error if prescription item not found", async () => {
    const response = await supertest(web)
      .get(`/client/prescription-items/99999`)
      .set("SESSION-TOKEN", "token-client");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBe("Data resep obat tidak ditemukan!");
  });

  it("should return error if session is invalid", async () => {
    const item = await PrescriptionItemsTest.getPrescriptionItemsId();
    const response = await supertest(web)
      .get(`/client/prescription-items/${item?.id}`)
      .set("SESSION-TOKEN", "invalid_token");

    expect(response.status).toBe(401);
    expect(response.body.errors).toBe("Unauthorized");
  });

  it("should return error if user doesn't have access", async () => {
    const item = await PrescriptionItemsTest.getPrescriptionItemsId();
    await prismaClient.user.create({
      data: {
        username: "dummy data2",
        fullname: "Lutfiya Ainurrahman Prasetyo",
        email: "lutfiyapr2.stu@pnc.ac.id",
        password: await bcrypt.hash("password", 10),
        role: "client",
        phone: "081915133813",
        token: "token-veterinarian",
      },
    });

    const response = await supertest(web)
      .get(`/client/prescription-items/${item?.id}`)
      .set("SESSION-TOKEN", "token-veterinarian");

    logger.debug(response.body);
    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});
