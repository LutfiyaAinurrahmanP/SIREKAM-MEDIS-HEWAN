import supertest from "supertest";
import {
  AnimalTypesTest,
  MedicinesTest,
  PetsTest,
  UserTest,
} from "../test-util";
import { web } from "../../src/backend/application/web";
import { logger } from "../../src/backend/application/logging";
import e from "express";
import { prismaClient } from "../../src/backend/application/database";
import bcrypt from "bcrypt";
import { createData, deleteData } from "../utils/data";

// User spec API
describe("GET /veterinarian/users", () => {
  beforeEach(async () => {
    await createData("users");
  });
  afterEach(async () => {
    await deleteData();
  });

  it("should return a list of users", async () => {
    const response = await supertest(web)
      .get("/veterinarian/users")
      .set("SESSION-TOKEN", "token-veterinarian");

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(4);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it("should return error if not authorized", async () => {
    const response = await supertest(web)
      .get("/veterinarian/users")
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
      .get("/veterinarian/users")
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
      .get(`/veterinarian/users`)
      .set("SESSION-TOKEN", "token-client");

    logger.debug(response.body);
    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});

describe("GET /veterinarian/users/:id", () => {
  beforeEach(async () => {
    await createData("users");
  });
  afterEach(async () => {
    await deleteData();
  });

  it("should get an existing user", async () => {
    const user = await UserTest.getUserId();
    const response = await supertest(web)
      .get(`/veterinarian/users/${user?.id}`)
      .set("SESSION-TOKEN", "token-veterinarian");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.username).toBe("lutfiyapr");
    expect(response.body.data.fullname).toBe("Lutfiya Ainurrahman Prasetyo");
    expect(response.body.data.email).toBe("lutfiyapr.stu@pnc.ac.id");
  });

  it("should return error if user not found", async () => {
    const response = await supertest(web)
      .get(`/veterinarian/users/99999`)
      .set("SESSION-TOKEN", "token-veterinarian");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBe("Data user tidak ditemukan!");
  });

  it("should return error if not authorized", async () => {
    const user = await UserTest.getUserId();
    const response = await supertest(web)
      .get(`/veterinarian/users/${user?.id}`)
      .set("SESSION-TOKEN", "invalid_token");

    expect(response.status).toBe(401);
    expect(response.body.errors).toBe("Unauthorized");
  });

  it("should return error if user doesn't have access", async () => {
    const user = await UserTest.getUserId();
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
      .get(`/veterinarian/users/${user?.id}`)
      .set("SESSION-TOKEN", "token-client");

    logger.debug(response.body);

    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});

describe("PATCH /veterinarian/users/:id", () => {
  beforeEach(async () => {
    await UserTest.deleteUser();
    await UserTest.createUser();
  });
  afterEach(async () => {
    await UserTest.deleteUser();
  });

  it("should update an existing user", async () => {
    const user = await UserTest.getUserId();
    const response = await supertest(web)
      .patch(`/veterinarian/users/${user?.id}`)
      .set("SESSION-TOKEN", "token-veterinarian")
      .send({
        username: "dummy data2",
        fullname: "Updated User Name",
        email: "updated@example.com",
        password: "newpassword",
        role: "client",
        phone: "081234567890",
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Data user berhasil diperbarui!");
    expect(response.body.data.username).toBe("dummy data2");
    expect(response.body.data.fullname).toBe("Updated User Name");
    expect(response.body.data.email).toBe("updated@example.com");
    expect(response.body.data.role).toBe("client");
    expect(response.body.data.phone).toBe("081234567890");
  });

  it("should return error if request is invalid", async () => {
    const user = await UserTest.getUserId();
    const response = await supertest(web)
      .patch(`/veterinarian/users/${user?.id}`)
      .set("SESSION-TOKEN", "token-veterinarian")
      .send({
        username: "",
        fullname: "Updated User Name",
        email: "updated@example.com",
        password: "newpassword",
        role: "client",
        phone: "081234567890",
      });

    logger.debug(response.body);

    expect(response.status).toBe(400);
    expect(response.body.errors.username.required).toBe(
      "Username harus diisi!"
    );
  });

  it("should return error if user not found", async () => {
    const response = await supertest(web)
      .patch(`/veterinarian/users/99999`)
      .set("SESSION-TOKEN", "token-veterinarian")
      .send({
        username: "updateduser",
        fullname: "Updated User Name",
        email: "updated@example.com",
        password: "newpassword",
        role: "client",
        phone: "081234567890",
      });

    logger.debug(response.body);

    expect(response.status).toBe(404);
    expect(response.body.errors).toBe("Data user tidak ditemukan!");
  });

  it("should return error if not authorized", async () => {
    const user = await UserTest.getUserId();
    const response = await supertest(web)
      .patch(`/veterinarian/users/${user?.id}`)
      .set("SESSION-TOKEN", "invalid_token")
      .send({
        username: "updateduser",
        fullname: "Updated User Name",
        email: "updated@example.com",
        password: "newpassword",
        role: "client",
        phone: "081234567890",
      });

    expect(response.status).toBe(401);
    expect(response.body.errors).toBe("Unauthorized");
  });

  it("should return error if user doesn't have access", async () => {
    const user = await UserTest.getUserId();
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
      .patch(`/veterinarian/users/${user?.id}`)
      .set("SESSION-TOKEN", "token-client")
      .send({
        username: "updateduser",
        fullname: "Updated User Name",
        email: "updated@example.com",
        password: "newpassword",
        role: "client",
        phone: "081234567890",
      });

    logger.debug(response.body);

    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});

describe("DELETE /veterinarian/users/:id", () => {
  beforeEach(async () => {
    await createData("users");
  });
  afterEach(async () => {
    await deleteData();
  });

  it("should delete an existing user", async () => {
    const user = await UserTest.getUserId();
    const response = await supertest(web)
      .delete(`/veterinarian/users/${user?.id}`)
      .set("SESSION-TOKEN", "token-veterinarian");

    logger.debug(response.body);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Data user berhasil dihapus!");
  });

  it("should return error if user not found", async () => {
    const response = await supertest(web)
      .delete(`/veterinarian/users/99999`)
      .set("SESSION-TOKEN", "token-veterinarian");

    logger.debug(response.body);

    expect(response.status).toBe(404);
    expect(response.body.errors).toBe("Data user tidak ditemukan!");
  });

  it("should return error if not authorized", async () => {
    const user = await UserTest.getUserId();
    const response = await supertest(web)
      .delete(`/veterinarian/users/${user?.id}`)
      .set("SESSION-TOKEN", "invalid_token");

    expect(response.status).toBe(401);
    expect(response.body.errors).toBe("Unauthorized");
  });

  it("should return error if user doesn't have access", async () => {
    const user = await UserTest.getUserId();
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
      .delete(`/veterinarian/users/${user?.id}`)
      .set("SESSION-TOKEN", "token-client");

    logger.debug(response.body);

    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});
