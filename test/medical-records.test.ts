import supertest from "supertest";
import {
  AnimalTypesTest,
  MedicinesTest,
  PetsTest,
  UserTest,
  AppointmentsTest,
  MedicalRecordsTest,
  ServiceCategoriesTest,
} from "./test-util";
import { web } from "../src/backend/application/web";
import { logger } from "../src/backend/application/logging";
import { prismaClient } from "../src/backend/application/database";
import bcrypt from "bcrypt";

describe("POST /staff/medical-records", () => {
  beforeEach(async () => {
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
  });

  afterEach(async () => {
    await MedicalRecordsTest.deleteMedicalRecords();
    await AppointmentsTest.deleteAppointments();
    await ServiceCategoriesTest.deleteServiceCategories();
    await PetsTest.deletePets();
    await AnimalTypesTest.deleteAnimalTypes();
    await UserTest.deleteUser();
  });

  it("should create a new medical record", async () => {
    const pet = await PetsTest.getPetsId();
    const service = await ServiceCategoriesTest.getServiceCategoriesId();
    const appointment = await AppointmentsTest.getAppointmentsId();
    const veterinarian = await UserTest.getUserVeterinarianId();

    const response = await supertest(web)
      .post("/staff/medical-records")
      .set("SESSION-TOKEN", "token-staff")
      .send({
        pet_id: pet?.id,
        service_id: service?.id,
        appointment_id: appointment?.id,
        veterinarian_id: veterinarian?.id,
        visit_date: new Date("2025-08-15"),
        subject:
          "Pemilik melaporkan bahwa kucing tampak sehat, nafsu makan baik, dan tidak ada gejala sakit. Datang untuk vaksinasi rabies tahunan",
        objective:
          "Suhu tubuh 38.2°C, detak jantung 120 bpm, napas normal, bulu bersih dan rapi, mata dan telinga dalam kondisi normal",
        assessment:
          "Kondisi umum baik, tidak ditemukan kelainan. Layak untuk vaksinasi rabies",
        plan: "Memberikan vaksin rabies 1 dosis, memberikan kartu vaksin baru, menyarankan pemeriksaan kesehatan rutin setiap 6 bulan",
        weight: 12.4,
        temperature_celsius: 38.2,
        next_visit_date: new Date("2025-08-22"),
        status: "final",
      });

    logger.debug(response.body);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Data rekam medis berhasil dibuat!");
    expect(response.body.data.pet_id).toBe(pet?.id);
    expect(response.body.data.service_id).toBe(service?.id);
    expect(response.body.data.appointment_id).toBe(appointment?.id);
    expect(response.body.data.veterinarian_id).toBe(veterinarian?.id);
    expect(response.body.data.visit_date).toBe("2025-08-15T00:00:00.000Z");
    expect(response.body.data.weight).toBe(12.4);
    expect(response.body.data.temperature_celsius).toBe(38.2);
    expect(response.body.data.status).toBe("final");
  });

  it("should return error if pet_id is required", async () => {
    const service = await ServiceCategoriesTest.getServiceCategoriesId();
    const appointment = await AppointmentsTest.getAppointmentsId();
    const veterinarian = await UserTest.getUserVeterinarianId();

    const response = await supertest(web)
      .post("/staff/medical-records")
      .set("SESSION-TOKEN", "token-staff")
      .send({
        service_id: service?.id,
        appointment_id: appointment?.id,
        veterinarian_id: veterinarian?.id,
        visit_date: "2025-08-15",
        weight: 12.4,
        temperature_celsius: 38.2,
        status: "final",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors.pet_id.number).toBe(
      "Hewan peliharaan harus dipilih!"
    );
  });

  it("should return error if service_id is required", async () => {
    const pet = await PetsTest.getPetsId();
    const appointment = await AppointmentsTest.getAppointmentsId();
    const veterinarian = await UserTest.getUserVeterinarianId();

    const response = await supertest(web)
      .post("/staff/medical-records")
      .set("SESSION-TOKEN", "token-staff")
      .send({
        pet_id: pet?.id,
        appointment_id: appointment?.id,
        veterinarian_id: veterinarian?.id,
        visit_date: "2025-08-15",
        weight: 12.4,
        temperature_celsius: 38.2,
        status: "final",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors.service_id.number).toBe(
      "Kategori layanan harus dipilih!"
    );
  });

  it("should return error if veterinarian_id is required", async () => {
    const pet = await PetsTest.getPetsId();
    const service = await ServiceCategoriesTest.getServiceCategoriesId();
    const appointment = await AppointmentsTest.getAppointmentsId();

    const response = await supertest(web)
      .post("/staff/medical-records")
      .set("SESSION-TOKEN", "token-staff")
      .send({
        pet_id: pet?.id,
        service_id: service?.id,
        appointment_id: appointment?.id,
        visit_date: "2025-08-15",
        weight: 12.4,
        temperature_celsius: 38.2,
        status: "final",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors.veterinarian_id.number).toBe(
      "Dokter hewan harus dipilih!"
    );
  });

  it("should return error if visit_date is required", async () => {
    const pet = await PetsTest.getPetsId();
    const service = await ServiceCategoriesTest.getServiceCategoriesId();
    const appointment = await AppointmentsTest.getAppointmentsId();
    const veterinarian = await UserTest.getUserVeterinarianId();

    const response = await supertest(web)
      .post("/staff/medical-records")
      .set("SESSION-TOKEN", "token-staff")
      .send({
        pet_id: pet?.id,
        service_id: service?.id,
        appointment_id: appointment?.id,
        veterinarian_id: veterinarian?.id,
        weight: 12.4,
        temperature_celsius: 38.2,
        status: "final",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors.visit_date.string).toBe(
      "Tanggal kunjungan harus diisi!"
    );
  });

  it("should return error if weight is not numeric", async () => {
    const pet = await PetsTest.getPetsId();
    const service = await ServiceCategoriesTest.getServiceCategoriesId();
    const appointment = await AppointmentsTest.getAppointmentsId();
    const veterinarian = await UserTest.getUserVeterinarianId();

    const response = await supertest(web)
      .post("/staff/medical-records")
      .set("SESSION-TOKEN", "token-staff")
      .send({
        pet_id: pet?.id,
        service_id: service?.id,
        appointment_id: appointment?.id,
        veterinarian_id: veterinarian?.id,
        visit_date: "2025-08-15",
        weight: "not_a_number",
        temperature_celsius: 38.2,
        status: "final",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors.weight.number).toBe(
      "Berat badan harus berupa angka!"
    );
  });

  it("should return error if temperature_celsius is not numeric", async () => {
    const pet = await PetsTest.getPetsId();
    const service = await ServiceCategoriesTest.getServiceCategoriesId();
    const appointment = await AppointmentsTest.getAppointmentsId();
    const veterinarian = await UserTest.getUserVeterinarianId();

    const response = await supertest(web)
      .post("/staff/medical-records")
      .set("SESSION-TOKEN", "token-staff")
      .send({
        pet_id: pet?.id,
        service_id: service?.id,
        appointment_id: appointment?.id,
        veterinarian_id: veterinarian?.id,
        visit_date: "2025-08-15",
        weight: 12.4,
        temperature_celsius: "not_a_number",
        status: "final",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors.temperature_celsius.number).toBe(
      "Suhu tubuh harus berupa angka!"
    );
  });

  it("should return error if status is required", async () => {
    const pet = await PetsTest.getPetsId();
    const service = await ServiceCategoriesTest.getServiceCategoriesId();
    const appointment = await AppointmentsTest.getAppointmentsId();
    const veterinarian = await UserTest.getUserVeterinarianId();

    const response = await supertest(web)
      .post("/staff/medical-records")
      .set("SESSION-TOKEN", "token-staff")
      .send({
        pet_id: pet?.id,
        service_id: service?.id,
        appointment_id: appointment?.id,
        veterinarian_id: veterinarian?.id,
        visit_date: "2025-08-15",
        weight: 12.4,
        temperature_celsius: 38.2,
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors.status.enum).toBe("Status harus dipilih!");
  });

  it("should return error if session is invalid", async () => {
    const pet = await PetsTest.getPetsId();
    const service = await ServiceCategoriesTest.getServiceCategoriesId();
    const appointment = await AppointmentsTest.getAppointmentsId();
    const veterinarian = await UserTest.getUserVeterinarianId();

    const response = await supertest(web)
      .post("/staff/medical-records")
      .set("SESSION-TOKEN", "invalid_token")
      .send({
        pet_id: pet?.id,
        service_id: service?.id,
        appointment_id: appointment?.id,
        veterinarian_id: veterinarian?.id,
        visit_date: "2025-08-15",
        weight: 12.4,
        temperature_celsius: 38.2,
        status: "final",
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

    const pet = await PetsTest.getPetsId();
    const service = await ServiceCategoriesTest.getServiceCategoriesId();
    const appointment = await AppointmentsTest.getAppointmentsId();
    const veterinarian = await UserTest.getUserVeterinarianId();

    const response = await supertest(web)
      .post("/staff/medical-records")
      .set("SESSION-TOKEN", "token-client")
      .send({
        pet_id: pet?.id,
        service_id: service?.id,
        appointment_id: appointment?.id,
        veterinarian_id: veterinarian?.id,
        visit_date: "2025-08-15",
        weight: 12.4,
        temperature_celsius: 38.2,
        status: "final",
      });

    logger.debug(response.body);
    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});

describe("GET /staff/medical-records", () => {
  beforeEach(async () => {
    await UserTest.createUser();
    await AnimalTypesTest.createAnimalTypes();
    await PetsTest.createPets();
    await ServiceCategoriesTest.createServiceCategories();
    await AppointmentsTest.createAppointments();
    await MedicalRecordsTest.createMedicalRecords();
  });

  afterEach(async () => {
    await MedicalRecordsTest.deleteMedicalRecords();
    await AppointmentsTest.deleteAppointments();
    await ServiceCategoriesTest.deleteServiceCategories();
    await PetsTest.deletePets();
    await AnimalTypesTest.deleteAnimalTypes();
    await UserTest.deleteUser();
  });

  it("should return a list of medical records", async () => {
    const response = await supertest(web)
      .get("/staff/medical-records")
      .set("SESSION-TOKEN", "token-staff");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(2);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it("should return error if session is invalid", async () => {
    const response = await supertest(web)
      .get("/staff/medical-records")
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
      .get("/staff/medical-records")
      .set("SESSION-TOKEN", "token-client");

    logger.debug(response.body);
    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});

describe("GET /staff/medical-records/:id", () => {
  beforeEach(async () => {
    await UserTest.createUser();
    await AnimalTypesTest.createAnimalTypes();
    await PetsTest.createPets();
    await ServiceCategoriesTest.createServiceCategories();
    await AppointmentsTest.createAppointments();
    await MedicalRecordsTest.createMedicalRecords();
  });

  afterEach(async () => {
    await MedicalRecordsTest.deleteMedicalRecords();
    await AppointmentsTest.deleteAppointments();
    await ServiceCategoriesTest.deleteServiceCategories();
    await PetsTest.deletePets();
    await AnimalTypesTest.deleteAnimalTypes();
    await UserTest.deleteUser();
  });

  it("should get an existing medical record", async () => {
    const medicalRecord = await MedicalRecordsTest.getMedicalRecordsId();
    const response = await supertest(web)
      .get(`/staff/medical-records/${medicalRecord?.id}`)
      .set("SESSION-TOKEN", "token-staff");

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
      .get(`/staff/medical-records/99999`)
      .set("SESSION-TOKEN", "token-staff");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBe("Data rekam medis tidak ditemukan!");
  });

  it("should return error if session is invalid", async () => {
    const medicalRecord = await MedicalRecordsTest.getMedicalRecordsId();
    const response = await supertest(web)
      .get(`/staff/medical-records/${medicalRecord?.id}`)
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
      .get(`/staff/medical-records/${medicalRecord?.id}`)
      .set("SESSION-TOKEN", "token-client");

    logger.debug(response.body);
    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});

describe("PATCH /staff/medical-records/:id", () => {
  beforeEach(async () => {
    await UserTest.createUser();
    await AnimalTypesTest.createAnimalTypes();
    await PetsTest.createPets();
    await ServiceCategoriesTest.createServiceCategories();
    await AppointmentsTest.createAppointments();
    await MedicalRecordsTest.createMedicalRecords();
  });

  afterEach(async () => {
    await MedicalRecordsTest.deleteMedicalRecords();
    await AppointmentsTest.deleteAppointments();
    await ServiceCategoriesTest.deleteServiceCategories();
    await PetsTest.deletePets();
    await AnimalTypesTest.deleteAnimalTypes();
    await UserTest.deleteUser();
  });

  it("should update an existing medical record", async () => {
    const medicalRecord = await MedicalRecordsTest.getMedicalRecordsId();
    const pet = await PetsTest.getPetsId();
    const service = await ServiceCategoriesTest.getServiceCategoriesId();
    const appointment = await AppointmentsTest.getAppointmentsId();
    const veterinarian = await UserTest.getUserVeterinarianId();

    const response = await supertest(web)
      .patch(`/staff/medical-records/${medicalRecord?.id}`)
      .set("SESSION-TOKEN", "token-staff")
      .send({
        pet_id: pet?.id,
        service_id: service?.id,
        appointment_id: appointment?.id,
        veterinarian_id: veterinarian?.id,
        visit_date: new Date("2025-08-16"),
        subject: "Pemeriksaan rutin setelah vaksinasi rabies",
        objective: "Kondisi umum baik, tidak ada reaksi alergi",
        assessment: "Respon positif terhadap vaksinasi",
        plan: "Kontrol ulang dalam 6 bulan",
        weight: 12.8,
        temperature_celsius: 38.0,
        next_visit_date: new Date("2026-02-16"),
        status: "final",
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Data rekam medis berhasil diperbarui!");
    expect(response.body.data.visit_date).toBe("2025-08-16T00:00:00.000Z");
    expect(response.body.data.weight).toBe(12.8);
    expect(response.body.data.temperature_celsius).toBe(38.0);
    expect(response.body.data.subject).toBe(
      "Pemeriksaan rutin setelah vaksinasi rabies"
    );
  });

  it("should return error if request is invalid", async () => {
    const medicalRecord = await MedicalRecordsTest.getMedicalRecordsId();
    const service = await ServiceCategoriesTest.getServiceCategoriesId();
    const appointment = await AppointmentsTest.getAppointmentsId();
    const veterinarian = await UserTest.getUserVeterinarianId();

    const response = await supertest(web)
      .patch(`/staff/medical-records/${medicalRecord?.id}`)
      .set("SESSION-TOKEN", "token-staff")
      .send({
        service_id: service?.id,
        appointment_id: appointment?.id,
        veterinarian_id: veterinarian?.id,
        visit_date: "2025-08-15",
        weight: 12.4,
        temperature_celsius: 38.2,
        status: "final",
        // Missing pet_id
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors.pet_id.number).toBe(
      "Hewan peliharaan harus dipilih!"
    );
  });

  it("should return error if medical record not found", async () => {
    const pet = await PetsTest.getPetsId();
    const service = await ServiceCategoriesTest.getServiceCategoriesId();
    const appointment = await AppointmentsTest.getAppointmentsId();
    const veterinarian = await UserTest.getUserVeterinarianId();

    const response = await supertest(web)
      .patch(`/staff/medical-records/99999`)
      .set("SESSION-TOKEN", "token-staff")
      .send({
        pet_id: pet?.id,
        service_id: service?.id,
        appointment_id: appointment?.id,
        veterinarian_id: veterinarian?.id,
        visit_date: "2025-08-15",
        weight: 12.4,
        temperature_celsius: 38.2,
        status: "final",
      });

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBe("Data rekam medis tidak ditemukan!");
  });

  it("should return error if session is invalid", async () => {
    const medicalRecord = await MedicalRecordsTest.getMedicalRecordsId();
    const pet = await PetsTest.getPetsId();
    const service = await ServiceCategoriesTest.getServiceCategoriesId();
    const appointment = await AppointmentsTest.getAppointmentsId();
    const veterinarian = await UserTest.getUserVeterinarianId();

    const response = await supertest(web)
      .patch(`/staff/medical-records/${medicalRecord?.id}`)
      .set("SESSION-TOKEN", "invalid_token")
      .send({
        pet_id: pet?.id,
        service_id: service?.id,
        appointment_id: appointment?.id,
        veterinarian_id: veterinarian?.id,
        visit_date: "2025-08-15",
        weight: 12.4,
        temperature_celsius: 38.2,
        status: "final",
      });

    expect(response.status).toBe(401);
    expect(response.body.errors).toBe("Unauthorized");
  });

  it("should return error if user doesn't have access", async () => {
    const medicalRecord = await MedicalRecordsTest.getMedicalRecordsId();
    const pet = await PetsTest.getPetsId();
    const service = await ServiceCategoriesTest.getServiceCategoriesId();
    const appointment = await AppointmentsTest.getAppointmentsId();
    const veterinarian = await UserTest.getUserVeterinarianId();

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
      .patch(`/staff/medical-records/${medicalRecord?.id}`)
      .set("SESSION-TOKEN", "token-client")
      .send({
        pet_id: pet?.id,
        service_id: service?.id,
        appointment_id: appointment?.id,
        veterinarian_id: veterinarian?.id,
        visit_date: "2025-08-15",
        weight: 12.4,
        temperature_celsius: 38.2,
        status: "final",
      });

    logger.debug(response.body);
    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});

describe("DELETE /staff/medical-records/:id", () => {
  beforeEach(async () => {
    await UserTest.createUser();
    await AnimalTypesTest.createAnimalTypes();
    await PetsTest.createPets();
    await ServiceCategoriesTest.createServiceCategories();
    await AppointmentsTest.createAppointments();
    await MedicalRecordsTest.createMedicalRecords();
  });

  afterEach(async () => {
    await MedicalRecordsTest.deleteMedicalRecords();
    await AppointmentsTest.deleteAppointments();
    await ServiceCategoriesTest.deleteServiceCategories();
    await PetsTest.deletePets();
    await AnimalTypesTest.deleteAnimalTypes();
    await UserTest.deleteUser();
  });

  it("should delete an existing medical record", async () => {
    const medicalRecord = await MedicalRecordsTest.getMedicalRecordsId();
    const response = await supertest(web)
      .delete(`/staff/medical-records/${medicalRecord?.id}`)
      .set("SESSION-TOKEN", "token-staff");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Data rekam medis berhasil dihapus!");
  });

  it("should return error if medical record not found", async () => {
    const response = await supertest(web)
      .delete(`/staff/medical-records/99999`)
      .set("SESSION-TOKEN", "token-staff");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBe("Data rekam medis tidak ditemukan!");
  });

  it("should return error if session is invalid", async () => {
    const medicalRecord = await MedicalRecordsTest.getMedicalRecordsId();
    const response = await supertest(web)
      .delete(`/staff/medical-records/${medicalRecord?.id}`)
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
      .delete(`/staff/medical-records/${medicalRecord?.id}`)
      .set("SESSION-TOKEN", "token-client");

    logger.debug(response.body);
    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});
