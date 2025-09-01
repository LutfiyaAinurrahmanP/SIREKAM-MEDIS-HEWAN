import supertest from "supertest";
import {
  UserTest,
  MedicalRecordsTest,
  TreatmentNotesTest,
  AnimalTypesTest,
  AppointmentsTest,
  PetsTest,
  TransactionsTest,
  PrescriptionItemsTest,
  PrescriptionsTest,
  ServiceCategoriesTest,
  MedicinesTest,
} from "../test-util";
import { web } from "../../src/backend/application/web";
import { logger } from "../../src/backend/application/logging";
import { prismaClient } from "../../src/backend/application/database";
import bcrypt from "bcrypt";
import { createData, deleteData } from "../utils/data";

describe("GET /client/treatment-notes", () => {
  beforeEach(async () => {
    await createData("treatment-notes");
  });
  afterEach(async () => {
    await deleteData();
  });

  it("should return a list of treatment notes", async () => {
    const response = await supertest(web)
      .get("/client/treatment-notes")
      .set("SESSION-TOKEN", "token-client");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(2);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it("should return error if session is invalid", async () => {
    const response = await supertest(web)
      .get("/client/treatment-notes")
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
      .get("/client/treatment-notes")
      .set("SESSION-TOKEN", "token-veterinarian");

    logger.debug(response.body);
    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});

describe("GET /client/treatment-notes/:id", () => {
  beforeEach(async () => {
    await createData("treatment-notes");
  });
  afterEach(async () => {
    await deleteData();
  });

  it("should get an existing treatment note", async () => {
    const treatmentNote = await TreatmentNotesTest.getTreatmentNotesId();
    const response = await supertest(web)
      .get(`/client/treatment-notes/${treatmentNote?.id}`)
      .set("SESSION-TOKEN", "token-client");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(treatmentNote?.id);
    expect(response.body.data.created_by).toBeDefined();
    expect(response.body.data.medical_record_id).toBeDefined();
    expect(response.body.data.notes).toBeDefined();
  });

  it("should return error if treatment note not found", async () => {
    const response = await supertest(web)
      .get(`/client/treatment-notes/99999`)
      .set("SESSION-TOKEN", "token-client");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBe(
      "Data catatan perawatan tidak ditemukan!"
    );
  });

  it("should return error if session is invalid", async () => {
    const treatmentNote = await TreatmentNotesTest.getTreatmentNotesId();
    const response = await supertest(web)
      .get(`/client/treatment-notes/${treatmentNote?.id}`)
      .set("SESSION-TOKEN", "invalid_token");

    expect(response.status).toBe(401);
    expect(response.body.errors).toBe("Unauthorized");
  });

  it("should return error if user doesn't have access", async () => {
    const treatmentNote = await TreatmentNotesTest.getTreatmentNotesId();
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
      .get(`/client/treatment-notes/${treatmentNote?.id}`)
      .set("SESSION-TOKEN", "token-veterinarian");

    logger.debug(response.body);
    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});
