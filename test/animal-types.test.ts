import supertest from "supertest";
import { AnimalTypesTest, UserTest } from "./test-util";
import { web } from "../src/backend/application/web";
import { logger } from "../src/backend/application/logging";
import { prismaClient } from "../src/backend/application/database";
import bcrypt from "bcrypt";

describe("POST /admin/animal-types", () => {
  beforeEach(async () => {
    await UserTest.deleteUser();
    await UserTest.createUser();
    await AnimalTypesTest.deleteAnimalTypes();
  });

  it("should create a new animal type", async () => {
    const response = await supertest(web)
      .post("/admin/animal-types")
      .set("SESSION-TOKEN", "token123")
      .send({
        name: "Kucing",
        description: "Mamalia kecil dengan bulu halus",
      });
    expect(response.status).toBe(201);
    expect(response.body.data.name).toBe("Kucing");
    expect(response.body.data.description).toBe(
      "Mamalia kecil dengan bulu halus"
    );
  });

  it("should return error if animal type name already exists", async () => {
    await supertest(web)
      .post("/admin/animal-types")
      .set("SESSION-TOKEN", "token123")
      .send({
        name: "Kucing",
        description: "Mamalia kecil dengan bulu halus",
      });
    const response = await supertest(web)
      .post("/admin/animal-types")
      .set("SESSION-TOKEN", "token123")
      .send({
        name: "Kucing",
        description: "Mamalia kecil dengan bulu halus",
      });
    expect(response.status).toBe(400);
    expect(response.body.errors.name.unique).toBe(
      "Nama jenis hewan sudah dipakai!"
    );
  });

  it("should return error if error request", async () => {
    const response = await supertest(web)
      .post("/admin/animal-types")
      .set("SESSION-TOKEN", "token123")
      .send({
        name: "",
      });

    logger.debug(response.body);

    expect(response.status).toBe(400);
    expect(response.body.errors.name.required).toBe(
      "Data jenis hewan harus diisi!"
    );
  });

  it("should return error if not authorized", async () => {
    const response = await supertest(web)
      .post("/admin/animal-types")
      .set("SESSION-TOKEN", "invalid_token")
      .send({
        name: "Kucing",
        description: "Mamalia kecil dengan bulu halus",
      });

    logger.debug(response.body);

    expect(response.status).toBe(401);
    expect(response.body.errors).toBe("Unauthorized");
  });

  it("should return error if role not admin", async () => {
    await prismaClient.user.create({
      data: {
        username: "dummy data",
        fullname: "Lutfiya Ainurrahman Prasetyo",
        email: "lutfiyapr2.stu@pnc.ac.id",
        password: await bcrypt.hash("password", 10),
        role: "client",
        phone: "081915133813",
        token: "token234",
      },
    });
    const response = await supertest(web)
      .post("/admin/animal-types")
      .set("SESSION-TOKEN", "token234")
      .send({
        name: "Kucing",
        description: "Mamalia kecil dengan bulu halus",
      });

    logger.debug(response.body);

    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});

describe("GET /admin/animal-types", () => {
  beforeEach(async () => {
    await UserTest.deleteUser();
    await UserTest.createUser();
    await AnimalTypesTest.deleteAnimalTypes();
    await AnimalTypesTest.createAnimalTypes();
  });
  it("should return a list of animal types", async () => {
    const response = await supertest(web)
      .get("/admin/animal-types")
      .set("SESSION-TOKEN", "token123");

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(3);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it("should return error if not authorized", async () => {
    const response = await supertest(web)
      .get("/admin/animal-types")
      .set("SESSION-TOKEN", "invalid_token");

    expect(response.status).toBe(401);
    expect(response.body.errors).toBe("Unauthorized");
  });

  it("should return error if role not admin", async () => {
    await prismaClient.user.create({
      data: {
        username: "dummy data",
        fullname: "Lutfiya Ainurrahman Prasetyo",
        email: "lutfiyapr2.stu@pnc.ac.id",
        password: await bcrypt.hash("password", 10),
        role: "client",
        phone: "081915133813",
        token: "token234",
      },
    });
    const response = await supertest(web)
      .get("/admin/animal-types")
      .set("SESSION-TOKEN", "token234")
      .send({
        name: "Kucing",
        description: "Mamalia kecil dengan bulu halus",
      });

    logger.debug(response.body);

    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});

describe("GET /admin/animal-types/:id", () => {
  beforeEach(async () => {
    await UserTest.deleteUser();
    await UserTest.createUser();
    await AnimalTypesTest.deleteAnimalTypes();
    await AnimalTypesTest.createAnimalTypes();
  });

  it("should get an existing animal type", async () => {
    const animalType = await AnimalTypesTest.getAnimalTypesId();
    const response = await supertest(web)
      .get(`/admin/animal-types/${animalType?.id}`)
      .set("SESSION-TOKEN", "token123");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe("Kucing");
    expect(response.body.data.description).toBe(
      "Mamalia kecil dengan bulu halus"
    );
  });

  it("should return error if animal type not found", async () => {
    const response = await supertest(web)
      .get(`/admin/animal-types/99999`)
      .set("SESSION-TOKEN", "token123");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBe("Jenis hewan tidak ditemukan!");
  });

  it("should return error if not authorized", async () => {
    const animalType = await AnimalTypesTest.getAnimalTypesId();
    const response = await supertest(web)
      .get(`/admin/animal-types/${animalType?.id}`)
      .set("SESSION-TOKEN", "invalid_token");

    expect(response.status).toBe(401);
    expect(response.body.errors).toBe("Unauthorized");
  });

  it("should return error if role not admin", async () => {
    const animalType = await AnimalTypesTest.getAnimalTypesId();
    await prismaClient.user.create({
      data: {
        username: "dummy data",
        fullname: "Lutfiya Ainurrahman Prasetyo",
        email: "lutfiyapr2.stu@pnc.ac.id",
        password: await bcrypt.hash("password", 10),
        role: "client",
        phone: "081915133813",
        token: "token234",
      },
    });
    const response = await supertest(web)
      .get(`/admin/animal-types/${animalType?.id}`)
      .set("SESSION-TOKEN", "token234")
      .send({
        name: "Kucing",
        description: "Mamalia kecil dengan bulu halus",
      });

    logger.debug(response.body);

    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});
