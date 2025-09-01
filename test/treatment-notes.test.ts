import supertest from "supertest";
import {
  UserTest,
  MedicalRecordsTest,
  TreatmentNotesTest,
  AnimalTypesTest,
  AppointmentsTest,
  PetsTest,
  TransactionsTest,
  PrescriptionItemsTest,
  PrescriptionsTest,
  ServiceCategoriesTest,
  MedicinesTest,
} from "./test-util";
import { web } from "../src/backend/application/web";
import { logger } from "../src/backend/application/logging";
import { prismaClient } from "../src/backend/application/database";
import bcrypt from "bcrypt";

describe("POST /veterinarian/treatment-notes", () => {
  beforeEach(async () => {
    await TreatmentNotesTest.deleteTreatmentNotes();
    await TransactionsTest.deleteTransactions();
    await PrescriptionItemsTest.deletePrescriptionItems();
    await PrescriptionsTest.deletePrescriptions();
    await MedicalRecordsTest.deleteMedicalRecords();
    await MedicinesTest.deleteMedicines();
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
    await PrescriptionsTest.createPrescriptions();
    await MedicinesTest.createMedicines();
    await PrescriptionItemsTest.createPrescriptionItems();
    await TransactionsTest.createTransactions();
  });

  afterEach(async () => {
    await TreatmentNotesTest.deleteTreatmentNotes();
    await TransactionsTest.deleteTransactions();
    await PrescriptionItemsTest.deletePrescriptionItems();
    await PrescriptionsTest.deletePrescriptions();
    await MedicalRecordsTest.deleteMedicalRecords();
    await AppointmentsTest.deleteAppointments();
    await ServiceCategoriesTest.deleteServiceCategories();
    await PetsTest.deletePets();
    await AnimalTypesTest.deleteAnimalTypes();
    await UserTest.deleteUser();
    await MedicinesTest.deleteMedicines();
  });

  it("should create a new treatment note", async () => {
    const user = await UserTest.getUserId();
    const medicalRecord = await MedicalRecordsTest.getMedicalRecordsId();

    const response = await supertest(web)
      .post("/veterinarian/treatment-notes")
      .set("SESSION-TOKEN", "token-veterinarian")
      .send({
        created_by: user?.id,
        medical_record_id: medicalRecord?.id,
        notes: "Lebih sigap dalam menghadapi penanganan awal",
      });

    logger.debug(response.body);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe(
      "Data catatan perawatan berhasil dibuat!"
    );
    expect(response.body.data.created_by).toBe(user?.id);
    expect(response.body.data.medical_record_id).toBe(medicalRecord?.id);
    expect(response.body.data.notes).toBe(
      "Lebih sigap dalam menghadapi penanganan awal"
    );
  });

  it("should return error if created_by is required", async () => {
    const medicalRecord = await MedicalRecordsTest.getMedicalRecordsId();

    const response = await supertest(web)
      .post("/veterinarian/treatment-notes")
      .set("SESSION-TOKEN", "token-veterinarian")
      .send({
        medical_record_id: medicalRecord?.id,
        notes: "Lebih sigap dalam menghadapi penanganan awal",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors.created_by.number).toBe(
      "Pembuat catatan harus diisi!"
    );
  });

  it("should return error if medical_record_id is required", async () => {
    const user = await UserTest.getUserId();

    const response = await supertest(web)
      .post("/veterinarian/treatment-notes")
      .set("SESSION-TOKEN", "token-veterinarian")
      .send({
        created_by: user?.id,
        notes: "Lebih sigap dalam menghadapi penanganan awal",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors.medical_record_id.number).toBe(
      "Rekam medis harus diisi!"
    );
  });

  it("should return error if notes is required", async () => {
    const user = await UserTest.getUserId();
    const medicalRecord = await MedicalRecordsTest.getMedicalRecordsId();

    const response = await supertest(web)
      .post("/veterinarian/treatment-notes")
      .set("SESSION-TOKEN", "token-veterinarian")
      .send({
        created_by: user?.id,
        medical_record_id: medicalRecord?.id,
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors.notes.string).toBe("Catatan harus diisi!");
  });

  it("should return error if notes is too short", async () => {
    const user = await UserTest.getUserId();
    const medicalRecord = await MedicalRecordsTest.getMedicalRecordsId();

    const response = await supertest(web)
      .post("/veterinarian/treatment-notes")
      .set("SESSION-TOKEN", "token-veterinarian")
      .send({
        created_by: user?.id,
        medical_record_id: medicalRecord?.id,
        notes: "abc",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors.notes.min).toBe(
      "Catatan memiliki minimal 5 karakter!"
    );
  });

  it("should return error if session is invalid", async () => {
    const user = await UserTest.getUserId();
    const medicalRecord = await MedicalRecordsTest.getMedicalRecordsId();

    const response = await supertest(web)
      .post("/veterinarian/treatment-notes")
      .set("SESSION-TOKEN", "invalid_token")
      .send({
        created_by: user?.id,
        medical_record_id: medicalRecord?.id,
        notes: "Lebih sigap dalam menghadapi penanganan awal",
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

    const user = await UserTest.getUserId();
    const medicalRecord = await MedicalRecordsTest.getMedicalRecordsId();

    const response = await supertest(web)
      .post("/veterinarian/treatment-notes")
      .set("SESSION-TOKEN", "token234")
      .send({
        created_by: user?.id,
        medical_record_id: medicalRecord?.id,
        notes: "Lebih sigap dalam menghadapi penanganan awal",
      });

    logger.debug(response.body);
    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});

describe("GET /veterinarian/treatment-notes", () => {
  beforeEach(async () => {
    await TreatmentNotesTest.deleteTreatmentNotes();
    await TransactionsTest.deleteTransactions();
    await PrescriptionItemsTest.deletePrescriptionItems();
    await PrescriptionsTest.deletePrescriptions();
    await MedicalRecordsTest.deleteMedicalRecords();
    await MedicinesTest.deleteMedicines();
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
    await PrescriptionsTest.createPrescriptions();
    await MedicinesTest.createMedicines();
    await PrescriptionItemsTest.createPrescriptionItems();
    await TransactionsTest.createTransactions();
    await TreatmentNotesTest.createTreatmentNotes();
  });

  afterEach(async () => {
    await TreatmentNotesTest.deleteTreatmentNotes();
    await TransactionsTest.deleteTransactions();
    await PrescriptionItemsTest.deletePrescriptionItems();
    await PrescriptionsTest.deletePrescriptions();
    await MedicalRecordsTest.deleteMedicalRecords();
    await AppointmentsTest.deleteAppointments();
    await ServiceCategoriesTest.deleteServiceCategories();
    await PetsTest.deletePets();
    await AnimalTypesTest.deleteAnimalTypes();
    await UserTest.deleteUser();
    await MedicinesTest.deleteMedicines();
  });

  it("should return a list of treatment notes", async () => {
    const response = await supertest(web)
      .get("/veterinarian/treatment-notes")
      .set("SESSION-TOKEN", "token-veterinarian");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(2);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it("should return error if session is invalid", async () => {
    const response = await supertest(web)
      .get("/veterinarian/treatment-notes")
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
      .get("/veterinarian/treatment-notes")
      .set("SESSION-TOKEN", "token234");

    logger.debug(response.body);
    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});

describe("GET /veterinarian/treatment-notes/:id", () => {
  beforeEach(async () => {
    await UserTest.createUser();
    await UserTest.createVeterinarian();
    await AnimalTypesTest.createAnimalTypes();
    await PetsTest.createPets();
    await ServicesTest.createServices();
    await AppointmentsTest.createAppointments();
    await MedicalRecordsTest.createMedicalRecords();
    await TreatmentNotesTest.createTreatmentNotes();
  });

  afterEach(async () => {
    await TreatmentNotesTest.deleteTreatmentNotes();
    await MedicalRecordsTest.deleteMedicalRecords();
    await AppointmentsTest.deleteAppointments();
    await ServicesTest.deleteServices();
    await PetsTest.deletePets();
    await AnimalTypesTest.deleteAnimalTypes();
    await UserTest.deleteUser();
  });

  it("should get an existing treatment note", async () => {
    const treatmentNote = await TreatmentNotesTest.getTreatmentNotesId();
    const response = await supertest(web)
      .get(`/veterinarian/treatment-notes/${treatmentNote?.id}`)
      .set("SESSION-TOKEN", "token-veterinarian");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(treatmentNote?.id);
    expect(response.body.data.created_by).toBeDefined();
    expect(response.body.data.medical_record_id).toBeDefined();
    expect(response.body.data.notes).toBeDefined();
  });

  it("should return error if treatment note not found", async () => {
    const response = await supertest(web)
      .get(`/veterinarian/treatment-notes/99999`)
      .set("SESSION-TOKEN", "token-veterinarian");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBe(
      "Data catatan perawatan tidak ditemukan!"
    );
  });

  it("should return error if session is invalid", async () => {
    const treatmentNote = await TreatmentNotesTest.getTreatmentNotesId();
    const response = await supertest(web)
      .get(`/veterinarian/treatment-notes/${treatmentNote?.id}`)
      .set("SESSION-TOKEN", "invalid_token");

    expect(response.status).toBe(401);
    expect(response.body.errors).toBe("Unauthorized");
  });

  it("should return error if user doesn't have access", async () => {
    const treatmentNote = await TreatmentNotesTest.getTreatmentNotesId();
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
      .get(`/veterinarian/treatment-notes/${treatmentNote?.id}`)
      .set("SESSION-TOKEN", "token234");

    logger.debug(response.body);
    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});

describe("PATCH /veterinarian/treatment-notes/:id", () => {
  beforeEach(async () => {
    await UserTest.createUser();
    await UserTest.createVeterinarian();
    await AnimalTypesTest.createAnimalTypes();
    await PetsTest.createPets();
    await ServicesTest.createServices();
    await AppointmentsTest.createAppointments();
    await MedicalRecordsTest.createMedicalRecords();
    await TreatmentNotesTest.createTreatmentNotes();
  });

  afterEach(async () => {
    await TreatmentNotesTest.deleteTreatmentNotes();
    await MedicalRecordsTest.deleteMedicalRecords();
    await AppointmentsTest.deleteAppointments();
    await ServicesTest.deleteServices();
    await PetsTest.deletePets();
    await AnimalTypesTest.deleteAnimalTypes();
    await UserTest.deleteUser();
  });

  it("should update an existing treatment note", async () => {
    const treatmentNote = await TreatmentNotesTest.getTreatmentNotesId();
    const user = await UserTest.getUserId();
    const medicalRecord = await MedicalRecordsTest.getMedicalRecordsId();

    const response = await supertest(web)
      .patch(`/veterinarian/treatment-notes/${treatmentNote?.id}`)
      .set("SESSION-TOKEN", "token-veterinarian")
      .send({
        created_by: user?.id,
        medical_record_id: medicalRecord?.id,
        notes: "Perhatikan efek samping obat dalam beberapa hari",
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      "Data catatan perawatan berhasil diperbarui!"
    );
    expect(response.body.data.notes).toBe(
      "Perhatikan efek samping obat dalam beberapa hari"
    );
  });

  it("should return error if request is invalid", async () => {
    const treatmentNote = await TreatmentNotesTest.getTreatmentNotesId();
    const medicalRecord = await MedicalRecordsTest.getMedicalRecordsId();

    const response = await supertest(web)
      .patch(`/veterinarian/treatment-notes/${treatmentNote?.id}`)
      .set("SESSION-TOKEN", "token-veterinarian")
      .send({
        medical_record_id: medicalRecord?.id,
        notes: "Perhatikan efek samping obat dalam beberapa hari",
        // Missing created_by
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors.created_by.number).toBe(
      "Pembuat catatan harus diisi!"
    );
  });

  it("should return error if notes is too short", async () => {
    const treatmentNote = await TreatmentNotesTest.getTreatmentNotesId();
    const user = await UserTest.getUserId();
    const medicalRecord = await MedicalRecordsTest.getMedicalRecordsId();

    const response = await supertest(web)
      .patch(`/veterinarian/treatment-notes/${treatmentNote?.id}`)
      .set("SESSION-TOKEN", "token-veterinarian")
      .send({
        created_by: user?.id,
        medical_record_id: medicalRecord?.id,
        notes: "abc",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors.notes.min).toBe(
      "Catatan memiliki minimal 5 karakter!"
    );
  });

  it("should return error if treatment note not found", async () => {
    const user = await UserTest.getUserId();
    const medicalRecord = await MedicalRecordsTest.getMedicalRecordsId();

    const response = await supertest(web)
      .patch(`/veterinarian/treatment-notes/99999`)
      .set("SESSION-TOKEN", "token-veterinarian")
      .send({
        created_by: user?.id,
        medical_record_id: medicalRecord?.id,
        notes: "Perhatikan efek samping obat dalam beberapa hari",
      });

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBe(
      "Data catatan perawatan tidak ditemukan!"
    );
  });

  it("should return error if session is invalid", async () => {
    const treatmentNote = await TreatmentNotesTest.getTreatmentNotesId();
    const user = await UserTest.getUserId();
    const medicalRecord = await MedicalRecordsTest.getMedicalRecordsId();

    const response = await supertest(web)
      .patch(`/veterinarian/treatment-notes/${treatmentNote?.id}`)
      .set("SESSION-TOKEN", "invalid_token")
      .send({
        created_by: user?.id,
        medical_record_id: medicalRecord?.id,
        notes: "Perhatikan efek samping obat dalam beberapa hari",
      });

    expect(response.status).toBe(401);
    expect(response.body.errors).toBe("Unauthorized");
  });

  it("should return error if user doesn't have access", async () => {
    const treatmentNote = await TreatmentNotesTest.getTreatmentNotesId();
    const user = await UserTest.getUserId();
    const medicalRecord = await MedicalRecordsTest.getMedicalRecordsId();

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
      .patch(`/veterinarian/treatment-notes/${treatmentNote?.id}`)
      .set("SESSION-TOKEN", "token234")
      .send({
        created_by: user?.id,
        medical_record_id: medicalRecord?.id,
        notes: "Perhatikan efek samping obat dalam beberapa hari",
      });

    logger.debug(response.body);
    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});

describe("DELETE /veterinarian/treatment-notes/:id", () => {
  beforeEach(async () => {
    await UserTest.createUser();
    await UserTest.createVeterinarian();
    await AnimalTypesTest.createAnimalTypes();
    await PetsTest.createPets();
    await ServicesTest.createServices();
    await AppointmentsTest.createAppointments();
    await MedicalRecordsTest.createMedicalRecords();
    await TreatmentNotesTest.createTreatmentNotes();
  });

  afterEach(async () => {
    await TreatmentNotesTest.deleteTreatmentNotes();
    await MedicalRecordsTest.deleteMedicalRecords();
    await AppointmentsTest.deleteAppointments();
    await ServicesTest.deleteServices();
    await PetsTest.deletePets();
    await AnimalTypesTest.deleteAnimalTypes();
    await UserTest.deleteUser();
  });

  it("should delete an existing treatment note", async () => {
    const treatmentNote = await TreatmentNotesTest.getTreatmentNotesId();
    const response = await supertest(web)
      .delete(`/veterinarian/treatment-notes/${treatmentNote?.id}`)
      .set("SESSION-TOKEN", "token-veterinarian");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      "Data catatan perawatan berhasil dihapus!"
    );
  });

  it("should return error if treatment note not found", async () => {
    const response = await supertest(web)
      .delete(`/veterinarian/treatment-notes/99999`)
      .set("SESSION-TOKEN", "token-veterinarian");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBe(
      "Data catatan perawatan tidak ditemukan!"
    );
  });

  it("should return error if session is invalid", async () => {
    const treatmentNote = await TreatmentNotesTest.getTreatmentNotesId();
    const response = await supertest(web)
      .delete(`/veterinarian/treatment-notes/${treatmentNote?.id}`)
      .set("SESSION-TOKEN", "invalid_token");

    expect(response.status).toBe(401);
    expect(response.body.errors).toBe("Unauthorized");
  });

  it("should return error if user doesn't have access", async () => {
    const treatmentNote = await TreatmentNotesTest.getTreatmentNotesId();
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
      .delete(`/veterinarian/treatment-notes/${treatmentNote?.id}`)
      .set("SESSION-TOKEN", "token234");

    logger.debug(response.body);
    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});
