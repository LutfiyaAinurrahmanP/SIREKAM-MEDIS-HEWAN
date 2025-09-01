import supertest from "supertest";
import {
  UserTest,
  MedicinesTest,
  PrescriptionsTest,
  PrescriptionItemsTest,
  MedicalRecordsTest,
  AppointmentsTest,
  ServiceCategoriesTest,
  PetsTest,
  AnimalTypesTest,
} from "./test-util";
import { web } from "../src/backend/application/web";
import { logger } from "../src/backend/application/logging";
import { prismaClient } from "../src/backend/application/database";
import bcrypt from "bcrypt";

describe("POST /staff/prescription-items", () => {
  beforeEach(async () => {
    await PrescriptionItemsTest.deletePrescriptionItems();
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
    await PrescriptionsTest.createPrescriptions();
    await MedicinesTest.createMedicines();
  });

  afterEach(async () => {
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

  it("should create a new prescription item", async () => {
    const prescription = await PrescriptionsTest.getPrescriptionsId();
    const medicine = await MedicinesTest.getMedicineId();

    const response = await supertest(web)
      .post("/staff/prescription-items")
      .set("SESSION-TOKEN", "token-staff")
      .send({
        prescription_id: prescription?.id,
        medicine_id: medicine?.id,
        dosage: "500 mg",
        frequency: "3 kali sehari",
        duration_days: 7,
        instructions: "Diminum setelah makan",
      });

    logger.debug(response.body);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Data resep obat berhasil dibuat!");
    expect(response.body.data.prescription_id).toBe(prescription?.id);
    expect(response.body.data.medicine_id).toBe(medicine?.id);
    expect(response.body.data.dosage).toBe("500 mg");
    expect(response.body.data.frequency).toBe("3 kali sehari");
    expect(response.body.data.duration_days).toBe(7);
    expect(response.body.data.instructions).toBe("Diminum setelah makan");
  });

  it("should return error if prescription_id is required", async () => {
    const medicine = await MedicinesTest.getMedicineId();

    const response = await supertest(web)
      .post("/staff/prescription-items")
      .set("SESSION-TOKEN", "token-staff")
      .send({
        medicine_id: medicine?.id,
        dosage: "500 mg",
        frequency: "3 kali sehari",
        duration_days: 7,
        instructions: "Diminum setelah makan",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors.prescription_id.number).toBe(
      "Resep harus diisi!"
    );
  });

  it("should return error if medicine_id is required", async () => {
    const prescription = await PrescriptionsTest.getPrescriptionsId();

    const response = await supertest(web)
      .post("/staff/prescription-items")
      .set("SESSION-TOKEN", "token-staff")
      .send({
        prescription_id: prescription?.id,
        dosage: "500 mg",
        frequency: "3 kali sehari",
        duration_days: 7,
        instructions: "Diminum setelah makan",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors.medicine_id.number).toBe("Obat harus diisi!");
  });

  it("should return error if session is invalid", async () => {
    const prescription = await PrescriptionsTest.getPrescriptionsId();
    const medicine = await MedicinesTest.getMedicineId();

    const response = await supertest(web)
      .post("/staff/prescription-items")
      .set("SESSION-TOKEN", "invalid_token")
      .send({
        prescription_id: prescription?.id,
        medicine_id: medicine?.id,
        dosage: "500 mg",
        frequency: "3 kali sehari",
        duration_days: 7,
        instructions: "Diminum setelah makan",
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

    const prescription = await PrescriptionsTest.getPrescriptionsId();
    const medicine = await MedicinesTest.getMedicineId();

    const response = await supertest(web)
      .post("/staff/prescription-items")
      .set("SESSION-TOKEN", "token234")
      .send({
        prescription_id: prescription?.id,
        medicine_id: medicine?.id,
        dosage: "500 mg",
        frequency: "3 kali sehari",
        duration_days: 7,
        instructions: "Diminum setelah makan",
      });

    logger.debug(response.body);
    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});

describe("GET /staff/prescription-items", () => {
  beforeEach(async () => {
    await PrescriptionItemsTest.deletePrescriptionItems();
    await PrescriptionsTest.deletePrescriptions();
    await MedicalRecordsTest.deleteMedicalRecords();
    await AppointmentsTest.deleteAppointments();
    await ServiceCategoriesTest.deleteServiceCategories();
    await PetsTest.deletePets();
    await AnimalTypesTest.deleteAnimalTypes();
    await UserTest.deleteUser();
    await MedicinesTest.deleteMedicines();
    await UserTest.createUser();
    await AnimalTypesTest.createAnimalTypes();
    await PetsTest.createPets();
    await ServiceCategoriesTest.createServiceCategories();
    await AppointmentsTest.createAppointments();
    await MedicalRecordsTest.createMedicalRecords();
    await PrescriptionsTest.createPrescriptions();
    await MedicinesTest.createMedicines();
    await PrescriptionItemsTest.createPrescriptionItems();
  });

  afterEach(async () => {
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

  it("should return a list of prescription items", async () => {
    const response = await supertest(web)
      .get("/staff/prescription-items")
      .set("SESSION-TOKEN", "token-staff");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(2);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it("should return error if session is invalid", async () => {
    const response = await supertest(web)
      .get("/staff/prescription-items")
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
      .get("/staff/prescription-items")
      .set("SESSION-TOKEN", "token234");

    logger.debug(response.body);
    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});

describe("GET /staff/prescription-items/:id", () => {
  beforeEach(async () => {
    await PrescriptionItemsTest.deletePrescriptionItems();
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
    await PrescriptionsTest.createPrescriptions();
    await MedicinesTest.createMedicines();
    await PrescriptionItemsTest.createPrescriptionItems();
  });

  afterEach(async () => {
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

  it("should get an existing prescription item", async () => {
    const item = await PrescriptionItemsTest.getPrescriptionItemsId();
    const response = await supertest(web)
      .get(`/staff/prescription-items/${item?.id}`)
      .set("SESSION-TOKEN", "token-staff");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(item?.id);
    expect(response.body.data.prescription_id).toBeDefined();
    expect(response.body.data.medicine_id).toBeDefined();
    expect(response.body.data.dosage).toBeDefined();
    expect(response.body.data.frequency).toBeDefined();
    expect(response.body.data.duration_days).toBeDefined();
    expect(response.body.data.instructions).toBeDefined();
  });

  it("should return error if prescription item not found", async () => {
    const response = await supertest(web)
      .get(`/staff/prescription-items/99999`)
      .set("SESSION-TOKEN", "token-staff");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBe("Data resep obat tidak ditemukan!");
  });

  it("should return error if session is invalid", async () => {
    const item = await PrescriptionItemsTest.getPrescriptionItemsId();
    const response = await supertest(web)
      .get(`/staff/prescription-items/${item?.id}`)
      .set("SESSION-TOKEN", "invalid_token");

    expect(response.status).toBe(401);
    expect(response.body.errors).toBe("Unauthorized");
  });

  it("should return error if user doesn't have access", async () => {
    const item = await PrescriptionItemsTest.getPrescriptionItemsId();
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
      .get(`/staff/prescription-items/${item?.id}`)
      .set("SESSION-TOKEN", "token234");

    logger.debug(response.body);
    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});

describe("PATCH /staff/prescription-items/:id", () => {
  beforeEach(async () => {
    await PrescriptionItemsTest.deletePrescriptionItems();
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
    await PrescriptionsTest.createPrescriptions();
    await MedicinesTest.createMedicines();
    await PrescriptionItemsTest.createPrescriptionItems();
  });

  afterEach(async () => {
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

  it("should update an existing prescription item", async () => {
    const item = await PrescriptionItemsTest.getPrescriptionItemsId();
    const prescription = await PrescriptionsTest.getPrescriptionsId();
    const medicine = await MedicinesTest.getMedicineId();

    const response = await supertest(web)
      .patch(`/staff/prescription-items/${item?.id}`)
      .set("SESSION-TOKEN", "token-staff")
      .send({
        prescription_id: prescription?.id,
        medicine_id: medicine?.id,
        dosage: "250 mg",
        frequency: "2 kali sehari",
        duration_days: 10,
        instructions: "Diminum sebelum tidur",
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Data resep obat berhasil diperbarui!");
    expect(response.body.data.dosage).toBe("250 mg");
    expect(response.body.data.frequency).toBe("2 kali sehari");
    expect(response.body.data.duration_days).toBe(10);
    expect(response.body.data.instructions).toBe("Diminum sebelum tidur");
  });

  it("should return error if request is invalid", async () => {
    const item = await PrescriptionItemsTest.getPrescriptionItemsId();
    const medicine = await MedicinesTest.getMedicineId();

    const response = await supertest(web)
      .patch(`/staff/prescription-items/${item?.id}`)
      .set("SESSION-TOKEN", "token-staff")
      .send({
        medicine_id: medicine?.id,
        dosage: "250 mg",
        frequency: "2 kali sehari",
        duration_days: 10,
        instructions: "Diminum sebelum tidur",
        // Missing prescription_id
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors.prescription_id.number).toBe(
      "Resep harus diisi!"
    );
  });

  it("should return error if prescription item not found", async () => {
    const prescription = await PrescriptionsTest.getPrescriptionsId();
    const medicine = await MedicinesTest.getMedicineId();

    const response = await supertest(web)
      .patch(`/staff/prescription-items/99999`)
      .set("SESSION-TOKEN", "token-staff")
      .send({
        prescription_id: prescription?.id,
        medicine_id: medicine?.id,
        dosage: "250 mg",
        frequency: "2 kali sehari",
        duration_days: 10,
        instructions: "Diminum sebelum tidur",
      });

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBe("Data resep obat tidak ditemukan!");
  });

  it("should return error if session is invalid", async () => {
    const item = await PrescriptionItemsTest.getPrescriptionItemsId();
    const prescription = await PrescriptionsTest.getPrescriptionsId();
    const medicine = await MedicinesTest.getMedicineId();

    const response = await supertest(web)
      .patch(`/staff/prescription-items/${item?.id}`)
      .set("SESSION-TOKEN", "invalid_token")
      .send({
        prescription_id: prescription?.id,
        medicine_id: medicine?.id,
        dosage: "250 mg",
        frequency: "2 kali sehari",
        duration_days: 10,
        instructions: "Diminum sebelum tidur",
      });

    expect(response.status).toBe(401);
    expect(response.body.errors).toBe("Unauthorized");
  });

  it("should return error if user doesn't have access", async () => {
    const item = await PrescriptionItemsTest.getPrescriptionItemsId();
    const prescription = await PrescriptionsTest.getPrescriptionsId();
    const medicine = await MedicinesTest.getMedicineId();

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
      .patch(`/staff/prescription-items/${item?.id}`)
      .set("SESSION-TOKEN", "token234")
      .send({
        prescription_id: prescription?.id,
        medicine_id: medicine?.id,
        dosage: "250 mg",
        frequency: "2 kali sehari",
        duration_days: 10,
        instructions: "Diminum sebelum tidur",
      });

    logger.debug(response.body);
    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});

describe("DELETE /staff/prescription-items/:id", () => {
  beforeEach(async () => {
    await PrescriptionItemsTest.deletePrescriptionItems();
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
    await PrescriptionsTest.createPrescriptions();
    await MedicinesTest.createMedicines();
    await PrescriptionItemsTest.createPrescriptionItems();
  });

  afterEach(async () => {
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

  it("should delete an existing prescription item", async () => {
    const item = await PrescriptionItemsTest.getPrescriptionItemsId();
    const response = await supertest(web)
      .delete(`/staff/prescription-items/${item?.id}`)
      .set("SESSION-TOKEN", "token-staff");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Data resep obat berhasil dihapus!");
  });

  it("should return error if prescription item not found", async () => {
    const response = await supertest(web)
      .delete(`/staff/prescription-items/99999`)
      .set("SESSION-TOKEN", "token-staff");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBe("Data resep obat tidak ditemukan!");
  });

  it("should return error if session is invalid", async () => {
    const item = await PrescriptionItemsTest.getPrescriptionItemsId();
    const response = await supertest(web)
      .delete(`/staff/prescription-items/${item?.id}`)
      .set("SESSION-TOKEN", "invalid_token");

    expect(response.status).toBe(401);
    expect(response.body.errors).toBe("Unauthorized");
  });

  it("should return error if user doesn't have access", async () => {
    const item = await PrescriptionItemsTest.getPrescriptionItemsId();
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
      .delete(`/staff/prescription-items/${item?.id}`)
      .set("SESSION-TOKEN", "token234");

    logger.debug(response.body);
    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});
