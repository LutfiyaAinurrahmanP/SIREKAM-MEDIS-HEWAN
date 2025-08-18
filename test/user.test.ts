import supertest from "supertest";
import { UserTest } from "./test-util";
import { web } from "../src/backend/application/web";
import { logger } from "../src/backend/application/logging";
import e from "express";

describe("POST /register", () => {
  beforeEach(async () => {
    await UserTest.deleteUser();
    // await UserTest.createUser();
  });

  it("should create a new user", async () => {
    const response = await supertest(web).post("/register").send({
      username: "lutfiyapr",
      fullname: "Lutfiya Ainurrahman Prasetyo",
      email: "lutfiyapr.stu@pnc.ac.id",
      password: "password",
      role: "admin",
      phone: "081915133813",
    });

    logger.debug(response.body);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User berhasil dibuat!");
    expect(response.body.data.username).toBe("lutfiyapr");
    expect(response.body.data.fullname).toBe("Lutfiya Ainurrahman Prasetyo");
    expect(response.body.data.email).toBe("lutfiyapr.stu@pnc.ac.id");
    expect(response.body.data.role).toBe("admin");
    expect(response.body.data.phone).toBe("081915133813");
  });

  it("should return error if username already exists", async () => {
    await supertest(web).post("/register").send({
      username: "lutfiyapr",
      fullname: "Lutfiya Ainurrahman Prasetyo",
      email: "dummy@example.com",
      password: "password",
      role: "admin",
      phone: "081915133813",
    });

    const response = await supertest(web).post("/register").send({
      username: "lutfiyapr",
      fullname: "Lutfiya Ainurrahman Prasetyo",
      email: "lutfiyapr.stu@pnc.ac.id",
      password: "password",
      role: "admin",
      phone: "081915133813",
    });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.username).toBeDefined();
    expect(response.body.errors.username.unique).toBe(
      "Username sudah dipakai!"
    );
  });

  it("should return error if email already exists", async () => {
    await supertest(web).post("/register").send({
      username: "dummy data",
      fullname: "Lutfiya Ainurrahman Prasetyo",
      email: "lutfiyapr.stu@pnc.ac.id",
      password: "password",
      role: "admin",
      phone: "081915133813",
    });

    const response = await supertest(web).post("/register").send({
      username: "lutfiyapr",
      fullname: "Lutfiya Ainurrahman Prasetyo",
      email: "lutfiyapr.stu@pnc.ac.id",
      password: "password",
      role: "admin",
      phone: "081915133813",
    });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.email).toBeDefined();
    expect(response.body.errors.email.unique).toBe("Email sudah dipakai!");
  });

  it("should return error for invalid request data", async () => {
    const response = await supertest(web).post("/register").send({
      username: "",
      fullname: "",
      email: "",
      password: "",
      role: "",
      phone: "",
    });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.username.required).toBe(
      "Username harus diisi!"
    );
    expect(response.body.errors.username.min).toBe(
      "Username memiliki minimal 5 karakter!"
    );
    expect(response.body.errors.fullname.min).toBe(
      "Nama lengkap memiliki minimal 5 karakter!"
    );
    expect(response.body.errors.email.min).toBe(
      "Email memiliki minimal 5 karakter!"
    );
    expect(response.body.errors.password.min).toBe(
      "Password memiliki minimal 8 karakter!"
    );
    expect(response.body.errors.role.enum).toBe("Hak akses harus dipilih!");
    expect(response.body.errors.phone.min).toBe(
      "Nomor telepon memiliki minimal 11 angka!"
    );
  });
});

describe("POST /login", () => {
  beforeEach(async () => {
    await UserTest.deleteUser();
    await UserTest.createUser();
  });

  it("should login an existing user", async () => {
    const response = await supertest(web).post("/login").send({
      username: "lutfiyapr",
      password: "password",
    });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.username).toBe("lutfiyapr");
    expect(response.body.data.fullname).toBe("Lutfiya Ainurrahman Prasetyo");
    expect(response.body.data.email).toBe("lutfiyapr.stu@pnc.ac.id");
    expect(response.body.data.role).toBe("admin");
    expect(response.body.data.phone).toBe("081915133813");
  });

  it("should return error if username invalid", async () => {
    const response = await supertest(web).post("/login").send({
      username: "salah",
      password: "password",
    });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBe("Username atau password salah!");
  });

  it("should return error if password invalid", async () => {
    const response = await supertest(web).post("/login").send({
      username: "lutfiyapr",
      password: "salah",
    });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBe("Username atau password salah!");
  });
});
