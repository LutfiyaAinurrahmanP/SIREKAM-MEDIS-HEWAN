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
    await PetsTest.deletePets();
    await AnimalTypesTest.deleteAnimalTypes();
    await UserTest.deleteUser();
  });
  it("should can create medicines data", async () => {
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
    expect(response.body.data.name).toBe("Amoxicillin 500mg");
    expect(response.body.data.code).toBe("OBT-AX500");
    expect(response.body.data.type).toBe("tablets");
    expect(response.body.data.unit).toBe("pcs");
    expect(response.body.data.stock_qty).toBe(120);
    expect(response.body.data.price).toBe(7500);
    expect(response.body.data.is_active).toBe(true);
  });

  it("should error if request is invalid", async () => {
    const response = await supertest(web)
      .post("/admin/medicines")
      .set("SESSION-TOKEN", "token123")
      .send({
        name: "",
        code: "",
        type: "",
        unit: "",
        stock_qty: "",
        price: "",
        is_active: "",
      });
    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors.name.required).toBe("Nama obat harus diisi!");
    expect(response.body.errors.code.required).toBe("Kode obat harus diisi!");
    expect(response.body.errors.type.enum).toBe("Tipe obat harus diisi!");
    expect(response.body.errors.unit.enum).toBe("Unit obat harus diisi!");
    expect(response.body.errors.stock_qty.number).toBe(
      "Stok harus berupa angka!"
    );
    expect(response.body.errors.price.number).toBe("Harga harus berupa angka!");
    expect(response.body.errors.is_active.boolean).toBe(
      "Status keaktifan harus berupa aktif atau tidak aktif!"
    );
  });

  it("should error if role is not admin", async () => {
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
  it("should error if token is invalid", async () => {
    const response = await supertest(web)
      .post("/admin/medicines")
      .set("SESSION-TOKEN", "token999")
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
});
