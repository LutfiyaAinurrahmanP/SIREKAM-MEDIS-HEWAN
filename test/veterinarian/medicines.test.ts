import supertest from "supertest";
import {
  AnimalTypesTest,
  MedicinesTest,
  PetsTest,
  UserTest,
} from "../test-util";
import { web } from "../../src/backend/application/web";
import { logger } from "../../src/backend/application/logging";
import { prismaClient } from "../../src/backend/application/database";
import bcrypt from "bcrypt";
import { createData, deleteData } from "../utils/data";

describe("GET /veterinarian/medicines", () => {
  beforeEach(async () => {
    await createData("medicines");
  });
  afterEach(async () => {
    await deleteData();
  });

  it("should return a list of medicines", async () => {
    const response = await supertest(web)
      .get("/veterinarian/medicines")
      .set("SESSION-TOKEN", "token-veterinarian");

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(2);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it("should return error if not authorized", async () => {
    const response = await supertest(web)
      .get("/veterinarian/medicines")
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
        token: "token-client",
      },
    });
    const response = await supertest(web)
      .get("/veterinarian/medicines")
      .set("SESSION-TOKEN", "token-client");

    logger.debug(response.body);

    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
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
        token: "token-client",
      },
    });
    const response = await supertest(web)
      .get(`/veterinarian/medicines`)
      .set("SESSION-TOKEN", "token-client");

    logger.debug(response.body);
    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});

describe("GET /veterinarian/medicines/:id", () => {
  beforeEach(async () => {
    await createData("medicines");
  });
  afterEach(async () => {
    await deleteData();
  });

  it("should get an existing medicine", async () => {
    const medicine = await MedicinesTest.getMedicineId();
    const response = await supertest(web)
      .get(`/veterinarian/medicines/${medicine?.id}`)
      .set("SESSION-TOKEN", "token-veterinarian");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe("Amoxicillin 500mg");
    expect(response.body.data.code).toBe("OBT-AX500");
    expect(response.body.data.type).toBe("tablets");
  });

  it("should return error if medicine not found", async () => {
    const response = await supertest(web)
      .get(`/veterinarian/medicines/99999`)
      .set("SESSION-TOKEN", "token-veterinarian");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBe("Data obat tidak ditemukan!");
  });

  it("should return error if not authorized", async () => {
    const medicine = await MedicinesTest.getMedicineId();
    const response = await supertest(web)
      .get(`/veterinarian/medicines/${medicine?.id}`)
      .set("SESSION-TOKEN", "invalid_token");

    expect(response.status).toBe(401);
    expect(response.body.errors).toBe("Unauthorized");
  });

  it("should return error if user doesn't have access", async () => {
    const medicine = await MedicinesTest.getMedicineId();
    await prismaClient.user.create({
      data: {
        username: "dummy data2",
        fullname: "Lutfiya Ainurrahman Prasetyo",
        email: "lutfiyapr2.stu@pnc.ac.id",
        password: await bcrypt.hash("password", 10),
        role: "client",
        phone: "081915133813",
        token: "token-client",
      },
    });
    const response = await supertest(web)
      .get(`/veterinarian/medicines/${medicine?.id}`)
      .set("SESSION-TOKEN", "token-client");

    logger.debug(response.body);

    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});
