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

describe("POST /admin/medicines", () => {
  beforeEach(async () => {
    await MedicinesTest.deleteMedicines();
    await PetsTest.deletePets();
    await AnimalTypesTest.deleteAnimalTypes();
    await UserTest.deleteUser();
    await UserTest.createUser();
  });
  afterEach(async () => {
    await MedicinesTest.deleteMedicines();
    await UserTest.deleteUser();
  });

  it("should create a new medicine", async () => {
    const response = await supertest(web)
      .post("/admin/medicines")
      .set("SESSION-TOKEN", "token123")
      .send({
        name: "Amoxicillin 500mg",
        code: "OBT-AX500",
        type: "tablets",
        unit: "pcs",
        stock_qty: 120,
        price: 7500,
        is_active: true,
      });
    logger.debug(response.body);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Data obat berhasil dibuat!");
    expect(response.body.data.name).toBe("Amoxicillin 500mg");
    expect(response.body.data.code).toBe("OBT-AX500");
    expect(response.body.data.type).toBe("tablets");
    expect(response.body.data.unit).toBe("pcs");
    expect(response.body.data.stock_qty).toBe(120);
    expect(response.body.data.price).toBe(7500);
    expect(response.body.data.is_active).toBe(true);
  });

  it("should return error if medicine code already exists", async () => {
    await supertest(web)
      .post("/admin/medicines")
      .set("SESSION-TOKEN", "token123")
      .send({
        name: "Amoxicillin 500mg",
        code: "OBT-AX500",
        type: "tablets",
        unit: "pcs",
        stock_qty: 120,
        price: 7500,
        is_active: true,
      });
    const response = await supertest(web)
      .post("/admin/medicines")
      .set("SESSION-TOKEN", "token123")
      .send({
        name: "Paracetamol 500mg",
        code: "OBT-AX500",
        type: "tablets",
        unit: "pcs",
        stock_qty: 200,
        price: 1500,
        is_active: true,
      });
    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors.code.unique).toBe("Kode obat sudah dipakai!");
  });

  it("should return error if name is required", async () => {
    const response = await supertest(web)
      .post("/admin/medicines")
      .set("SESSION-TOKEN", "token123")
      .send({
        name: "",
        code: "OBT-AX500",
        type: "tablets",
        unit: "pcs",
        stock_qty: 120,
        price: 7500,
        is_active: true,
      });

    logger.debug(response.body);

    expect(response.status).toBe(400);
    expect(response.body.errors.name.required).toBe("Nama obat harus diisi!");
  });

  it("should return error if name is too short", async () => {
    const response = await supertest(web)
      .post("/admin/medicines")
      .set("SESSION-TOKEN", "token123")
      .send({
        name: "Abc",
        code: "OBT-AX500",
        type: "tablets",
        unit: "pcs",
        stock_qty: 120,
        price: 7500,
        is_active: true,
      });

    expect(response.status).toBe(400);
    expect(response.body.errors.name.min).toBe(
      "Nama obat memiliki minimal 5 karakter!"
    );
  });

  it("should return error if code is required", async () => {
    const response = await supertest(web)
      .post("/admin/medicines")
      .set("SESSION-TOKEN", "token123")
      .send({
        name: "Amoxicillin 500mg",
        code: "",
        type: "tablets",
        unit: "pcs",
        stock_qty: 120,
        price: 7500,
        is_active: true,
      });

    expect(response.status).toBe(400);
    expect(response.body.errors.code.required).toBe("Kode obat harus diisi!");
  });

  it("should return error if stock_qty is not numeric", async () => {
    const response = await supertest(web)
      .post("/admin/medicines")
      .set("SESSION-TOKEN", "token123")
      .send({
        name: "Amoxicillin 500mg",
        code: "OBT-AX500",
        type: "tablets",
        unit: "pcs",
        stock_qty: "invalid",
        price: 7500,
        is_active: true,
      });

    expect(response.status).toBe(400);
    expect(response.body.errors.stock_qty.number).toBe(
      "Stok harus berupa angka!"
    );
  });

  it("should return error if price is not numeric", async () => {
    const response = await supertest(web)
      .post("/admin/medicines")
      .set("SESSION-TOKEN", "token123")
      .send({
        name: "Amoxicillin 500mg",
        code: "OBT-AX500",
        type: "tablets",
        unit: "pcs",
        stock_qty: 120,
        price: "invalid",
        is_active: true,
      });

    expect(response.status).toBe(400);
    expect(response.body.errors.price.number).toBe("Harga harus berupa angka!");
  });

  it("should return error if is_active is not boolean", async () => {
    const response = await supertest(web)
      .post("/admin/medicines")
      .set("SESSION-TOKEN", "token123")
      .send({
        name: "Amoxicillin 500mg",
        code: "OBT-AX500",
        type: "tablets",
        unit: "pcs",
        stock_qty: 120,
        price: 7500,
        is_active: "invalid",
      });

    expect(response.status).toBe(400);
    expect(response.body.errors.is_active.boolean).toBe(
      "Status keaktifan harus berupa aktif atau tidak aktif!"
    );
  });

  it("should return error if not authorized", async () => {
    const response = await supertest(web)
      .post("/admin/medicines")
      .set("SESSION-TOKEN", "invalid_token")
      .send({
        name: "Amoxicillin 500mg",
        code: "OBT-AX500",
        type: "tablets",
        unit: "pcs",
        stock_qty: 120,
        price: 7500,
        is_active: true,
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
      .post("/admin/medicines")
      .set("SESSION-TOKEN", "token234")
      .send({
        name: "Amoxicillin 500mg",
        code: "OBT-AX500",
        type: "tablets",
        unit: "pcs",
        stock_qty: 120,
        price: 7500,
        is_active: true,
      });

    logger.debug(response.body);

    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});

describe("GET /admin/medicines", () => {
  beforeEach(async () => {
    await UserTest.createUser();
    await MedicinesTest.createMedicines();
  });
  afterEach(async () => {
    await MedicinesTest.deleteMedicines();
    await UserTest.deleteUser();
  });

  it("should return a list of medicines", async () => {
    const response = await supertest(web)
      .get("/admin/medicines")
      .set("SESSION-TOKEN", "token123");

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(2);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it("should return error if not authorized", async () => {
    const response = await supertest(web)
      .get("/admin/medicines")
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
      .get("/admin/medicines")
      .set("SESSION-TOKEN", "token234");

    logger.debug(response.body);

    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
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
      .get(`/admin/medicines`)
      .set("SESSION-TOKEN", "token234");

    logger.debug(response.body);
    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});

describe("GET /admin/medicines/:id", () => {
  beforeEach(async () => {
    await UserTest.createUser();
    await MedicinesTest.createMedicines();
  });
  afterEach(async () => {
    await MedicinesTest.deleteMedicines();
    await UserTest.deleteUser();
  });

  it("should get an existing medicine", async () => {
    const medicine = await MedicinesTest.getMedicineId();
    const response = await supertest(web)
      .get(`/admin/medicines/${medicine?.id}`)
      .set("SESSION-TOKEN", "token123");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe("Amoxicillin 500mg");
    expect(response.body.data.code).toBe("OBT-AX500");
    expect(response.body.data.type).toBe("tablets");
  });

  it("should return error if medicine not found", async () => {
    const response = await supertest(web)
      .get(`/admin/medicines/99999`)
      .set("SESSION-TOKEN", "token123");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors.empty).toBe("Data obat tidak ditemukan!");
  });

  it("should return error if not authorized", async () => {
    const medicine = await MedicinesTest.getMedicineId();
    const response = await supertest(web)
      .get(`/admin/medicines/${medicine?.id}`)
      .set("SESSION-TOKEN", "invalid_token");

    expect(response.status).toBe(401);
    expect(response.body.errors.session).toBe(
      "Sesi tidak valid atau kadaluarsa!"
    );
  });

  it("should return error if user doesn't have access", async () => {
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
      .get(`/admin/medicines/${medicine?.id}`)
      .set("SESSION-TOKEN", "token234");

    logger.debug(response.body);

    expect(response.status).toBe(403);
    expect(response.body.errors.auth).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});

describe("PATCH /admin/medicines/:id", () => {
  beforeEach(async () => {
    await UserTest.createUser();
    await MedicinesTest.createMedicines();
  });
  afterEach(async () => {
    await MedicinesTest.deleteMedicines();
    await UserTest.deleteUser();
  });

  it("should update an existing medicine", async () => {
    const medicine = await MedicinesTest.getMedicineId();
    const response = await supertest(web)
      .patch(`/admin/medicines/${medicine?.id}`)
      .set("SESSION-TOKEN", "token123")
      .send({
        name: "Paracetamol 500mg",
        code: "OBT-PC500",
        type: "tablet",
        unit: "Tablet",
        stock_qty: 200,
        price: 1500,
        is_active: false,
      });

    logger.debug(response.body);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Data obat berhasil diperbarui!");
    expect(response.body.data.name).toBe("Paracetamol 500mg");
    expect(response.body.data.code).toBe("OBT-PC500");
    expect(response.body.data.type).toBe("tablet");
    expect(response.body.data.stock_qty).toBe(200);
    expect(response.body.data.price).toBe(1500);
    expect(response.body.data.is_active).toBe(false);
  });

  it("should return error if request is invalid", async () => {
    const medicine = await MedicinesTest.getMedicineId();
    const response = await supertest(web)
      .patch(`/admin/medicines/${medicine?.id}`)
      .set("SESSION-TOKEN", "token123")
      .send({
        name: "",
        code: "OBT-PC500",
        type: "tablet",
        unit: "Tablet",
        stock_qty: 200,
        price: 1500,
        is_active: true,
      });

    logger.debug(response.body);

    expect(response.status).toBe(400);
    expect(response.body.errors.name.required).toBe("Nama obat harus diisi!");
  });

  it("should return error if medicine not found", async () => {
    const response = await supertest(web)
      .patch(`/admin/medicines/99999`)
      .set("SESSION-TOKEN", "token123")
      .send({
        name: "Paracetamol 500mg",
        code: "OBT-PC500",
        type: "tablet",
        unit: "Tablet",
        stock_qty: 200,
        price: 1500,
        is_active: true,
      });

    logger.debug(response.body);

    expect(response.status).toBe(404);
    expect(response.body.errors.empty).toBe("Data obat tidak ditemukan!");
  });

  it("should return error if not authorized", async () => {
    const medicine = await MedicinesTest.getMedicineId();
    const response = await supertest(web)
      .patch(`/admin/medicines/${medicine?.id}`)
      .set("SESSION-TOKEN", "invalid_token")
      .send({
        name: "Paracetamol 500mg",
        code: "OBT-PC500",
        type: "tablet",
        unit: "Tablet",
        stock_qty: 200,
        price: 1500,
        is_active: true,
      });

    expect(response.status).toBe(401);
    expect(response.body.errors.session).toBe(
      "Sesi tidak valid atau kadaluarsa!"
    );
  });

  it("should return error if user doesn't have access", async () => {
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
      .patch(`/admin/medicines/${medicine?.id}`)
      .set("SESSION-TOKEN", "token234")
      .send({
        name: "Paracetamol 500mg",
        code: "OBT-PC500",
        type: "tablet",
        unit: "Tablet",
        stock_qty: 200,
        price: 1500,
        is_active: true,
      });

    logger.debug(response.body);

    expect(response.status).toBe(403);
    expect(response.body.errors.auth).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});

describe("DELETE /admin/medicines/:id", () => {
  beforeEach(async () => {
    await UserTest.createUser();
    await MedicinesTest.createMedicines();
  });
  afterEach(async () => {
    await MedicinesTest.deleteMedicines();
    await UserTest.deleteUser();
  });

  it("should delete an existing medicine", async () => {
    const medicine = await MedicinesTest.getMedicineId();
    const response = await supertest(web)
      .delete(`/admin/medicines/${medicine?.id}`)
      .set("SESSION-TOKEN", "token123");

    logger.debug(response.body);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Data obat berhasil dihapus!");
  });

  it("should return error if medicine not found", async () => {
    const response = await supertest(web)
      .delete(`/admin/medicines/99999`)
      .set("SESSION-TOKEN", "token123");

    logger.debug(response.body);

    expect(response.status).toBe(404);
    expect(response.body.errors.empty).toBe("Data obat tidak ditemukan!");
  });

  it("should return error if not authorized", async () => {
    const medicine = await MedicinesTest.getMedicineId();
    const response = await supertest(web)
      .delete(`/admin/medicines/${medicine?.id}`)
      .set("SESSION-TOKEN", "invalid_token");

    expect(response.status).toBe(401);
    expect(response.body.errors.session).toBe(
      "Sesi tidak valid atau kadaluarsa!"
    );
  });

  it("should return error if user doesn't have access", async () => {
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
      .delete(`/admin/medicines/${medicine?.id}`)
      .set("SESSION-TOKEN", "token234");

    logger.debug(response.body);

    expect(response.status).toBe(403);
    expect(response.body.errors.auth).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});
