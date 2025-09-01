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

describe("GET /veterinarian/pets", () => {
  beforeEach(async () => {
    await createData("pets");
  });
  afterEach(async () => {
    await deleteData();
  });

  it("should return a list of pets", async () => {
    const response = await supertest(web)
      .get("/veterinarian/pets")
      .set("SESSION-TOKEN", "token-veterinarian");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(2);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it("should return error if session is invalid", async () => {
    const response = await supertest(web)
      .get("/veterinarian/pets")
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
      .get("/veterinarian/pets")
      .set("SESSION-TOKEN", "token-client");

    logger.debug(response.body);
    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});

describe("GET /veterinarian/pets/:id", () => {
  beforeEach(async () => {
    await createData("pets");
  });
  afterEach(async () => {
    await deleteData();
  });

  it("should get an existing pet", async () => {
    const pet = await PetsTest.getPetsId();
    const response = await supertest(web)
      .get(`/veterinarian/pets/${pet?.id}`)
      .set("SESSION-TOKEN", "token-veterinarian");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(pet?.id);
    expect(response.body.data.name).toBeDefined();
    expect(response.body.data.owner_id).toBeDefined();
    expect(response.body.data.animal_type_id).toBeDefined();
    expect(response.body.data.gender).toBeDefined();
    expect(response.body.data.weight).toBeDefined();
  });

  it("should return error if pet not found", async () => {
    const response = await supertest(web)
      .get(`/veterinarian/pets/99999`)
      .set("SESSION-TOKEN", "token-veterinarian");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBe("Data hewan peliharaan tidak ditemukan!");
  });

  it("should return error if session is invalid", async () => {
    const pet = await PetsTest.getPetsId();
    const response = await supertest(web)
      .get(`/veterinarian/pets/${pet?.id}`)
      .set("SESSION-TOKEN", "invalid_token");

    expect(response.status).toBe(401);
    expect(response.body.errors).toBe("Unauthorized");
  });

  it("should return error if user doesn't have access", async () => {
    const pet = await PetsTest.getPetsId();
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
      .get(`/veterinarian/pets/${pet?.id}`)
      .set("SESSION-TOKEN", "token-client");

    logger.debug(response.body);
    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});
