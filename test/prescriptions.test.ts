import supertest from "supertest";
import {
  AnimalTypesTest,
  MedicinesTest,
  PetsTest,
  PrescriptionsTest,
  UserTest,
} from "./test-util";
import { web } from "../src/backend/application/web";
import { logger } from "../src/backend/application/logging";
import { prismaClient } from "../src/backend/application/database";
import bcrypt from "bcrypt";

describe("POST /role/prescriptions", () => {
  beforeEach(async () => {
    await PrescriptionsTest.deletePrescriptions();
    await MedicinesTest.deleteMedicines();
    await PetsTest.deletePets();
    await AnimalTypesTest.deleteAnimalTypes();
    await UserTest.deleteUser();
    await UserTest.createUser();
    await PrescriptionsTest.createPrescriptions();
  });
  afterEach(async () => {
    await PrescriptionsTest.deletePrescriptions();
    await UserTest.deleteUser();
  });

  it("should create a new prescription", async () => {
    const response = await supertest(web)
      .post("/role/prescriptions")
      .set("SESSION-TOKEN", "token123")
      .send({
        medical_record_id: 1,
        veterinarian_id: 1,
        notes: "Kucing mengalami demam ringan dan kehilangan nafsu makan. Diberikan obat antipiretik",
      });
    logger.debug(response.body);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Data resep berhasil dibuat!");
    expect(response.body.data.medical_record_id).toBe(1);
    expect(response.body.data.veterinarian_id).toBe(1);
    expect(response.body.data.notes).toBe("Kucing mengalami demam ringan dan kehilangan nafsu makan. Diberikan obat antipiretik");
  });

  it("should return error if medical_record_id is required", async () => {
    const response = await supertest(web)
      .post("/role/prescriptions")
      .set("SESSION-TOKEN", "token123")
      .send({
        veterinarian_id: 1,
        notes: "Kucing mengalami demam ringan dan kehilangan nafsu makan. Diberikan obat antipiretik",
      });

    logger.debug(response.body);

    expect(response.status).toBe(400);
    expect(response.body.errors.medical_record_id.required).toBe("Rekam medis harus diisi!");
  });

  it("should return error if veterinarian_id is required", async () => {
    const response = await supertest(web)
      .post("/role/prescriptions")
      .set("SESSION-TOKEN", "token123")
      .send({
        medical_record_id: 1,
        notes: "Kucing mengalami demam ringan dan kehilangan nafsu makan. Diberikan obat antipiretik",
      });

    expect(response.status).toBe(400);
    expect(response.body.errors.veterinarian_id.required).toBe("Dokter hewan harus diisi!");
  });

  it("should return error if not authorized", async () => {
    const response = await supertest(web)
      .post("/role/prescriptions")
      .set("SESSION-TOKEN", "invalid_token")
      .send({
        medical_record_id: 1,
        veterinarian_id: 1,
        notes: "Kucing mengalami demam ringan dan kehilangan nafsu makan. Diberikan obat antipiretik",
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
    const response = await supertest(web)
      .post("/role/prescriptions")
      .set("SESSION-TOKEN", "token234")
      .send({
        medical_record_id: 1,
        veterinarian_id: 1,
        notes: "Kucing mengalami demam ringan dan kehilangan nafsu makan. Diberikan obat antipiretik",
      });

    logger.debug(response.body);

    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});

describe("GET /role/prescriptions", () => {
  beforeEach(async () => {
    await UserTest.createUser();
    await PrescriptionsTest.createPrescriptions();
  });
  afterEach(async () => {
    await PrescriptionsTest.deletePrescriptions();
    await UserTest.deleteUser();
  });

  it("should return a list of prescriptions", async () => {
    const response = await supertest(web)
      .get("/role/prescriptions")
      .set("SESSION-TOKEN", "token123");

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(3);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it("should return error if not authorized", async () => {
    const response = await supertest(web)
      .get("/role/prescriptions")
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
      .get("/role/prescriptions")
      .set("SESSION-TOKEN", "token234");

    logger.debug(response.body);

    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });

  it("should return error if prescriptions not found", async () => {
    await PrescriptionsTest.deletePrescriptions();
    const response = await supertest(web)
      .get("/role/prescriptions")
      .set("SESSION-TOKEN", "token123");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBe("Data resep tidak ditemukan!");
  });
});

describe("GET /role/prescriptions/:id", () => {
  beforeEach(async () => {
    await UserTest.createUser();
    await PrescriptionsTest.createPrescriptions();
  });
  afterEach(async () => {
    await PrescriptionsTest.deletePrescriptions();
    await UserTest.deleteUser();
  });

  it("should get an existing prescription", async () => {
    const prescription = await PrescriptionsTest.getPrescriptionId();
    const response = await supertest(web)
      .get(`/role/prescriptions/${prescription?.id}`)
      .set("SESSION-TOKEN", "token123");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.medical_record_id).toBe(1);
    expect(response.body.data.veterinarian_id).toBe(1);
    expect(response.body.data.notes).toBe("Kucing mengalami demam ringan dan kehilangan nafsu makan. Diberikan obat antipiretik");
  });

  it("should return error if prescription not found", async () => {
    const response = await supertest(web)
      .get(`/role/prescriptions/99999`)
      .set("SESSION-TOKEN", "token123");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBe("Data resep tidak ditemukan!");
  });

  it("should return error if not authorized", async () => {
    const prescription = await PrescriptionsTest.getPrescriptionId();
    const response = await supertest(web)
      .get(`/role/prescriptions/${prescription?.id}`)
      .set("SESSION-TOKEN", "invalid_token");

    expect(response.status).toBe(401);
    expect(response.body.errors).toBe("Unauthorized");
  });

  it("should return error if user doesn't have access", async () => {
    const prescription = await PrescriptionsTest.getPrescriptionId();
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
      .get(`/role/prescriptions/${prescription?.id}`)
      .set("SESSION-TOKEN", "token234");

    logger.debug(response.body);

    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});

describe("PATCH /role/prescriptions/:id", () => {
  beforeEach(async () => {
    await UserTest.createUser();
    await PrescriptionsTest.createPrescriptions();
  });
  afterEach(async () => {
    await PrescriptionsTest.deletePrescriptions();
    await UserTest.deleteUser();
  });

  it("should update an existing prescription", async () => {
    const prescription = await PrescriptionsTest.getPrescriptionId();
    const response = await supertest(web)
      .patch(`/role/prescriptions/${prescription?.id}`)
      .set("SESSION-TOKEN", "token123")
      .send({
        medical_record_id: 2,
        veterinarian_id: 2,
        notes: "Updated prescription notes for better treatment",
      });

    logger.debug(response.body);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Data resep berhasil diperbarui!");
    expect(response.body.data.medical_record_id).toBe(2);
    expect(response.body.data.veterinarian_id).toBe(2);
    expect(response.body.data.notes).toBe("Updated prescription notes for better treatment");
  });

  it("should return error if request is invalid", async () => {
    const prescription = await PrescriptionsTest.getPrescriptionId();
    const response = await supertest(web)
      .patch(`/role/prescriptions/${prescription?.id}`)
      .set("SESSION-TOKEN", "token123")
      .send({
        veterinarian_id: 1,
        notes: "Updated prescription notes",
      });

    logger.debug(response.body);

    expect(response.status).toBe(400);
    expect(response.body.errors.medical_record_id.required).toBe("Rekam medis harus diisi!");
  });

  it("should return error if prescription not found", async () => {
    const response = await supertest(web)
      .patch(`/role/prescriptions/99999`)
      .set("SESSION-TOKEN", "token123")
      .send({
        medical_record_id: 1,
        veterinarian_id: 1,
        notes: "Updated prescription notes",
      });

    logger.debug(response.body);

    expect(response.status).toBe(404);
    expect(response.body.errors).toBe("Data resep tidak ditemukan!");
  });

  it("should return error if not authorized", async () => {
    const prescription = await PrescriptionsTest.getPrescriptionId();
    const response = await supertest(web)
      .patch(`/role/prescriptions/${prescription?.id}`)
      .set("SESSION-TOKEN", "invalid_token")
      .send({
        medical_record_id: 1,
        veterinarian_id: 1,
        notes: "Updated prescription notes",
      });

    expect(response.status).toBe(401);
    expect(response.body.errors).toBe("Unauthorized");
  });

  it("should return error if user doesn't have access", async () => {
    const prescription = await PrescriptionsTest.getPrescriptionId();
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
      .patch(`/role/prescriptions/${prescription?.id}`)
      .set("SESSION-TOKEN", "token234")
      .send({
        medical_record_id: 1,
        veterinarian_id: 1,
        notes: "Updated prescription notes",
      });

    logger.debug(response.body);

    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});

describe("DELETE /role/prescriptions/:id", () => {
  beforeEach(async () => {
    await UserTest.createUser();
    await PrescriptionsTest.createPrescriptions();
  });
  afterEach(async () => {
    await PrescriptionsTest.deletePrescriptions();
    await UserTest.deleteUser();
  });

  it("should delete an existing prescription", async () => {
    const prescription = await PrescriptionsTest.getPrescriptionId();
    const response = await supertest(web)
      .delete(`/role/prescriptions/${prescription?.id}`)
      .set("SESSION-TOKEN", "token123");

    logger.debug(response.body);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Data resep berhasil dihapus!");
  });

  it("should return error if prescription not found", async () => {
    const response = await supertest(web)
      .delete(`/role/prescriptions/99999`)
      .set("SESSION-TOKEN", "token123");

    logger.debug(response.body);

    expect(response.status).toBe(404);
    expect(response.body.errors).toBe("Data resep tidak ditemukan!");
  });

  it("should return error if not authorized", async () => {
    const prescription = await PrescriptionsTest.getPrescriptionId();
    const response = await supertest(web)
      .delete(`/role/prescriptions/${prescription?.id}`)
      .set("SESSION-TOKEN", "invalid_token");

    expect(response.status).toBe(401);
    expect(response.body.errors).toBe("Unauthorized");
  });

  it("should return error if user doesn't have access", async () => {
    const prescription = await PrescriptionsTest.getPrescriptionId();
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
      .delete(`/role/prescriptions/${prescription?.id}`)
      .set("SESSION-TOKEN", "token234");

    logger.debug(response.body);

    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});