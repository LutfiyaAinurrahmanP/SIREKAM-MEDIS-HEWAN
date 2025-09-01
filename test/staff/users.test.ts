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

describe("POST /staff/users", () => {
  beforeEach(async () => {
    await createData("users");
  });
  afterEach(async () => {
    await deleteData();
  });

  it("should create a new user", async () => {
    const response = await supertest(web)
      .post("/staff/users")
      .set("SESSION-TOKEN", "token-staff")
      .send({
        username: "admin",
        fullname: "Lutfiya Ainurrahman Prasetyo",
        email: "dummydata2.stu@pnc.ac.id",
        password: "password",
        role: "admin",
        phone: "081915133813",
      });
    logger.debug(response.body);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User berhasil dibuat!");
    expect(response.body.data.username).toBe("admin");
    expect(response.body.data.fullname).toBe("Lutfiya Ainurrahman Prasetyo");
    expect(response.body.data.email).toBe("dummydata2.stu@pnc.ac.id");
    expect(response.body.data.role).toBe("admin");
    expect(response.body.data.phone).toBe("081915133813");
  });

  it("should return error if username already exists", async () => {
    await supertest(web)
      .post("/staff/users")
      .set("SESSION-TOKEN", "token-staff")
      .send({
        username: "lutfiyapr",
        fullname: "Lutfiya Ainurrahman Prasetyo",
        email: "lutfiyapr.stu@pnc.ac.id",
        password: "password",
        role: "admin",
        phone: "081915133813",
      });
    const response = await supertest(web)
      .post("/staff/users")
      .set("SESSION-TOKEN", "token-staff")
      .send({
        username: "lutfiyapr",
        fullname: "John Doe",
        email: "john.doe@example.com",
        password: "password123",
        role: "client",
        phone: "081234567890",
      });
    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors.username.unique).toBe(
      "Username sudah dipakai!"
    );
  });

  it("should return error if username is required", async () => {
    const response = await supertest(web)
      .post("/staff/users")
      .set("SESSION-TOKEN", "token-staff")
      .send({
        username: "",
        fullname: "Lutfiya Ainurrahman Prasetyo",
        email: "lutfiyapr.stu@pnc.ac.id",
        password: "password",
        role: "admin",
        phone: "081915133813",
      });

    logger.debug(response.body);

    expect(response.status).toBe(400);
    expect(response.body.errors.username.required).toBe(
      "Username harus diisi!"
    );
  });

  it("should return error if username is too short", async () => {
    const response = await supertest(web)
      .post("/staff/users")
      .set("SESSION-TOKEN", "token-staff")
      .send({
        username: "abc",
        fullname: "Lutfiya Ainurrahman Prasetyo",
        email: "lutfiyapr.stu@pnc.ac.id",
        password: "password",
        role: "admin",
        phone: "081915133813",
      });

    expect(response.status).toBe(400);
    expect(response.body.errors.username.min).toBe(
      "Username memiliki minimal 5 karakter!"
    );
  });

  it("should return error if fullname is required", async () => {
    const response = await supertest(web)
      .post("/staff/users")
      .set("SESSION-TOKEN", "token-staff")
      .send({
        username: "lutfiyapr",
        fullname: "",
        email: "lutfiyapr.stu@pnc.ac.id",
        password: "password",
        role: "admin",
        phone: "081915133813",
      });

    expect(response.status).toBe(400);
    expect(response.body.errors.fullname.required).toBe(
      "Nama lengkap harus diisi!"
    );
  });

  it("should return error if email is required", async () => {
    const response = await supertest(web)
      .post("/staff/users")
      .set("SESSION-TOKEN", "token-staff")
      .send({
        username: "lutfiyapr",
        fullname: "Lutfiya Ainurrahman Prasetyo",
        email: "",
        password: "password",
        role: "admin",
        phone: "081915133813",
      });

    expect(response.status).toBe(400);
    expect(response.body.errors.email.required).toBe("Email harus diisi!");
  });

  it("should return error if password is required", async () => {
    const response = await supertest(web)
      .post("/staff/users")
      .set("SESSION-TOKEN", "token-staff")
      .send({
        username: "lutfiyapr",
        fullname: "Lutfiya Ainurrahman Prasetyo",
        email: "lutfiyapr.stu@pnc.ac.id",
        password: "",
        role: "admin",
        phone: "081915133813",
      });

    expect(response.status).toBe(400);
    expect(response.body.errors.password.required).toBe(
      "Password harus diisi!"
    );
  });

  it("should return error if password is too short", async () => {
    const response = await supertest(web)
      .post("/staff/users")
      .set("SESSION-TOKEN", "token-staff")
      .send({
        username: "lutfiyapr",
        fullname: "Lutfiya Ainurrahman Prasetyo",
        email: "lutfiyapr.stu@pnc.ac.id",
        password: "123",
        role: "admin",
        phone: "081915133813",
      });

    expect(response.status).toBe(400);
    expect(response.body.errors.password.min).toBe(
      "Password memiliki minimal 8 karakter!"
    );
  });

  it("should return error if role is required", async () => {
    const response = await supertest(web)
      .post("/staff/users")
      .set("SESSION-TOKEN", "token-staff")
      .send({
        username: "lutfiyapr",
        fullname: "Lutfiya Ainurrahman Prasetyo",
        email: "lutfiyapr.stu@pnc.ac.id",
        password: "password",
        role: "",
        phone: "081915133813",
      });

    expect(response.status).toBe(400);
    expect(response.body.errors.role.enum).toBe("Hak akses harus dipilih!");
  });

  it("should return error if phone is required", async () => {
    const response = await supertest(web)
      .post("/staff/users")
      .set("SESSION-TOKEN", "token-staff")
      .send({
        username: "lutfiyapr",
        fullname: "Lutfiya Ainurrahman Prasetyo",
        email: "lutfiyapr.stu@pnc.ac.id",
        password: "password",
        role: "admin",
        phone: "",
      });

    expect(response.status).toBe(400);
    expect(response.body.errors.phone.required).toBe("Nomor telp harus diisi!");
  });

  it("should return error if phone is too short", async () => {
    const response = await supertest(web)
      .post("/staff/users")
      .set("SESSION-TOKEN", "token-staff")
      .send({
        username: "lutfiyapr",
        fullname: "Lutfiya Ainurrahman Prasetyo",
        email: "lutfiyapr.stu@pnc.ac.id",
        password: "password",
        role: "admin",
        phone: "08123",
      });

    expect(response.status).toBe(400);
    expect(response.body.errors.phone.min).toBe(
      "Nomor telp memiliki minimal 11 angka!"
    );
  });

  it("should return error if not authorized", async () => {
    const response = await supertest(web)
      .post("/staff/users")
      .set("SESSION-TOKEN", "invalid_token")
      .send({
        username: "lutfiyapr",
        fullname: "Lutfiya Ainurrahman Prasetyo",
        email: "lutfiyapr.stu@pnc.ac.id",
        password: "password",
        role: "admin",
        phone: "081915133813",
      });

    logger.debug(response.body);

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
      .post("/staff/users")
      .set("SESSION-TOKEN", "token-client")
      .send({
        username: "lutfiyapr",
        fullname: "Lutfiya Ainurrahman Prasetyo",
        email: "lutfiyapr.stu@pnc.ac.id",
        password: "password",
        role: "admin",
        phone: "081915133813",
      });

    logger.debug(response.body);

    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});

// User spec API
describe("GET /staff/users", () => {
  beforeEach(async () => {
    await createData("users");
  });
  afterEach(async () => {
    await deleteData();
  });

  it("should return a list of users", async () => {
    const response = await supertest(web)
      .get("/staff/users")
      .set("SESSION-TOKEN", "token-staff");

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(4);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it("should return error if not authorized", async () => {
    const response = await supertest(web)
      .get("/staff/users")
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
      .get("/staff/users")
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
      .get(`/staff/users`)
      .set("SESSION-TOKEN", "token-client");

    logger.debug(response.body);
    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});

describe("GET /staff/users/:id", () => {
  beforeEach(async () => {
    await createData("users");
  });
  afterEach(async () => {
    await deleteData();
  });

  it("should get an existing user", async () => {
    const user = await UserTest.getUserId();
    const response = await supertest(web)
      .get(`/staff/users/${user?.id}`)
      .set("SESSION-TOKEN", "token-staff");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.username).toBe("lutfiyapr");
    expect(response.body.data.fullname).toBe("Lutfiya Ainurrahman Prasetyo");
    expect(response.body.data.email).toBe("lutfiyapr.stu@pnc.ac.id");
  });

  it("should return error if user not found", async () => {
    const response = await supertest(web)
      .get(`/staff/users/99999`)
      .set("SESSION-TOKEN", "token-staff");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBe("Data user tidak ditemukan!");
  });

  it("should return error if not authorized", async () => {
    const user = await UserTest.getUserId();
    const response = await supertest(web)
      .get(`/staff/users/${user?.id}`)
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
      .get(`/staff/users/${user?.id}`)
      .set("SESSION-TOKEN", "token-client");

    logger.debug(response.body);

    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});

describe("PATCH /staff/users/:id", () => {
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
      .patch(`/staff/users/${user?.id}`)
      .set("SESSION-TOKEN", "token-staff")
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
      .patch(`/staff/users/${user?.id}`)
      .set("SESSION-TOKEN", "token-staff")
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
      .patch(`/staff/users/99999`)
      .set("SESSION-TOKEN", "token-staff")
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
      .patch(`/staff/users/${user?.id}`)
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
      .patch(`/staff/users/${user?.id}`)
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

describe("DELETE /staff/users/:id", () => {
  beforeEach(async () => {
    await createData("users");
  });
  afterEach(async () => {
    await deleteData();
  });

  it("should delete an existing user", async () => {
    const user = await UserTest.getUserId();
    const response = await supertest(web)
      .delete(`/staff/users/${user?.id}`)
      .set("SESSION-TOKEN", "token-staff");

    logger.debug(response.body);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Data user berhasil dihapus!");
  });

  it("should return error if user not found", async () => {
    const response = await supertest(web)
      .delete(`/staff/users/99999`)
      .set("SESSION-TOKEN", "token-staff");

    logger.debug(response.body);

    expect(response.status).toBe(404);
    expect(response.body.errors).toBe("Data user tidak ditemukan!");
  });

  it("should return error if not authorized", async () => {
    const user = await UserTest.getUserId();
    const response = await supertest(web)
      .delete(`/staff/users/${user?.id}`)
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
      .delete(`/staff/users/${user?.id}`)
      .set("SESSION-TOKEN", "token-client");

    logger.debug(response.body);

    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});
