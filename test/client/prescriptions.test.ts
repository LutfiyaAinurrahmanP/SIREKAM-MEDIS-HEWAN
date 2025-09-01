import supertest from "supertest";
import {
  UserTest,
  MedicalRecordsTest,
  PrescriptionsTest,
  PetsTest,
  AppointmentsTest,
  ServiceCategoriesTest,
  AnimalTypesTest,
} from "../test-util";
import { web } from "../../src/backend/application/web";
import { logger } from "../../src/backend/application/logging";
import { prismaClient } from "../../src/backend/application/database";
import bcrypt from "bcrypt";
import { createData, deleteData } from "../utils/data";

describe("GET /client/prescriptions", () => {
  beforeEach(async () => {
    await createData("prescriptions");
  });
  afterEach(async () => {
    await deleteData();
  });

  it("should return a list of prescriptions", async () => {
    const response = await supertest(web)
      .get("/client/prescriptions")
      .set("SESSION-TOKEN", "token-client");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(2);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it("should return error if session is invalid", async () => {
    const response = await supertest(web)
      .get("/client/prescriptions")
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
      .get("/client/prescriptions")
      .set("SESSION-TOKEN", "token-veterinarian");

    logger.debug(response.body);
    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});

describe("GET /client/prescriptions/:id", () => {
  beforeEach(async () => {
    await createData("prescriptions");
  });
  afterEach(async () => {
    await deleteData();
  });

  it("should get an existing prescription", async () => {
    const prescription = await PrescriptionsTest.getPrescriptionsId();
    const response = await supertest(web)
      .get(`/client/prescriptions/${prescription?.id}`)
      .set("SESSION-TOKEN", "token-client");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(prescription?.id);
    expect(response.body.data.medical_record_id).toBeDefined();
    expect(response.body.data.veterinarian_id).toBeDefined();
    expect(response.body.data.notes).toBeDefined();
  });

  it("should return error if prescription not found", async () => {
    const response = await supertest(web)
      .get(`/client/prescriptions/99999`)
      .set("SESSION-TOKEN", "token-client");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBe("Data resep tidak ditemukan!");
  });

  it("should return error if session is invalid", async () => {
    const prescription = await PrescriptionsTest.getPrescriptionsId();
    const response = await supertest(web)
      .get(`/client/prescriptions/${prescription?.id}`)
      .set("SESSION-TOKEN", "invalid_token");

    expect(response.status).toBe(401);
    expect(response.body.errors).toBe("Unauthorized");
  });

  it("should return error if user doesn't have access", async () => {
    const prescription = await PrescriptionsTest.getPrescriptionsId();
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
      .get(`/client/prescriptions/${prescription?.id}`)
      .set("SESSION-TOKEN", "token-veterinarian");

    logger.debug(response.body);
    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});
