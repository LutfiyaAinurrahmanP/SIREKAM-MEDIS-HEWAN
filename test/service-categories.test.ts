import supertest from "supertest";
import {
  AnimalTypesTest,
  MedicinesTest,
  PetsTest,
  ServiceCategoriesTest,
  UserTest,
} from "./test-util";
import { web } from "../src/backend/application/web";
import { logger } from "../src/backend/application/logging";
import { prismaClient } from "../src/backend/application/database";
import bcrypt from "bcrypt";

describe("POST /admin/service-categories", () => {
  beforeEach(async () => {
    await ServiceCategoriesTest.deleteServiceCategories();
    await MedicinesTest.deleteMedicines();
    await PetsTest.deletePets();
    await AnimalTypesTest.deleteAnimalTypes();
    await UserTest.deleteUser();
    await UserTest.createUser();
  });
  afterEach(async () => {
    await ServiceCategoriesTest.deleteServiceCategories();
    await UserTest.deleteUser();
  });

  it("should create a new service category", async () => {
    const response = await supertest(web)
      .post("/admin/service-categories")
      .set("SESSION-TOKEN", "token123")
      .send({
        name: "Konsultasi Umum",
        description: "Pemeriksaan dasar hewan peliharaan oleh dokter hewan",
        price: 75000.0,
        is_active: true,
      });
    logger.debug(response.body);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Data jenis layanan berhasil dibuat!");
    expect(response.body.data.name).toBe("Konsultasi Umum");
    expect(response.body.data.description).toBe(
      "Pemeriksaan dasar hewan peliharaan oleh dokter hewan"
    );
    expect(response.body.data.price).toBe(75000.0);
    expect(response.body.data.is_active).toBe(true);
  });

  it("should return error if name is required", async () => {
    const response = await supertest(web)
      .post("/admin/service-categories")
      .set("SESSION-TOKEN", "token123")
      .send({
        name: "",
        description: "Pemeriksaan dasar hewan peliharaan oleh dokter hewan",
        price: 75000.0,
        is_active: true,
      });

    logger.debug(response.body);

    expect(response.status).toBe(400);
    expect(response.body.errors.name.required).toBe(
      "Nama jenis layanan harus diisi!"
    );
  });

  it("should return error if name is too short", async () => {
    const response = await supertest(web)
      .post("/admin/service-categories")
      .set("SESSION-TOKEN", "token123")
      .send({
        name: "Abc",
        description: "Pemeriksaan dasar hewan peliharaan oleh dokter hewan",
        price: 75000.0,
        is_active: true,
      });

    expect(response.status).toBe(400);
    expect(response.body.errors.name.min).toBe(
      "Nama jenis layanan memiliki minimal 5 karakter!"
    );
  });

  it("should return error if price is required", async () => {
    const response = await supertest(web)
      .post("/admin/service-categories")
      .set("SESSION-TOKEN", "token123")
      .send({
        name: "Konsultasi Umum",
        description: "Pemeriksaan dasar hewan peliharaan oleh dokter hewan",
        price: -1,
        is_active: true,
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors.price.min).toBe(
      "Harga layanan tidak boleh kurang dari 0!"
    );
  });

  it("should return error if price is not numeric", async () => {
    const response = await supertest(web)
      .post("/admin/service-categories")
      .set("SESSION-TOKEN", "token123")
      .send({
        name: "Konsultasi Umum",
        description: "Pemeriksaan dasar hewan peliharaan oleh dokter hewan",
        price: "invalid",
        is_active: true,
      });

    expect(response.status).toBe(400);
    expect(response.body.errors.price.number).toBe(
      "Harga jenis layanan harus berupa angka!"
    );
  });

  it("should return error if is_active is required", async () => {
    const response = await supertest(web)
      .post("/admin/service-categories")
      .set("SESSION-TOKEN", "token123")
      .send({
        name: "Konsultasi Umum",
        description: "Pemeriksaan dasar hewan peliharaan oleh dokter hewan",
        price: 75000.0,
        is_active: "",
      });

    expect(response.status).toBe(400);
    expect(response.body.errors.is_active.boolean).toBe(
      "Status keaktifan harus berupa aktif atau tidak aktif!"
    );
  });

  it("should return error if is_active is not boolean", async () => {
    const response = await supertest(web)
      .post("/admin/service-categories")
      .set("SESSION-TOKEN", "token123")
      .send({
        name: "Konsultasi Umum",
        description: "Pemeriksaan dasar hewan peliharaan oleh dokter hewan",
        price: 75000.0,
        is_active: "invalid",
      });

    expect(response.status).toBe(400);
    expect(response.body.errors.is_active.boolean).toBe(
      "Status keaktifan harus berupa aktif atau tidak aktif!"
    );
  });

  it("should return error if not authorized", async () => {
    const response = await supertest(web)
      .post("/admin/service-categories")
      .set("SESSION-TOKEN", "invalid_token")
      .send({
        name: "Konsultasi Umum",
        description: "Pemeriksaan dasar hewan peliharaan oleh dokter hewan",
        price: 75000.0,
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
      .post("/admin/service-categories")
      .set("SESSION-TOKEN", "token234")
      .send({
        name: "Konsultasi Umum",
        description: "Pemeriksaan dasar hewan peliharaan oleh dokter hewan",
        price: 75000.0,
        is_active: true,
      });

    logger.debug(response.body);

    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});

describe("GET /admin/service-categories", () => {
  beforeEach(async () => {
    await UserTest.createUser();
    await ServiceCategoriesTest.createServiceCategories();
  });
  afterEach(async () => {
    await ServiceCategoriesTest.deleteServiceCategories();
    await UserTest.deleteUser();
  });

  it("should return a list of service categories", async () => {
    const response = await supertest(web)
      .get("/admin/service-categories")
      .set("SESSION-TOKEN", "token123");

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(3);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it("should return error if not authorized", async () => {
    const response = await supertest(web)
      .get("/admin/service-categories")
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
      .get("/admin/service-categories")
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
      .get(`/admin/service-categories`)
      .set("SESSION-TOKEN", "token234");

    logger.debug(response.body);
    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});

describe("GET /admin/service-categories/:id", () => {
  beforeEach(async () => {
    await UserTest.createUser();
    await ServiceCategoriesTest.createServiceCategories();
  });
  afterEach(async () => {
    await ServiceCategoriesTest.deleteServiceCategories();
    await UserTest.deleteUser();
  });

  it("should get an existing service category", async () => {
    const serviceCategory =
      await ServiceCategoriesTest.getServiceCategoriesId();
    const response = await supertest(web)
      .get(`/admin/service-categories/${serviceCategory?.id}`)
      .set("SESSION-TOKEN", "token123");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe("Konsultasi Umum");
    expect(response.body.data.description).toBe(
      "Pemeriksaan dasar hewan peliharaan oleh dokter hewan"
    );
    expect(response.body.data.price).toBe(75000.0);
  });

  it("should return error if service category not found", async () => {
    const response = await supertest(web)
      .get(`/admin/service-categories/99999`)
      .set("SESSION-TOKEN", "token123");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBe("Data jenis layanan tidak ditemukan!");
  });

  it("should return error if not authorized", async () => {
    const serviceCategory =
      await ServiceCategoriesTest.getServiceCategoriesId();
    const response = await supertest(web)
      .get(`/admin/service-categories/${serviceCategory?.id}`)
      .set("SESSION-TOKEN", "invalid_token");

    expect(response.status).toBe(401);
    expect(response.body.errors).toBe("Unauthorized");
  });

  it("should return error if user doesn't have access", async () => {
    const serviceCategory =
      await ServiceCategoriesTest.getServiceCategoriesId();
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
      .get(`/admin/service-categories/${serviceCategory?.id}`)
      .set("SESSION-TOKEN", "token234");

    logger.debug(response.body);

    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});

describe("PATCH /admin/service-categories/:id", () => {
  beforeEach(async () => {
    await UserTest.createUser();
    await ServiceCategoriesTest.createServiceCategories();
  });
  afterEach(async () => {
    await ServiceCategoriesTest.deleteServiceCategories();
    await UserTest.deleteUser();
  });

  it("should update an existing service category", async () => {
    const serviceCategory =
      await ServiceCategoriesTest.getServiceCategoriesId();
    const response = await supertest(web)
      .patch(`/admin/service-categories/${serviceCategory?.id}`)
      .set("SESSION-TOKEN", "token123")
      .send({
        name: "Vaksinasi",
        description:
          "Layanan vaksinasi rutin untuk kucing, anjing, dan kelinci",
        price: 120000.0,
        is_active: false,
      });

    logger.debug(response.body);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      "Data jenis layanan berhasil diperbarui!"
    );
    expect(response.body.data.name).toBe("Vaksinasi");
    expect(response.body.data.description).toBe(
      "Layanan vaksinasi rutin untuk kucing, anjing, dan kelinci"
    );
    expect(response.body.data.price).toBe(120000.0);
    expect(response.body.data.is_active).toBe(false);
  });

  it("should return error if request is invalid", async () => {
    const serviceCategory =
      await ServiceCategoriesTest.getServiceCategoriesId();
    const response = await supertest(web)
      .patch(`/admin/service-categories/${serviceCategory?.id}`)
      .set("SESSION-TOKEN", "token123")
      .send({
        name: "",
        description:
          "Layanan vaksinasi rutin untuk kucing, anjing, dan kelinci",
        price: 120000.0,
        is_active: true,
      });

    logger.debug(response.body);

    expect(response.status).toBe(400);
    expect(response.body.errors.name.required).toBe(
      "Nama jenis layanan harus diisi!"
    );
  });

  it("should return error if service category not found", async () => {
    const response = await supertest(web)
      .patch(`/admin/service-categories/99999`)
      .set("SESSION-TOKEN", "token123")
      .send({
        name: "Vaksinasi",
        description:
          "Layanan vaksinasi rutin untuk kucing, anjing, dan kelinci",
        price: 120000.0,
        is_active: true,
      });

    logger.debug(response.body);

    expect(response.status).toBe(404);
    expect(response.body.errors).toBe("Data jenis layanan tidak ditemukan!");
  });

  it("should return error if not authorized", async () => {
    const serviceCategory =
      await ServiceCategoriesTest.getServiceCategoriesId();
    const response = await supertest(web)
      .patch(`/admin/service-categories/${serviceCategory?.id}`)
      .set("SESSION-TOKEN", "invalid_token")
      .send({
        name: "Vaksinasi",
        description:
          "Layanan vaksinasi rutin untuk kucing, anjing, dan kelinci",
        price: 120000.0,
        is_active: true,
      });

    expect(response.status).toBe(401);
    expect(response.body.errors).toBe("Unauthorized");
  });

  it("should return error if user doesn't have access", async () => {
    const serviceCategory =
      await ServiceCategoriesTest.getServiceCategoriesId();
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
      .patch(`/admin/service-categories/${serviceCategory?.id}`)
      .set("SESSION-TOKEN", "token234")
      .send({
        name: "Vaksinasi",
        description:
          "Layanan vaksinasi rutin untuk kucing, anjing, dan kelinci",
        price: 120000.0,
        is_active: true,
      });

    logger.debug(response.body);

    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});

describe("DELETE /admin/service-categories/:id", () => {
  beforeEach(async () => {
    await UserTest.createUser();
    await ServiceCategoriesTest.createServiceCategories();
  });
  afterEach(async () => {
    await ServiceCategoriesTest.deleteServiceCategories();
    await UserTest.deleteUser();
  });

  it("should delete an existing service category", async () => {
    const serviceCategory =
      await ServiceCategoriesTest.getServiceCategoriesId();
    const response = await supertest(web)
      .delete(`/admin/service-categories/${serviceCategory?.id}`)
      .set("SESSION-TOKEN", "token123");

    logger.debug(response.body);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Data jenis layanan berhasil dihapus!");
  });

  it("should return error if service category not found", async () => {
    const response = await supertest(web)
      .delete(`/admin/service-categories/99999`)
      .set("SESSION-TOKEN", "token123");

    logger.debug(response.body);

    expect(response.status).toBe(404);
    expect(response.body.errors).toBe("Data jenis layanan tidak ditemukan!");
  });

  it("should return error if not authorized", async () => {
    const serviceCategory =
      await ServiceCategoriesTest.getServiceCategoriesId();
    const response = await supertest(web)
      .delete(`/admin/service-categories/${serviceCategory?.id}`)
      .set("SESSION-TOKEN", "invalid_token");

    expect(response.status).toBe(401);
    expect(response.body.errors).toBe("Unauthorized");
  });

  it("should return error if user doesn't have access", async () => {
    const serviceCategory =
      await ServiceCategoriesTest.getServiceCategoriesId();
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
      .delete(`/admin/service-categories/${serviceCategory?.id}`)
      .set("SESSION-TOKEN", "token234");

    logger.debug(response.body);

    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});
