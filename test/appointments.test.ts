import supertest from "supertest";
import {
  AnimalTypesTest,
  MedicinesTest,
  PetsTest,
  UserTest,
  AppointmentsTest,
} from "./test-util";
import { web } from "../src/backend/application/web";
import { logger } from "../src/backend/application/logging";
import { prismaClient } from "../src/backend/application/database";
import bcrypt from "bcrypt";

describe("POST /staff/appointments", () => {
  beforeEach(async () => {
    await AppointmentsTest.deleteAppointments();
    await PetsTest.deletePets();
    await AnimalTypesTest.deleteAnimalTypes();
    await UserTest.deleteUser();
    await UserTest.createUser();
    await AnimalTypesTest.createAnimalTypes();
    await PetsTest.createPets();
  });

  afterEach(async () => {
    await AppointmentsTest.deleteAppointments();
    await PetsTest.deletePets();
    await AnimalTypesTest.deleteAnimalTypes();
    await UserTest.deleteUser();
  });

  it("should create a new appointment", async () => {
    const pet = await PetsTest.getPetsId();
    const user = await UserTest.getUserId();

    const response = await supertest(web)
      .post("/staff/appointments")
      .set("SESSION-TOKEN", "token222")
      .send({
        pet_id: pet?.id,
        created_by: user?.id,
        schedule_date: new Date("2025-08-15"),
        schedule_time: "08:00",
        status: "scheduled",
        reason: "Vaksinasi rabies",
        notes: "Vaksinasi rabies tahunan",
      });

    logger.debug(response.body);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Data janji temu berhasil dibuat!");
    expect(response.body.data.pet_id).toBe(pet?.id);
    expect(response.body.data.created_by).toBe(user?.id);
    expect(response.body.data.schedule_date).toBe("2025-08-15T00:00:00.000Z");
    expect(response.body.data.schedule_time).toBe("08:00");
    expect(response.body.data.status).toBe("scheduled");
    expect(response.body.data.reason).toBe("Vaksinasi rabies");
    expect(response.body.data.notes).toBe("Vaksinasi rabies tahunan");
  });

  it("should return error if pet_id is required", async () => {
    const user = await UserTest.getUserId();

    const response = await supertest(web)
      .post("/staff/appointments")
      .set("SESSION-TOKEN", "token222")
      .send({
        created_by: user?.id,
        schedule_date: "2025-08-15",
        schedule_time: "08:00:00",
        status: "scheduled",
        reason: "Vaksinasi rabies",
        notes: "Vaksinasi rabies tahunan",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors.pet_id.number).toBe(
      "Hewan peliharaan harus dipilih!"
    );
  });

  it("should return error if created_by is required", async () => {
    const pet = await PetsTest.getPetsId();

    const response = await supertest(web)
      .post("/staff/appointments")
      .set("SESSION-TOKEN", "token222")
      .send({
        pet_id: pet?.id,
        schedule_date: "2025-08-15",
        schedule_time: "08:00:00",
        status: "scheduled",
        reason: "Vaksinasi rabies",
        notes: "Vaksinasi rabies tahunan",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors.created_by.number).toBe(
      "Pembuat janji temu harus diisi!"
    );
  });

  it("should return error if schedule_date is required", async () => {
    const pet = await PetsTest.getPetsId();
    const user = await UserTest.getUserId();

    const response = await supertest(web)
      .post("/staff/appointments")
      .set("SESSION-TOKEN", "token222")
      .send({
        pet_id: pet?.id,
        created_by: user?.id,
        schedule_time: "08:00:00",
        status: "scheduled",
        reason: "Vaksinasi rabies",
        notes: "Vaksinasi rabies tahunan",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors.schedule_date.string).toBe(
      "Tanggal janji temu harus diisi!"
    );
  });

  it("should return error if schedule_time is required", async () => {
    const pet = await PetsTest.getPetsId();
    const user = await UserTest.getUserId();

    const response = await supertest(web)
      .post("/staff/appointments")
      .set("SESSION-TOKEN", "token222")
      .send({
        pet_id: pet?.id,
        created_by: user?.id,
        schedule_date: "2025-08-15",
        status: "scheduled",
        reason: "Vaksinasi rabies",
        notes: "Vaksinasi rabies tahunan",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors.schedule_time.string).toBe(
      "Jam janji temu harus diisi!"
    );
  });

  it("should return error if status is required", async () => {
    const pet = await PetsTest.getPetsId();
    const user = await UserTest.getUserId();

    const response = await supertest(web)
      .post("/staff/appointments")
      .set("SESSION-TOKEN", "token222")
      .send({
        pet_id: pet?.id,
        created_by: user?.id,
        schedule_date: "2025-08-15",
        schedule_time: "08:00:00",
        reason: "Vaksinasi rabies",
        notes: "Vaksinasi rabies tahunan",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors.status.enum).toBe("Status harus dipilih!");
  });

  it("should return error if session is invalid", async () => {
    const pet = await PetsTest.getPetsId();
    const user = await UserTest.getUserId();

    const response = await supertest(web)
      .post("/staff/appointments")
      .set("SESSION-TOKEN", "invalid_token")
      .send({
        pet_id: pet?.id,
        created_by: user?.id,
        schedule_date: "2025-08-15",
        schedule_time: "08:00:00",
        status: "scheduled",
        reason: "Vaksinasi rabies",
        notes: "Vaksinasi rabies tahunan",
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

    const pet = await PetsTest.getPetsId();
    const user = await UserTest.getUserId();

    const response = await supertest(web)
      .post("/staff/appointments")
      .set("SESSION-TOKEN", "token234")
      .send({
        pet_id: pet?.id,
        created_by: user?.id,
        schedule_date: "2025-08-15",
        schedule_time: "08:00:00",
        status: "scheduled",
        reason: "Vaksinasi rabies",
        notes: "Vaksinasi rabies tahunan",
      });

    logger.debug(response.body);
    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});

describe("GET /staff/appointments", () => {
  beforeEach(async () => {
    await UserTest.createUser();
    await AnimalTypesTest.createAnimalTypes();
    await PetsTest.createPets();
    await AppointmentsTest.createAppointments();
  });

  afterEach(async () => {
    await AppointmentsTest.deleteAppointments();
    await PetsTest.deletePets();
    await AnimalTypesTest.deleteAnimalTypes();
    await UserTest.deleteUser();
  });

  it("should return a list of appointments", async () => {
    const response = await supertest(web)
      .get("/staff/appointments")
      .set("SESSION-TOKEN", "token222");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(2);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it("should return error if session is invalid", async () => {
    const response = await supertest(web)
      .get("/staff/appointments")
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
      .get("/staff/appointments")
      .set("SESSION-TOKEN", "token234");

    logger.debug(response.body);
    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});

describe("GET /staff/appointments/:id", () => {
  beforeEach(async () => {
    await UserTest.createUser();
    await AnimalTypesTest.createAnimalTypes();
    await PetsTest.createPets();
    await AppointmentsTest.createAppointments();
  });

  afterEach(async () => {
    await AppointmentsTest.deleteAppointments();
    await PetsTest.deletePets();
    await AnimalTypesTest.deleteAnimalTypes();
    await UserTest.deleteUser();
  });

  it("should get an existing appointment", async () => {
    const appointment = await AppointmentsTest.getAppointmentsId();
    const response = await supertest(web)
      .get(`/staff/appointments/${appointment?.id}`)
      .set("SESSION-TOKEN", "token222");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(appointment?.id);
    expect(response.body.data.pet_id).toBeDefined();
    expect(response.body.data.created_by).toBeDefined();
    expect(response.body.data.schedule_date).toBeDefined();
    expect(response.body.data.schedule_time).toBeDefined();
    expect(response.body.data.status).toBeDefined();
  });

  it("should return error if appointment not found", async () => {
    const response = await supertest(web)
      .get(`/staff/appointments/99999`)
      .set("SESSION-TOKEN", "token222");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBe("Data janji temu tidak ditemukan!");
  });

  it("should return error if session is invalid", async () => {
    const appointment = await AppointmentsTest.getAppointmentsId();
    const response = await supertest(web)
      .get(`/staff/appointments/${appointment?.id}`)
      .set("SESSION-TOKEN", "invalid_token");

    expect(response.status).toBe(401);
    expect(response.body.errors).toBe("Unauthorized");
  });

  it("should return error if user doesn't have access", async () => {
    const appointment = await AppointmentsTest.getAppointmentsId();
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
      .get(`/staff/appointments/${appointment?.id}`)
      .set("SESSION-TOKEN", "token234");

    logger.debug(response.body);
    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});

describe("PATCH /staff/appointments/:id", () => {
  beforeEach(async () => {
    await UserTest.createUser();
    await AnimalTypesTest.createAnimalTypes();
    await PetsTest.createPets();
    await AppointmentsTest.createAppointments();
  });

  afterEach(async () => {
    await AppointmentsTest.deleteAppointments();
    await PetsTest.deletePets();
    await AnimalTypesTest.deleteAnimalTypes();
    await UserTest.deleteUser();
  });

  it("should update an existing appointment", async () => {
    const appointment = await AppointmentsTest.getAppointmentsId();
    const pet = await PetsTest.getPetsId();
    const user = await UserTest.getUserId();

    const response = await supertest(web)
      .patch(`/staff/appointments/${appointment?.id}`)
      .set("SESSION-TOKEN", "token222")
      .send({
        pet_id: pet?.id,
        created_by: user?.id,
        schedule_date: new Date("2025-08-16"),
        schedule_time: "09:00",
        status: "completed",
        reason: "Pemeriksaan luka setelah kecelakaan",
        notes: "Pernah mengalami kecelakaan 2 minggu lalu",
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Data janji temu berhasil diperbarui!");
    expect(response.body.data.schedule_date).toBe("2025-08-16T00:00:00.000Z");
    expect(response.body.data.schedule_time).toBe("09:00");
    expect(response.body.data.status).toBe("completed");
    expect(response.body.data.reason).toBe(
      "Pemeriksaan luka setelah kecelakaan"
    );
    expect(response.body.data.notes).toBe(
      "Pernah mengalami kecelakaan 2 minggu lalu"
    );
  });

  it("should return error if request is invalid", async () => {
    const appointment = await AppointmentsTest.getAppointmentsId();
    const user = await UserTest.getUserId();

    const response = await supertest(web)
      .patch(`/staff/appointments/${appointment?.id}`)
      .set("SESSION-TOKEN", "token222")
      .send({
        created_by: user?.id,
        schedule_date: new Date("2025-08-15"),
        schedule_time: "08:00",
        status: "scheduled",
        reason: "Vaksinasi rabies",
        notes: "Vaksinasi rabies tahunan",
        // Missing pet_id
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors.pet_id.number).toBe(
      "Hewan peliharaan harus dipilih!"
    );
  });

  it("should return error if appointment not found", async () => {
    const pet = await PetsTest.getPetsId();
    const user = await UserTest.getUserId();

    const response = await supertest(web)
      .patch(`/staff/appointments/99999`)
      .set("SESSION-TOKEN", "token222")
      .send({
        pet_id: pet?.id,
        created_by: user?.id,
        schedule_date: new Date("2025-08-15"),
        schedule_time: "08:00",
        status: "scheduled",
        reason: "Vaksinasi rabies",
        notes: "Vaksinasi rabies tahunan",
      });

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBe("Data janji temu tidak ditemukan!");
  });

  it("should return error if session is invalid", async () => {
    const appointment = await AppointmentsTest.getAppointmentsId();
    const pet = await PetsTest.getPetsId();
    const user = await UserTest.getUserId();

    const response = await supertest(web)
      .patch(`/staff/appointments/${appointment?.id}`)
      .set("SESSION-TOKEN", "invalid_token")
      .send({
        pet_id: pet?.id,
        created_by: user?.id,
        schedule_date: "2025-08-15",
        schedule_time: "08:00:00",
        status: "scheduled",
        reason: "Vaksinasi rabies",
        notes: "Vaksinasi rabies tahunan",
      });

    expect(response.status).toBe(401);
    expect(response.body.errors).toBe("Unauthorized");
  });

  it("should return error if user doesn't have access", async () => {
    const appointment = await AppointmentsTest.getAppointmentsId();
    const pet = await PetsTest.getPetsId();
    const user = await UserTest.getUserId();

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
      .patch(`/staff/appointments/${appointment?.id}`)
      .set("SESSION-TOKEN", "token234")
      .send({
        pet_id: pet?.id,
        created_by: user?.id,
        schedule_date: "2025-08-15",
        schedule_time: "08:00:00",
        status: "scheduled",
        reason: "Vaksinasi rabies",
        notes: "Vaksinasi rabies tahunan",
      });

    logger.debug(response.body);
    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});

describe("DELETE /staff/appointments/:id", () => {
  beforeEach(async () => {
    await UserTest.createUser();
    await AnimalTypesTest.createAnimalTypes();
    await PetsTest.createPets();
    await AppointmentsTest.createAppointments();
  });

  afterEach(async () => {
    await AppointmentsTest.deleteAppointments();
    await PetsTest.deletePets();
    await AnimalTypesTest.deleteAnimalTypes();
    await UserTest.deleteUser();
  });

  it("should delete an existing appointment", async () => {
    const appointment = await AppointmentsTest.getAppointmentsId();
    const response = await supertest(web)
      .delete(`/staff/appointments/${appointment?.id}`)
      .set("SESSION-TOKEN", "token222");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Data janji temu berhasil dihapus!");
  });

  it("should return error if appointment not found", async () => {
    const response = await supertest(web)
      .delete(`/staff/appointments/99999`)
      .set("SESSION-TOKEN", "token222");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBe("Data janji temu tidak ditemukan!");
  });

  it("should return error if session is invalid", async () => {
    const appointment = await AppointmentsTest.getAppointmentsId();
    const response = await supertest(web)
      .delete(`/staff/appointments/${appointment?.id}`)
      .set("SESSION-TOKEN", "invalid_token");

    expect(response.status).toBe(401);
    expect(response.body.errors).toBe("Unauthorized");
  });

  it("should return error if user doesn't have access", async () => {
    const appointment = await AppointmentsTest.getAppointmentsId();
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
      .delete(`/staff/appointments/${appointment?.id}`)
      .set("SESSION-TOKEN", "token234");

    logger.debug(response.body);
    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});
