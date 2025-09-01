import supertest from "supertest";
import {
  UserTest,
  PetsTest,
  MedicalRecordsTest,
  TransactionsTest,
  AnimalTypesTest,
  AppointmentsTest,
  PrescriptionItemsTest,
  PrescriptionsTest,
  ServiceCategoriesTest,
  MedicinesTest,
} from "./test-util";
import { web } from "../src/backend/application/web";
import { logger } from "../src/backend/application/logging";
import { prismaClient } from "../src/backend/application/database";
import bcrypt from "bcrypt";

describe("POST /staff/transactions", () => {
  beforeEach(async () => {
    await TransactionsTest.deleteTransactions();
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

  it("should create a new transaction", async () => {
    const user = await UserTest.getUserId();
    const pet = await PetsTest.getPetsId();
    const medicalRecord = await MedicalRecordsTest.getMedicalRecordsId();

    const response = await supertest(web)
      .post("/staff/transactions")
      .set("SESSION-TOKEN", "token-staff")
      .send({
        created_by: user?.id,
        pet_id: pet?.id,
        medical_record_id: medicalRecord?.id,
        total_amount: 280000.0,
        paid_amount: 300000.0,
        payment_status: "pending",
        payment_method: "cash",
        invoice_date: new Date("2025-08-17"),
        notes: "Perhatikan perkembangan kesehatan hewan peliharaan",
      });

    logger.debug(response.body);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Data transaksi berhasil dibuat!");
    expect(response.body.data.created_by).toBe(user?.id);
    expect(response.body.data.pet_id).toBe(pet?.id);
    expect(response.body.data.medical_record_id).toBe(medicalRecord?.id);
    expect(response.body.data.total_amount).toBe(280000.0);
    expect(response.body.data.paid_amount).toBe(300000.0);
    expect(response.body.data.payment_status).toBe("pending");
    expect(response.body.data.payment_method).toBe("cash");
    expect(response.body.data.invoice_date).toBe("2025-08-17T00:00:00.000Z");
    expect(response.body.data.notes).toBe(
      "Perhatikan perkembangan kesehatan hewan peliharaan"
    );
  });

  it("should return error if created_by is required", async () => {
    const pet = await PetsTest.getPetsId();
    const medicalRecord = await MedicalRecordsTest.getMedicalRecordsId();

    const response = await supertest(web)
      .post("/staff/transactions")
      .set("SESSION-TOKEN", "token-staff")
      .send({
        pet_id: pet?.id,
        medical_record_id: medicalRecord?.id,
        total_amount: 280000.0,
        paid_amount: 300000.0,
        payment_status: "pending",
        payment_method: "cash",
        invoice_date: "2025-08-17",
        notes: "Perhatikan perkembangan kesehatan hewan peliharaan",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors.created_by.number).toBe(
      "Pembuat transaksi harus diisi!"
    );
  });

  it("should return error if pet_id is required", async () => {
    const user = await UserTest.getUserId();
    const medicalRecord = await MedicalRecordsTest.getMedicalRecordsId();

    const response = await supertest(web)
      .post("/staff/transactions")
      .set("SESSION-TOKEN", "token-staff")
      .send({
        created_by: user?.id,
        medical_record_id: medicalRecord?.id,
        total_amount: 280000.0,
        paid_amount: 300000.0,
        payment_status: "pending",
        payment_method: "cash",
        invoice_date: "2025-08-17",
        notes: "Perhatikan perkembangan kesehatan hewan peliharaan",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors.pet_id.number).toBe(
      "Hewan peliharaan harus diisi!"
    );
  });

  it("should return error if total_amount is required", async () => {
    const user = await UserTest.getUserId();
    const pet = await PetsTest.getPetsId();
    const medicalRecord = await MedicalRecordsTest.getMedicalRecordsId();

    const response = await supertest(web)
      .post("/staff/transactions")
      .set("SESSION-TOKEN", "token-staff")
      .send({
        created_by: user?.id,
        pet_id: pet?.id,
        medical_record_id: medicalRecord?.id,
        paid_amount: 300000.0,
        payment_status: "pending",
        payment_method: "cash",
        invoice_date: "2025-08-17",
        notes: "Perhatikan perkembangan kesehatan hewan peliharaan",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors.total_amount.number).toBe(
      "Total biaya harus berupa angka!"
    );
  });

  it("should return error if total_amount is not numeric", async () => {
    const user = await UserTest.getUserId();
    const pet = await PetsTest.getPetsId();
    const medicalRecord = await MedicalRecordsTest.getMedicalRecordsId();

    const response = await supertest(web)
      .post("/staff/transactions")
      .set("SESSION-TOKEN", "token-staff")
      .send({
        created_by: user?.id,
        pet_id: pet?.id,
        medical_record_id: medicalRecord?.id,
        total_amount: "not_a_number",
        paid_amount: 300000.0,
        payment_status: "pending",
        payment_method: "cash",
        invoice_date: "2025-08-17",
        notes: "Perhatikan perkembangan kesehatan hewan peliharaan",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors.total_amount.number).toBe(
      "Total biaya harus berupa angka!"
    );
  });

  it("should return error if paid_amount is required", async () => {
    const user = await UserTest.getUserId();
    const pet = await PetsTest.getPetsId();
    const medicalRecord = await MedicalRecordsTest.getMedicalRecordsId();

    const response = await supertest(web)
      .post("/staff/transactions")
      .set("SESSION-TOKEN", "token-staff")
      .send({
        created_by: user?.id,
        pet_id: pet?.id,
        medical_record_id: medicalRecord?.id,
        total_amount: 280000.0,
        payment_status: "pending",
        payment_method: "cash",
        invoice_date: "2025-08-17",
        notes: "Perhatikan perkembangan kesehatan hewan peliharaan",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors.paid_amount.number).toBe(
      "Biaya transaksi harus berupa angka!"
    );
  });

  it("should return error if paid_amount is not numeric", async () => {
    const user = await UserTest.getUserId();
    const pet = await PetsTest.getPetsId();
    const medicalRecord = await MedicalRecordsTest.getMedicalRecordsId();

    const response = await supertest(web)
      .post("/staff/transactions")
      .set("SESSION-TOKEN", "token-staff")
      .send({
        created_by: user?.id,
        pet_id: pet?.id,
        medical_record_id: medicalRecord?.id,
        total_amount: 280000.0,
        paid_amount: "not_a_number",
        payment_status: "pending",
        payment_method: "cash",
        invoice_date: "2025-08-17",
        notes: "Perhatikan perkembangan kesehatan hewan peliharaan",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors.paid_amount.number).toBe(
      "Biaya transaksi harus berupa angka!"
    );
  });

  it("should return error if payment_status is required", async () => {
    const user = await UserTest.getUserId();
    const pet = await PetsTest.getPetsId();
    const medicalRecord = await MedicalRecordsTest.getMedicalRecordsId();

    const response = await supertest(web)
      .post("/staff/transactions")
      .set("SESSION-TOKEN", "token-staff")
      .send({
        created_by: user?.id,
        pet_id: pet?.id,
        medical_record_id: medicalRecord?.id,
        total_amount: 280000.0,
        paid_amount: 300000.0,
        payment_method: "cash",
        invoice_date: "2025-08-17",
        notes: "Perhatikan perkembangan kesehatan hewan peliharaan",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors.payment_status.enum).toBe(
      "Status pembayaran harus diisi!"
    );
  });

  it("should return error if payment_method is required", async () => {
    const user = await UserTest.getUserId();
    const pet = await PetsTest.getPetsId();
    const medicalRecord = await MedicalRecordsTest.getMedicalRecordsId();

    const response = await supertest(web)
      .post("/staff/transactions")
      .set("SESSION-TOKEN", "token-staff")
      .send({
        created_by: user?.id,
        pet_id: pet?.id,
        medical_record_id: medicalRecord?.id,
        total_amount: 280000.0,
        paid_amount: 300000.0,
        payment_status: "pending",
        invoice_date: "2025-08-17",
        notes: "Perhatikan perkembangan kesehatan hewan peliharaan",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors.payment_method.enum).toBe(
      "Metode pembayaran harus diisi!"
    );
  });

  it("should return error if invoice_date is required", async () => {
    const user = await UserTest.getUserId();
    const pet = await PetsTest.getPetsId();
    const medicalRecord = await MedicalRecordsTest.getMedicalRecordsId();

    const response = await supertest(web)
      .post("/staff/transactions")
      .set("SESSION-TOKEN", "token-staff")
      .send({
        created_by: user?.id,
        pet_id: pet?.id,
        medical_record_id: medicalRecord?.id,
        total_amount: 280000.0,
        paid_amount: 300000.0,
        payment_status: "pending",
        payment_method: "cash",
        notes: "Perhatikan perkembangan kesehatan hewan peliharaan",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors.invoice_date.string).toBe(
      "Tanggal transaksi harus diisi!"
    );
  });

  it("should return error if session is invalid", async () => {
    const user = await UserTest.getUserId();
    const pet = await PetsTest.getPetsId();
    const medicalRecord = await MedicalRecordsTest.getMedicalRecordsId();

    const response = await supertest(web)
      .post("/staff/transactions")
      .set("SESSION-TOKEN", "invalid_token")
      .send({
        created_by: user?.id,
        pet_id: pet?.id,
        medical_record_id: medicalRecord?.id,
        total_amount: 280000.0,
        paid_amount: 300000.0,
        payment_status: "pending",
        payment_method: "cash",
        invoice_date: "2025-08-17",
        notes: "Perhatikan perkembangan kesehatan hewan peliharaan",
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
    const pet = await PetsTest.getPetsId();
    const medicalRecord = await MedicalRecordsTest.getMedicalRecordsId();

    const response = await supertest(web)
      .post("/staff/transactions")
      .set("SESSION-TOKEN", "token234")
      .send({
        created_by: user?.id,
        pet_id: pet?.id,
        medical_record_id: medicalRecord?.id,
        total_amount: 280000.0,
        paid_amount: 300000.0,
        payment_status: "pending",
        payment_method: "cash",
        invoice_date: "2025-08-17",
        notes: "Perhatikan perkembangan kesehatan hewan peliharaan",
      });

    logger.debug(response.body);
    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});

describe("GET /staff/transactions", () => {
  beforeEach(async () => {
    await UserTest.createUser();
    await AnimalTypesTest.createAnimalTypes();
    await PetsTest.createPets();
    await ServicesTest.createServices();
    await AppointmentsTest.createAppointments();
    await MedicalRecordsTest.createMedicalRecords();
    await TransactionsTest.createTransactions();
  });

  afterEach(async () => {
    await TransactionsTest.deleteTransactions();
    await MedicalRecordsTest.deleteMedicalRecords();
    await AppointmentsTest.deleteAppointments();
    await ServicesTest.deleteServices();
    await PetsTest.deletePets();
    await AnimalTypesTest.deleteAnimalTypes();
    await UserTest.deleteUser();
  });

  it("should return a list of transactions", async () => {
    const response = await supertest(web)
      .get("/staff/transactions")
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
      .get("/staff/transactions")
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
      .get("/staff/transactions")
      .set("SESSION-TOKEN", "token234");

    logger.debug(response.body);
    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});

describe("GET /staff/transactions/:id", () => {
  beforeEach(async () => {
    await UserTest.createUser();
    await UserTest.createUser();
    await AnimalTypesTest.createAnimalTypes();
    await PetsTest.createPets();
    await ServicesTest.createServices();
    await AppointmentsTest.createAppointments();
    await MedicalRecordsTest.createMedicalRecords();
    await TransactionsTest.createTransactions();
  });

  afterEach(async () => {
    await TransactionsTest.deleteTransactions();
    await MedicalRecordsTest.deleteMedicalRecords();
    await AppointmentsTest.deleteAppointments();
    await ServicesTest.deleteServices();
    await PetsTest.deletePets();
    await AnimalTypesTest.deleteAnimalTypes();
    await UserTest.deleteUser();
  });

  it("should get an existing transaction", async () => {
    const transaction = await TransactionsTest.getTransactionsId();
    const response = await supertest(web)
      .get(`/staff/transactions/${transaction?.id}`)
      .set("SESSION-TOKEN", "token-staff");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(transaction?.id);
    expect(response.body.data.created_by).toBeDefined();
    expect(response.body.data.pet_id).toBeDefined();
    expect(response.body.data.total_amount).toBeDefined();
    expect(response.body.data.paid_amount).toBeDefined();
    expect(response.body.data.payment_status).toBeDefined();
    expect(response.body.data.payment_method).toBeDefined();
    expect(response.body.data.invoice_date).toBeDefined();
  });

  it("should return error if transaction not found", async () => {
    const response = await supertest(web)
      .get(`/staff/transactions/99999`)
      .set("SESSION-TOKEN", "token-staff");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBe("Data transaksi tidak ditemukan!");
  });

  it("should return error if session is invalid", async () => {
    const transaction = await TransactionsTest.getTransactionsId();
    const response = await supertest(web)
      .get(`/staff/transactions/${transaction?.id}`)
      .set("SESSION-TOKEN", "invalid_token");

    expect(response.status).toBe(401);
    expect(response.body.errors).toBe("Unauthorized");
  });

  it("should return error if user doesn't have access", async () => {
    const transaction = await TransactionsTest.getTransactionsId();
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
      .get(`/staff/transactions/${transaction?.id}`)
      .set("SESSION-TOKEN", "token234");

    logger.debug(response.body);
    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});

describe("PATCH /staff/transactions/:id", () => {
  beforeEach(async () => {
    await UserTest.createUser();
    await UserTest.createUser();
    await AnimalTypesTest.createAnimalTypes();
    await PetsTest.createPets();
    await ServicesTest.createServices();
    await AppointmentsTest.createAppointments();
    await MedicalRecordsTest.createMedicalRecords();
    await TransactionsTest.createTransactions();
  });

  afterEach(async () => {
    await TransactionsTest.deleteTransactions();
    await MedicalRecordsTest.deleteMedicalRecords();
    await AppointmentsTest.deleteAppointments();
    await ServicesTest.deleteServices();
    await PetsTest.deletePets();
    await AnimalTypesTest.deleteAnimalTypes();
    await UserTest.deleteUser();
  });

  it("should update an existing transaction", async () => {
    const transaction = await TransactionsTest.getTransactionsId();
    const user = await UserTest.getUserId();
    const pet = await PetsTest.getPetsId();
    const medicalRecord = await MedicalRecordsTest.getMedicalRecordsId();

    const response = await supertest(web)
      .patch(`/staff/transactions/${transaction?.id}`)
      .set("SESSION-TOKEN", "token-staff")
      .send({
        created_by: user?.id,
        pet_id: pet?.id,
        medical_record_id: medicalRecord?.id,
        total_amount: 320000.0,
        paid_amount: 350000.0,
        payment_status: "paid",
        payment_method: "transfer",
        invoice_date: new Date("2025-08-18"),
        notes: "Transaksi berhasil diselesaikan",
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Data transaksi berhasil diperbarui!");
    expect(response.body.data.total_amount).toBe(320000.0);
    expect(response.body.data.paid_amount).toBe(350000.0);
    expect(response.body.data.payment_status).toBe("paid");
    expect(response.body.data.payment_method).toBe("transfer");
    expect(response.body.data.invoice_date).toBe("2025-08-18T00:00:00.000Z");
    expect(response.body.data.notes).toBe("Transaksi berhasil diselesaikan");
  });

  it("should return error if request is invalid", async () => {
    const transaction = await TransactionsTest.getTransactionsId();
    const pet = await PetsTest.getPetsId();
    const medicalRecord = await MedicalRecordsTest.getMedicalRecordsId();

    const response = await supertest(web)
      .patch(`/staff/transactions/${transaction?.id}`)
      .set("SESSION-TOKEN", "token-staff")
      .send({
        pet_id: pet?.id,
        medical_record_id: medicalRecord?.id,
        total_amount: 320000.0,
        paid_amount: 350000.0,
        payment_status: "paid",
        payment_method: "transfer",
        invoice_date: "2025-08-18",
        notes: "Transaksi berhasil diselesaikan",
        // Missing created_by
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors.created_by.number).toBe(
      "Pembuat transaksi harus diisi!"
    );
  });

  it("should return error if transaction not found", async () => {
    const user = await UserTest.getUserId();
    const pet = await PetsTest.getPetsId();
    const medicalRecord = await MedicalRecordsTest.getMedicalRecordsId();

    const response = await supertest(web)
      .patch(`/staff/transactions/99999`)
      .set("SESSION-TOKEN", "token-staff")
      .send({
        created_by: user?.id,
        pet_id: pet?.id,
        medical_record_id: medicalRecord?.id,
        total_amount: 320000.0,
        paid_amount: 350000.0,
        payment_status: "paid",
        payment_method: "transfer",
        invoice_date: "2025-08-18",
        notes: "Transaksi berhasil diselesaikan",
      });

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBe("Data transaksi tidak ditemukan!");
  });

  it("should return error if session is invalid", async () => {
    const transaction = await TransactionsTest.getTransactionsId();
    const user = await UserTest.getUserId();
    const pet = await PetsTest.getPetsId();
    const medicalRecord = await MedicalRecordsTest.getMedicalRecordsId();

    const response = await supertest(web)
      .patch(`/staff/transactions/${transaction?.id}`)
      .set("SESSION-TOKEN", "invalid_token")
      .send({
        created_by: user?.id,
        pet_id: pet?.id,
        medical_record_id: medicalRecord?.id,
        total_amount: 320000.0,
        paid_amount: 350000.0,
        payment_status: "paid",
        payment_method: "transfer",
        invoice_date: "2025-08-18",
        notes: "Transaksi berhasil diselesaikan",
      });

    expect(response.status).toBe(401);
    expect(response.body.errors).toBe("Unauthorized");
  });

  it("should return error if user doesn't have access", async () => {
    const transaction = await TransactionsTest.getTransactionsId();
    const user = await UserTest.getUserId();
    const pet = await PetsTest.getPetsId();
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
      .patch(`/staff/transactions/${transaction?.id}`)
      .set("SESSION-TOKEN", "token234")
      .send({
        created_by: user?.id,
        pet_id: pet?.id,
        medical_record_id: medicalRecord?.id,
        total_amount: 320000.0,
        paid_amount: 350000.0,
        payment_status: "paid",
        payment_method: "transfer",
        invoice_date: "2025-08-18",
        notes: "Transaksi berhasil diselesaikan",
      });

    logger.debug(response.body);
    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});

describe("DELETE /staff/transactions/:id", () => {
  beforeEach(async () => {
    await UserTest.createUser();
    await UserTest.createUser();
    await AnimalTypesTest.createAnimalTypes();
    await PetsTest.createPets();
    await ServicesTest.createServices();
    await AppointmentsTest.createAppointments();
    await MedicalRecordsTest.createMedicalRecords();
    await TransactionsTest.createTransactions();
  });

  afterEach(async () => {
    await TransactionsTest.deleteTransactions();
    await MedicalRecordsTest.deleteMedicalRecords();
    await AppointmentsTest.deleteAppointments();
    await ServicesTest.deleteServices();
    await PetsTest.deletePets();
    await AnimalTypesTest.deleteAnimalTypes();
    await UserTest.deleteUser();
  });

  it("should delete an existing transaction", async () => {
    const transaction = await TransactionsTest.getTransactionsId();
    const response = await supertest(web)
      .delete(`/staff/transactions/${transaction?.id}`)
      .set("SESSION-TOKEN", "token-staff");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Data transaksi berhasil dihapus!");
  });

  it("should return error if transaction not found", async () => {
    const response = await supertest(web)
      .delete(`/staff/transactions/99999`)
      .set("SESSION-TOKEN", "token-staff");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBe("Data transaksi tidak ditemukan!");
  });

  it("should return error if session is invalid", async () => {
    const transaction = await TransactionsTest.getTransactionsId();
    const response = await supertest(web)
      .delete(`/staff/transactions/${transaction?.id}`)
      .set("SESSION-TOKEN", "invalid_token");

    expect(response.status).toBe(401);
    expect(response.body.errors).toBe("Unauthorized");
  });

  it("should return error if user doesn't have access", async () => {
    const transaction = await TransactionsTest.getTransactionsId();
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
      .delete(`/staff/transactions/${transaction?.id}`)
      .set("SESSION-TOKEN", "token234");

    logger.debug(response.body);
    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});
