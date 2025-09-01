import supertest from "supertest";
import {
  AnimalTypesTest,
  MedicinesTest,
  PetsTest,
  UserTest,
  AppointmentsTest,
  MedicalRecordsTest,
  ServiceCategoriesTest,
} from "../test-util";
import { web } from "../../src/backend/application/web";
import { logger } from "../../src/backend/application/logging";
import { prismaClient } from "../../src/backend/application/database";
import bcrypt from "bcrypt";
import { createData, deleteData } from "../utils/data";

describe("GET /admin/medical-records", () => {
  beforeEach(async () => {
    await createData("medical-records");
  });
  afterEach(async () => {
    await deleteData();
  });

  it("should return a list of medical records", async () => {
    const response = await supertest(web)
      .get("/admin/medical-records")
      .set("SESSION-TOKEN", "token-admin");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(2);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it("should return error if session is invalid", async () => {
    const response = await supertest(web)
      .get("/admin/medical-records")
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
      .get("/admin/medical-records")
      .set("SESSION-TOKEN", "token-client");

    logger.debug(response.body);
    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});

describe("GET /admin/medical-records/:id", () => {
  beforeEach(async () => {
    await createData("medical-records");
  });
  afterEach(async () => {
    await deleteData();
  });

  it("should get an existing medical record", async () => {
    const medicalRecord = await MedicalRecordsTest.getMedicalRecordsId();
    const response = await supertest(web)
      .get(`/admin/medical-records/${medicalRecord?.id}`)
      .set("SESSION-TOKEN", "token-admin");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(medicalRecord?.id);
    expect(response.body.data.pet_id).toBeDefined();
    expect(response.body.data.service_id).toBeDefined();
    expect(response.body.data.veterinarian_id).toBeDefined();
    expect(response.body.data.visit_date).toBeDefined();
    expect(response.body.data.status).toBeDefined();
  });

  it("should return error if medical record not found", async () => {
    const response = await supertest(web)
      .get(`/admin/medical-records/99999`)
      .set("SESSION-TOKEN", "token-admin");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBe("Data rekam medis tidak ditemukan!");
  });

  it("should return error if session is invalid", async () => {
    const medicalRecord = await MedicalRecordsTest.getMedicalRecordsId();
    const response = await supertest(web)
      .get(`/admin/medical-records/${medicalRecord?.id}`)
      .set("SESSION-TOKEN", "invalid_token");

    expect(response.status).toBe(401);
    expect(response.body.errors).toBe("Unauthorized");
  });

  it("should return error if user doesn't have access", async () => {
    const medicalRecord = await MedicalRecordsTest.getMedicalRecordsId();
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
      .get(`/admin/medical-records/${medicalRecord?.id}`)
      .set("SESSION-TOKEN", "token-client");

    logger.debug(response.body);
    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});
