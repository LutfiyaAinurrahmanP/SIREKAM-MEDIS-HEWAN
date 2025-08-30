import supertest from "supertest";
import {
  UserTest,
  MedicalRecordsTest,
  PrescriptionsTest,
  PetsTest,
  AppointmentsTest,
  ServiceCategoriesTest,
  AnimalTypesTest,
} from "./test-util";
import { web } from "../src/backend/application/web";
import { logger } from "../src/backend/application/logging";
import { prismaClient } from "../src/backend/application/database";
import bcrypt from "bcrypt";

describe("POST /staff/prescriptions", () => {
  beforeEach(async () => {
    await PrescriptionsTest.deletePrescriptions();
    await MedicalRecordsTest.deleteMedicalRecords();
    await AppointmentsTest.deleteAppointments();
    await ServiceCategoriesTest.deleteServiceCategories();
    await PetsTest.deletePets();
    await AnimalTypesTest.deleteAnimalTypes();
    await UserTest.deleteUser();
    await UserTest.createUser();
    await AnimalTypesTest.createAnimalTypes();
    await PetsTest.createPets();
    await ServiceCategoriesTest.createServiceCategories();
    await AppointmentsTest.createAppointments();
    await MedicalRecordsTest.createMedicalRecords();
  });

  afterEach(async () => {
    await PrescriptionsTest.deletePrescriptions();
    await MedicalRecordsTest.deleteMedicalRecords();
    await AppointmentsTest.deleteAppointments();
    await ServiceCategoriesTest.deleteServiceCategories();
    await PetsTest.deletePets();
    await AnimalTypesTest.deleteAnimalTypes();
    await UserTest.deleteUser();
  });

  it("should create a new prescription", async () => {
    const medicalRecord = await MedicalRecordsTest.getMedicalRecordsId();
    const veterinarian = await UserTest.getUserVeterinarianId();

    const response = await supertest(web)
      .post("/staff/prescriptions")
      .set("SESSION-TOKEN", "token-staff")
      .send({
        medical_record_id: medicalRecord?.id,
        veterinarian_id: veterinarian?.id,
        notes:
          "Kucing mengalami demam ringan dan kehilangan nafsu makan. Diberikan obat antipiretik",
      });

    logger.debug(response.body);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Data resep berhasil dibuat!");
    expect(response.body.data.medical_record_id).toBe(medicalRecord?.id);
    expect(response.body.data.veterinarian_id).toBe(veterinarian?.id);
    expect(response.body.data.notes).toBe(
      "Kucing mengalami demam ringan dan kehilangan nafsu makan. Diberikan obat antipiretik"
    );
  });

  it("should return error if medical_record_id is required", async () => {
    const veterinarian = await UserTest.getUserVeterinarianId();

    const response = await supertest(web)
      .post("/staff/prescriptions")
      .set("SESSION-TOKEN", "token-staff")
      .send({
        veterinarian_id: veterinarian?.id,
        notes:
          "Kucing mengalami demam ringan dan kehilangan nafsu makan. Diberikan obat antipiretik",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors.medical_record_id.number).toBe(
      "Rekam medis harus diisi!"
    );
  });

  it("should return error if veterinarian_id is required", async () => {
    const medicalRecord = await MedicalRecordsTest.getMedicalRecordsId();

    const response = await supertest(web)
      .post("/staff/prescriptions")
      .set("SESSION-TOKEN", "token-staff")
      .send({
        medical_record_id: medicalRecord?.id,
        notes:
          "Kucing mengalami demam ringan dan kehilangan nafsu makan. Diberikan obat antipiretik",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors.veterinarian_id.number).toBe(
      "Dokter hewan harus diisi!"
    );
  });

  it("should return error if session is invalid", async () => {
    const medicalRecord = await MedicalRecordsTest.getMedicalRecordsId();
    const veterinarian = await UserTest.getUserVeterinarianId();

    const response = await supertest(web)
      .post("/staff/prescriptions")
      .set("SESSION-TOKEN", "invalid_token")
      .send({
        medical_record_id: medicalRecord?.id,
        veterinarian_id: veterinarian?.id,
        notes:
          "Kucing mengalami demam ringan dan kehilangan nafsu makan. Diberikan obat antipiretik",
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

    const medicalRecord = await MedicalRecordsTest.getMedicalRecordsId();
    const veterinarian = await UserTest.getUserVeterinarianId();

    const response = await supertest(web)
      .post("/staff/prescriptions")
      .set("SESSION-TOKEN", "token234")
      .send({
        medical_record_id: medicalRecord?.id,
        veterinarian_id: veterinarian?.id,
        notes:
          "Kucing mengalami demam ringan dan kehilangan nafsu makan. Diberikan obat antipiretik",
      });

    logger.debug(response.body);
    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});

describe("GET /staff/prescriptions", () => {
  beforeEach(async () => {
    await UserTest.createUser();
    await UserTest.createUser();
    await MedicalRecordsTest.createMedicalRecords();
    await PrescriptionsTest.createPrescriptions();
  });

  afterEach(async () => {
    await PrescriptionsTest.deletePrescriptions();
    await MedicalRecordsTest.deleteMedicalRecords();
    await UserTest.deleteUser();
  });

  it("should return a list of prescriptions", async () => {
    const response = await supertest(web)
      .get("/staff/prescriptions")
      .set("SESSION-TOKEN", "token-staff");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBeGreaterThanOrEqual(2);
    expect(response.body.meta).toBeDefined();
    expect(response.body.meta.total).toBeGreaterThanOrEqual(2);
  });

  it("should return error if session is invalid", async () => {
    const response = await supertest(web)
      .get("/staff/prescriptions")
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
      .get("/staff/prescriptions")
      .set("SESSION-TOKEN", "token234");

    logger.debug(response.body);
    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});

describe("GET /staff/prescriptions/:id", () => {
  beforeEach(async () => {
    await UserTest.createUser();
    await UserTest.createUser();
    await MedicalRecordsTest.createMedicalRecords();
    await PrescriptionsTest.createPrescriptions();
  });

  afterEach(async () => {
    await PrescriptionsTest.deletePrescriptions();
    await MedicalRecordsTest.deleteMedicalRecords();
    await UserTest.deleteUser();
  });

  it("should get an existing prescription", async () => {
    const prescription = await PrescriptionsTest.getPrescriptionsId();
    const response = await supertest(web)
      .get(`/staff/prescriptions/${prescription?.id}`)
      .set("SESSION-TOKEN", "token-staff");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(prescription?.id);
    expect(response.body.data.medical_record_id).toBeDefined();
    expect(response.body.data.veterinarian_id).toBeDefined();
    expect(response.body.data.notes).toBeDefined();
  });

  it("should return error if prescription not found", async () => {
    const response = await supertest(web)
      .get(`/staff/prescriptions/99999`)
      .set("SESSION-TOKEN", "token-staff");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBe("Data resep tidak ditemukan!");
  });

  it("should return error if session is invalid", async () => {
    const prescription = await PrescriptionsTest.getPrescriptionsId();
    const response = await supertest(web)
      .get(`/staff/prescriptions/${prescription?.id}`)
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
        token: "token234",
      },
    });

    const response = await supertest(web)
      .get(`/staff/prescriptions/${prescription?.id}`)
      .set("SESSION-TOKEN", "token234");

    logger.debug(response.body);
    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});

describe("PATCH /staff/prescriptions/:id", () => {
  beforeEach(async () => {
    await UserTest.createUser();
    await UserTest.createUser();
    await MedicalRecordsTest.createMedicalRecords();
    await PrescriptionsTest.createPrescriptions();
  });

  afterEach(async () => {
    await PrescriptionsTest.deletePrescriptions();
    await MedicalRecordsTest.deleteMedicalRecords();
    await UserTest.deleteUser();
  });

  it("should update an existing prescription", async () => {
    const prescription = await PrescriptionsTest.getPrescriptionsId();
    const medicalRecord = await MedicalRecordsTest.getMedicalRecordsId();
    const veterinarian = await UserTest.getUserVeterinarianId();

    const response = await supertest(web)
      .patch(`/staff/prescriptions/${prescription?.id}`)
      .set("SESSION-TOKEN", "token-staff")
      .send({
        medical_record_id: medicalRecord?.id,
        veterinarian_id: veterinarian?.id,
        notes:
          "Kucing mengalami demam ringan dan kehilangan nafsu makan. Diberikan obat antipiretik",
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Data resep berhasil diperbarui!");
    expect(response.body.data.medical_record_id).toBe(medicalRecord?.id);
    expect(response.body.data.veterinarian_id).toBe(veterinarian?.id);
    expect(response.body.data.notes).toBe(
      "Kucing mengalami demam ringan dan kehilangan nafsu makan. Diberikan obat antipiretik"
    );
  });

  it("should return error if request is invalid", async () => {
    const prescription = await PrescriptionsTest.getPrescriptionsId();
    const veterinarian = await UserTest.getUserVeterinarianId();

    const response = await supertest(web)
      .patch(`/staff/prescriptions/${prescription?.id}`)
      .set("SESSION-TOKEN", "token-staff")
      .send({
        veterinarian_id: veterinarian?.id,
        notes:
          "Kucing mengalami demam ringan dan kehilangan nafsu makan. Diberikan obat antipiretik",
        // Missing medical_record_id
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors.medical_record_id.number).toBe(
      "Rekam medis harus diisi!"
    );
  });

  it("should return error if prescription not found", async () => {
    const medicalRecord = await MedicalRecordsTest.getMedicalRecordsId();
    const veterinarian = await UserTest.getUserVeterinarianId();

    const response = await supertest(web)
      .patch(`/staff/prescriptions/99999`)
      .set("SESSION-TOKEN", "token-staff")
      .send({
        medical_record_id: medicalRecord?.id,
        veterinarian_id: veterinarian?.id,
        notes:
          "Kucing mengalami demam ringan dan kehilangan nafsu makan. Diberikan obat antipiretik",
      });

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBe("Data resep tidak ditemukan!");
  });

  it("should return error if session is invalid", async () => {
    const prescription = await PrescriptionsTest.getPrescriptionsId();
    const medicalRecord = await MedicalRecordsTest.getMedicalRecordsId();
    const veterinarian = await UserTest.getUserVeterinarianId();

    const response = await supertest(web)
      .patch(`/staff/prescriptions/${prescription?.id}`)
      .set("SESSION-TOKEN", "invalid_token")
      .send({
        medical_record_id: medicalRecord?.id,
        veterinarian_id: veterinarian?.id,
        notes:
          "Kucing mengalami demam ringan dan kehilangan nafsu makan. Diberikan obat antipiretik",
      });

    expect(response.status).toBe(401);
    expect(response.body.errors).toBe("Unauthorized");
  });

  it("should return error if user doesn't have access", async () => {
    const prescription = await PrescriptionsTest.getPrescriptionsId();
    const medicalRecord = await MedicalRecordsTest.getMedicalRecordsId();
    const veterinarian = await UserTest.getUserVeterinarianId();

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
      .patch(`/staff/prescriptions/${prescription?.id}`)
      .set("SESSION-TOKEN", "token234")
      .send({
        medical_record_id: medicalRecord?.id,
        veterinarian_id: veterinarian?.id,
        notes:
          "Kucing mengalami demam ringan dan kehilangan nafsu makan. Diberikan obat antipiretik",
      });

    logger.debug(response.body);
    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});

describe("DELETE /staff/prescriptions/:id", () => {
  beforeEach(async () => {
    await UserTest.createUser();
    await UserTest.createUser();
    await MedicalRecordsTest.createMedicalRecords();
    await PrescriptionsTest.createPrescriptions();
  });

  afterEach(async () => {
    await PrescriptionsTest.deletePrescriptions();
    await MedicalRecordsTest.deleteMedicalRecords();
    await UserTest.deleteUser();
  });

  it("should delete an existing prescription", async () => {
    const prescription = await PrescriptionsTest.getPrescriptionsId();
    const response = await supertest(web)
      .delete(`/staff/prescriptions/${prescription?.id}`)
      .set("SESSION-TOKEN", "token-staff");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Data resep berhasil dihapus!");
  });

  it("should return error if prescription not found", async () => {
    const response = await supertest(web)
      .delete(`/staff/prescriptions/99999`)
      .set("SESSION-TOKEN", "token-staff");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBe("Data resep tidak ditemukan!");
  });

  it("should return error if session is invalid", async () => {
    const prescription = await PrescriptionsTest.getPrescriptionsId();
    const response = await supertest(web)
      .delete(`/staff/prescriptions/${prescription?.id}`)
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
        token: "token234",
      },
    });

    const response = await supertest(web)
      .delete(`/staff/prescriptions/${prescription?.id}`)
      .set("SESSION-TOKEN", "token234");

    logger.debug(response.body);
    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});
