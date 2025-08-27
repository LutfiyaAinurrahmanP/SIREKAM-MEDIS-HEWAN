import supertest from "supertest";
import {
  AnimalTypesTest,
  MedicinesTest,
  PetsTest,
  UserTest,
} from "./test-util";
import { web } from "../src/backend/application/web";
import { logger } from "../src/backend/application/logging";
import { prismaClient } from "../src/backend/application/database";
import bcrypt from "bcrypt";

describe("POST /staff/pets", () => {
  beforeEach(async () => {
    await PetsTest.deletePets();
    await AnimalTypesTest.deleteAnimalTypes();
    await UserTest.deleteUser();
    await UserTest.createUser();
    await AnimalTypesTest.createAnimalTypes();
  });

  afterEach(async () => {
    await PetsTest.deletePets();
    await AnimalTypesTest.deleteAnimalTypes();
    await UserTest.deleteUser();
  });

  it("should create a new pet", async () => {
    const animalType = await AnimalTypesTest.getAnimalTypesId();
    const user = await UserTest.getUserStaffId();

    const response = await supertest(web)
      .post("/staff/pets")
      .set("SESSION-TOKEN", "token222")
      .send({
        owner_id: user?.id,
        name: "Luna",
        animal_type_id: animalType?.id,
        breed: "Persian",
        gender: "female",
        birth_date: "2022-05-14",
        weight: 3.4,
        color: "Putih",
        notes: "Kucing sangat aktif, suka bermain bola mainan",
      });

    logger.debug(response.body);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe(
      "Data hewan peliharaan berhasil dibuat!"
    );
    expect(response.body.data.name).toBe("Luna");
    expect(response.body.data.breed).toBe("Persian");
    expect(response.body.data.gender).toBe("female");
    expect(response.body.data.weight).toBe(3.4);
    expect(response.body.data.color).toBe("Putih");
    expect(response.body.data.notes).toBe(
      "Kucing sangat aktif, suka bermain bola mainan"
    );
  });

  it("should return error if owner_id is required", async () => {
    const animalType = await AnimalTypesTest.getAnimalTypesId();

    const response = await supertest(web)
      .post("/staff/pets")
      .set("SESSION-TOKEN", "token222")
      .send({
        name: "Luna",
        animal_type_id: animalType?.id,
        breed: "Persian",
        gender: "female",
        birth_date: "2022-05-14",
        weight: 3.4,
        color: "Putih",
        notes: "Kucing sangat aktif",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors.owner_id.number).toBe(
      "Pemilik hewan peliharaan harus diisi!"
    );
  });

  it("should return error if name is required", async () => {
    const animalType = await AnimalTypesTest.getAnimalTypesId();
    const user = await UserTest.getUserStaffId();

    const response = await supertest(web)
      .post("/staff/pets")
      .set("SESSION-TOKEN", "token222")
      .send({
        owner_id: user?.id,
        name: "",
        animal_type_id: animalType?.id,
        breed: "Persian",
        gender: "female",
        birth_date: "2022-05-14",
        weight: 3.4,
        color: "Putih",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors.name.required).toBe(
      "Nama hewan peliharaan harus diisi!"
    );
  });

  it("should return error if name is too long", async () => {
    const animalType = await AnimalTypesTest.getAnimalTypesId();
    const user = await UserTest.getUserStaffId();
    const longName = "A".repeat(65); // 65 characters, exceeds 64 limit

    const response = await supertest(web)
      .post("/staff/pets")
      .set("SESSION-TOKEN", "token222")
      .send({
        owner_id: user?.id,
        name: longName,
        animal_type_id: animalType?.id,
        breed: "Persian",
        gender: "female",
        birth_date: "2022-05-14",
        weight: 3.4,
        color: "Putih",
      });

    expect(response.status).toBe(400);
    expect(response.body.errors.name.max).toBe(
      "Nama hewan peliharaan memiliki maksimal 64 karakter!"
    );
  });

  it("should return error if animal_type_id is required", async () => {
    const user = await UserTest.getUserStaffId();

    const response = await supertest(web)
      .post("/staff/pets")
      .set("SESSION-TOKEN", "token222")
      .send({
        owner_id: user?.id,
        name: "Luna",
        breed: "Persian",
        gender: "female",
        birth_date: "2022-05-14",
        weight: 3.4,
        color: "Putih",
      });

    expect(response.status).toBe(400);
    expect(response.body.errors.animal_type_id.number).toBe(
      "Jenis hewan peliharaan harus diisi!"
    );
  });

  it("should return error if gender is required", async () => {
    const animalType = await AnimalTypesTest.getAnimalTypesId();
    const user = await UserTest.getUserStaffId();

    const response = await supertest(web)
      .post("/staff/pets")
      .set("SESSION-TOKEN", "token222")
      .send({
        owner_id: user?.id,
        name: "Luna",
        animal_type_id: animalType?.id,
        breed: "Persian",
        birth_date: "2022-05-14",
        weight: 3.4,
        color: "Putih",
      });

    expect(response.status).toBe(400);
    expect(response.body.errors.gender.enum).toBe(
      "Jenis kelamin hewan peliharaan harus dipilih!"
    );
  });

  it("should return error if weight is required", async () => {
    const animalType = await AnimalTypesTest.getAnimalTypesId();
    const user = await UserTest.getUserStaffId();

    const response = await supertest(web)
      .post("/staff/pets")
      .set("SESSION-TOKEN", "token222")
      .send({
        owner_id: user?.id,
        name: "Luna",
        animal_type_id: animalType?.id,
        breed: "Persian",
        gender: "female",
        birth_date: "2022-05-14",
        color: "Putih",
      });

    expect(response.status).toBe(400);
    expect(response.body.errors.weight.number).toBe(
      "Berat hewan peliharaan harus berupa angka!"
    );
  });

  it("should return error if weight is not numeric", async () => {
    const animalType = await AnimalTypesTest.getAnimalTypesId();
    const user = await UserTest.getUserStaffId();

    const response = await supertest(web)
      .post("/staff/pets")
      .set("SESSION-TOKEN", "token222")
      .send({
        owner_id: user?.id,
        name: "Luna",
        animal_type_id: animalType?.id,
        breed: "Persian",
        gender: "female",
        birth_date: "2022-05-14",
        weight: "invalid",
        color: "Putih",
      });

    expect(response.status).toBe(400);
    expect(response.body.errors.weight.number).toBe(
      "Berat hewan peliharaan harus berupa angka!"
    );
  });

  it("should return error if session is invalid", async () => {
    const animalType = await AnimalTypesTest.getAnimalTypesId();
    const user = await UserTest.getUserStaffId();

    const response = await supertest(web)
      .post("/staff/pets")
      .set("SESSION-TOKEN", "invalid_token")
      .send({
        owner_id: user?.id,
        name: "Luna",
        animal_type_id: animalType?.id,
        breed: "Persian",
        gender: "female",
        birth_date: "2022-05-14",
        weight: 3.4,
        color: "Putih",
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
        token: "token234",
      },
    });

    const animalType = await AnimalTypesTest.getAnimalTypesId();
    const user = await UserTest.getUserStaffId();

    const response = await supertest(web)
      .post("/staff/pets")
      .set("SESSION-TOKEN", "token234")
      .send({
        owner_id: user?.id,
        name: "Luna",
        animal_type_id: animalType?.id,
        breed: "Persian",
        gender: "female",
        birth_date: "2022-05-14",
        weight: 3.4,
        color: "Putih",
      });

    logger.debug(response.body);
    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});

describe("GET /staff/pets", () => {
  beforeEach(async () => {
    await UserTest.createUser();
    await AnimalTypesTest.createAnimalTypes();
    await PetsTest.createPets();
  });

  afterEach(async () => {
    await PetsTest.deletePets();
    await AnimalTypesTest.deleteAnimalTypes();
    await UserTest.deleteUser();
  });

  it("should return a list of pets", async () => {
    const response = await supertest(web)
      .get("/staff/pets")
      .set("SESSION-TOKEN", "token222");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(2);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it("should return error if session is invalid", async () => {
    const response = await supertest(web)
      .get("/staff/pets")
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
        token: "token234",
      },
    });

    const response = await supertest(web)
      .get("/staff/pets")
      .set("SESSION-TOKEN", "token234");

    logger.debug(response.body);
    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});

describe("GET /staff/pets/:id", () => {
  beforeEach(async () => {
    await UserTest.createUser();
    await AnimalTypesTest.createAnimalTypes();
    await PetsTest.createPets();
  });

  afterEach(async () => {
    await PetsTest.deletePets();
    await AnimalTypesTest.deleteAnimalTypes();
    await UserTest.deleteUser();
  });

  it("should get an existing pet", async () => {
    const pet = await PetsTest.getPetsId();
    const response = await supertest(web)
      .get(`/staff/pets/${pet?.id}`)
      .set("SESSION-TOKEN", "token222");

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
      .get(`/staff/pets/99999`)
      .set("SESSION-TOKEN", "token222");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBe("Data hewan peliharaan tidak ditemukan!");
  });

  it("should return error if session is invalid", async () => {
    const pet = await PetsTest.getPetsId();
    const response = await supertest(web)
      .get(`/staff/pets/${pet?.id}`)
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
        token: "token234",
      },
    });

    const response = await supertest(web)
      .get(`/staff/pets/${pet?.id}`)
      .set("SESSION-TOKEN", "token234");

    logger.debug(response.body);
    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});

describe("PATCH /staff/pets/:id", () => {
  beforeEach(async () => {
    await UserTest.createUser();
    await AnimalTypesTest.createAnimalTypes();
    await PetsTest.createPets();
  });

  afterEach(async () => {
    await PetsTest.deletePets();
    await AnimalTypesTest.deleteAnimalTypes();
    await UserTest.deleteUser();
  });

  it("should update an existing pet", async () => {
    const pet = await PetsTest.getPetsId();
    const animalType = await AnimalTypesTest.getAnimalTypesId();
    const user = await UserTest.getUserStaffId();

    const response = await supertest(web)
      .patch(`/staff/pets/${pet?.id}`)
      .set("SESSION-TOKEN", "token222")
      .send({
        owner_id: user?.id,
        name: "Max Updated",
        animal_type_id: animalType?.id,
        breed: "Golden Retriever",
        gender: "male",
        birth_date: new Date("2021-09-08"),
        weight: 28.5,
        color: "Emas",
        notes: "Anjing ramah, rutin vaksinasi lengkap",
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      "Data hewan peliharaan berhasil diperbarui!"
    );
    expect(response.body.data.name).toBe("Max Updated");
    expect(response.body.data.breed).toBe("Golden Retriever");
    expect(response.body.data.gender).toBe("male");
    expect(response.body.data.weight).toBe(28.5);
    expect(response.body.data.color).toBe("Emas");
  });

  it("should return error if request is invalid", async () => {
    const pet = await PetsTest.getPetsId();
    const animalType = await AnimalTypesTest.getAnimalTypesId();
    const user = await UserTest.getUserStaffId();

    const response = await supertest(web)
      .patch(`/staff/pets/${pet?.id}`)
      .set("SESSION-TOKEN", "token222")
      .send({
        owner_id: user?.id,
        name: "", // Invalid empty name
        animal_type_id: animalType?.id,
        breed: "Persian",
        gender: "female",
        birth_date: "2022-05-14",
        weight: 3.4,
        color: "Putih",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors.name.required).toBe(
      "Nama hewan peliharaan harus diisi!"
    );
  });

  it("should return error if pet not found", async () => {
    const animalType = await AnimalTypesTest.getAnimalTypesId();
    const user = await UserTest.getUserStaffId();

    const response = await supertest(web)
      .patch(`/staff/pets/99999`)
      .set("SESSION-TOKEN", "token222")
      .send({
        owner_id: user?.id,
        name: "Luna Updated",
        animal_type_id: animalType?.id,
        breed: "Persian",
        gender: "female",
        birth_date: "2022-05-14",
        weight: 3.4,
        color: "Putih",
      });

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBe("Data hewan peliharaan tidak ditemukan!");
  });

  it("should return error if session is invalid", async () => {
    const pet = await PetsTest.getPetsId();
    const animalType = await AnimalTypesTest.getAnimalTypesId();
    const user = await UserTest.getUserStaffId();

    const response = await supertest(web)
      .patch(`/staff/pets/${pet?.id}`)
      .set("SESSION-TOKEN", "invalid_token")
      .send({
        owner_id: user?.id,
        name: "Luna Updated",
        animal_type_id: animalType?.id,
        breed: "Persian",
        gender: "female",
        birth_date: "2022-05-14",
        weight: 3.4,
        color: "Putih",
      });

    expect(response.status).toBe(401);
    expect(response.body.errors).toBe("Unauthorized");
  });

  it("should return error if user doesn't have access", async () => {
    const pet = await PetsTest.getPetsId();
    const animalType = await AnimalTypesTest.getAnimalTypesId();
    const user = await UserTest.getUserStaffId();

    await prismaClient.user.create({
      data: {
        username: "dummy data2",
        fullname: "Lutfiya Ainurrahman Prasetyo",
        email: "lutfiyapr2.stu@pnc.ac.id",
        password: await bcrypt.hash("password", 10),
        role: "client",
        phone: "081915133813",
        token: "token234",
      },
    });

    const response = await supertest(web)
      .patch(`/staff/pets/${pet?.id}`)
      .set("SESSION-TOKEN", "token234")
      .send({
        owner_id: user?.id,
        name: "Luna Updated",
        animal_type_id: animalType?.id,
        breed: "Persian",
        gender: "female",
        birth_date: "2022-05-14",
        weight: 3.4,
        color: "Putih",
      });

    logger.debug(response.body);
    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});

describe("DELETE /staff/pets/:id", () => {
  beforeEach(async () => {
    await UserTest.createUser();
    await AnimalTypesTest.createAnimalTypes();
    await PetsTest.createPets();
  });

  afterEach(async () => {
    await PetsTest.deletePets();
    await AnimalTypesTest.deleteAnimalTypes();
    await UserTest.deleteUser();
  });

  it("should delete an existing pet", async () => {
    const pet = await PetsTest.getPetsId();
    const response = await supertest(web)
      .delete(`/staff/pets/${pet?.id}`)
      .set("SESSION-TOKEN", "token222");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      "Data hewan peliharaan berhasil dihapus!"
    );
  });

  it("should return error if pet not found", async () => {
    const response = await supertest(web)
      .delete(`/staff/pets/99999`)
      .set("SESSION-TOKEN", "token222");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBe("Data hewan peliharaan tidak ditemukan!");
  });

  it("should return error if session is invalid", async () => {
    const pet = await PetsTest.getPetsId();
    const response = await supertest(web)
      .delete(`/staff/pets/${pet?.id}`)
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
        token: "token234",
      },
    });

    const response = await supertest(web)
      .delete(`/staff/pets/${pet?.id}`)
      .set("SESSION-TOKEN", "token234");

    logger.debug(response.body);
    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});
