import supertest from "supertest";
import { AnimalTypesTest } from "../test-util";
import { web } from "../../src/backend/application/web";
import { logger } from "../../src/backend/application/logging";
import { prismaClient } from "../../src/backend/application/database";
import bcrypt from "bcrypt";
import { createData, deleteData } from "../utils/data";

describe("POST /admin/animal-types", () => {
  beforeEach(async () => {
    await createData("animal-types");
  });
  afterEach(async () => {
    await deleteData();
  });

  it("should create a new animal type", async () => {
    await AnimalTypesTest.deleteAnimalTypes();
    const response = await supertest(web)
      .post("/admin/animal-types")
      .set("SESSION-TOKEN", "token-admin")
      .send({
        name: "Kucing",
        description: "Mamalia kecil dengan bulu halus",
      });
    logger.debug(response.body);
    expect(response.status).toBe(201);
    expect(response.body.data.name).toBe("Kucing");
    expect(response.body.data.description).toBe(
      "Mamalia kecil dengan bulu halus"
    );
  });

  it("should return error if animal type name already exists", async () => {
    await supertest(web)
      .post("/admin/animal-types")
      .set("SESSION-TOKEN", "token-admin")
      .send({
        name: "Kucing",
        description: "Mamalia kecil dengan bulu halus",
      });
    const response = await supertest(web)
      .post("/admin/animal-types")
      .set("SESSION-TOKEN", "token-admin")
      .send({
        name: "Kucing",
        description: "Mamalia kecil dengan bulu halus",
      });
    expect(response.status).toBe(400);
    expect(response.body.errors.name.unique).toBe(
      "Nama jenis hewan sudah dipakai!"
    );
  });

  it("should return error if error request", async () => {
    const response = await supertest(web)
      .post("/admin/animal-types")
      .set("SESSION-TOKEN", "token-admin")
      .send({
        name: "",
      });

    logger.debug(response.body);

    expect(response.status).toBe(400);
    expect(response.body.errors.name.required).toBe(
      "Data jenis hewan harus diisi!"
    );
  });

  it("should return error if not authorized", async () => {
    const response = await supertest(web)
      .post("/admin/animal-types")
      .set("SESSION-TOKEN", "invalid_token")
      .send({
        name: "Kucing",
        description: "Mamalia kecil dengan bulu halus",
      });

    logger.debug(response.body);

    expect(response.status).toBe(401);
    expect(response.body.errors).toBe("Unauthorized");
  });

  it("should return error if role not admin", async () => {
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
      .post("/admin/animal-types")
      .set("SESSION-TOKEN", "token-client")
      .send({
        name: "Kucing",
        description: "Mamalia kecil dengan bulu halus",
      });

    logger.debug(response.body);

    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});

describe("GET /admin/animal-types", () => {
  beforeEach(async () => {
    await createData("animal-types");
  });
  afterEach(async () => {
    await deleteData();
  });

  it("should return a list of animal types", async () => {
    const response = await supertest(web)
      .get("/admin/animal-types")
      .set("SESSION-TOKEN", "token-admin");

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(2);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it("should return error if not authorized", async () => {
    const response = await supertest(web)
      .get("/admin/animal-types")
      .set("SESSION-TOKEN", "invalid_token");

    expect(response.status).toBe(401);
    expect(response.body.errors).toBe("Unauthorized");
  });

  it("should return error if role not admin", async () => {
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
      .get("/admin/animal-types")
      .set("SESSION-TOKEN", "token-client")
      .send({
        name: "Kucing",
        description: "Mamalia kecil dengan bulu halus",
      });

    logger.debug(response.body);

    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});

describe("GET /admin/animal-types/:id", () => {
  beforeEach(async () => {
    await createData("animal-types");
  });
  afterEach(async () => {
    await deleteData();
  });

  it("should get an existing animal type", async () => {
    const animalType = await AnimalTypesTest.getAnimalTypesId();
    const response = await supertest(web)
      .get(`/admin/animal-types/${animalType?.id}`)
      .set("SESSION-TOKEN", "token-admin");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe("Kucing");
    expect(response.body.data.description).toBe(
      "Mamalia kecil dengan bulu halus"
    );
  });

  it("should return error if animal type not found", async () => {
    const response = await supertest(web)
      .get(`/admin/animal-types/99999`)
      .set("SESSION-TOKEN", "token-admin");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBe("Jenis hewan tidak ditemukan!");
  });

  it("should return error if not authorized", async () => {
    const animalType = await AnimalTypesTest.getAnimalTypesId();
    const response = await supertest(web)
      .get(`/admin/animal-types/${animalType?.id}`)
      .set("SESSION-TOKEN", "invalid_token");

    expect(response.status).toBe(401);
    expect(response.body.errors).toBe("Unauthorized");
  });

  it("should return error if role not admin", async () => {
    const animalType = await AnimalTypesTest.getAnimalTypesId();
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
      .get(`/admin/animal-types/${animalType?.id}`)
      .set("SESSION-TOKEN", "token-client")
      .send({
        name: "Kucing",
        description: "Mamalia kecil dengan bulu halus",
      });

    logger.debug(response.body);

    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});

describe("PATCH /admin/animal-types/:id", () => {
  beforeEach(async () => {
    await createData("animal-types");
  });
  afterEach(async () => {
    await deleteData();
  });

  it("should update an existing animal type", async () => {
    const animalType = await AnimalTypesTest.getAnimalTypesId();
    const response = await supertest(web)
      .patch(`/admin/animal-types/${animalType?.id}`)
      .set("SESSION-TOKEN", "token-admin")
      .send({
        name: "Otter",
        description: "Mamalia setia dan bersahabat",
      });

    logger.debug(response.body);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Data jenis hewan berhasil diperbarui!");
    expect(response.body.data.name).toBe("Otter");
    expect(response.body.data.description).toBe("Mamalia setia dan bersahabat");
  });

  it("should return error if request is invalid", async () => {
    const animalType = await AnimalTypesTest.getAnimalTypesId();
    const response = await supertest(web)
      .patch(`/admin/animal-types/${animalType?.id}`)
      .set("SESSION-TOKEN", "token-admin")
      .send({
        name: "",
        description: "Mamalia setia dan bersahabat",
      });

    logger.debug(response.body);

    expect(response.status).toBe(400);
    expect(response.body.errors.name.required).toBe(
      "Data jenis hewan harus diisi!"
    );
  });

  it("should return error if animal type not found", async () => {
    const response = await supertest(web)
      .patch(`/admin/animal-types/99999`)
      .set("SESSION-TOKEN", "token-admin")
      .send({
        name: "Otter",
        description: "Mamalia setia dan bersahabat",
      });

    logger.debug(response.body);

    expect(response.status).toBe(404);
    expect(response.body.errors).toBe("Jenis hewan tidak ditemukan!");
  });

  it("should return error if not authorized", async () => {
    const animalType = await AnimalTypesTest.getAnimalTypesId();
    const response = await supertest(web)
      .patch(`/admin/animal-types/${animalType?.id}`)
      .set("SESSION-TOKEN", "invalid_token")
      .send({
        name: "Otter",
        description: "Mamalia setia dan bersahabat",
      });

    expect(response.status).toBe(401);
    expect(response.body.errors).toBe("Unauthorized");
  });

  it("should return error if role not admin", async () => {
    const animalType = await AnimalTypesTest.getAnimalTypesId();
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
      .patch(`/admin/animal-types/${animalType?.id}`)
      .set("SESSION-TOKEN", "token-client")
      .send({
        name: "Otter",
        description: "Mamalia setia dan bersahabat",
      });

    logger.debug(response.body);

    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});

describe("DELETE /admin/animal-types/:id", () => {
  beforeEach(async () => {
    await createData("animal-types");
  });
  afterEach(async () => {
    await deleteData();
  });

  it("should delete an existing animal type", async () => {
    const animalType = await AnimalTypesTest.getAnimalTypesId();
    const response = await supertest(web)
      .delete(`/admin/animal-types/${animalType?.id}`)
      .set("SESSION-TOKEN", "token-admin");

    logger.debug(response.body);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Data jenis hewan berhasil dihapus!");
  });

  it("should return error if animal type not found", async () => {
    const response = await supertest(web)
      .delete(`/admin/animal-types/99999`)
      .set("SESSION-TOKEN", "token-admin");

    logger.debug(response.body);

    expect(response.status).toBe(404);
    expect(response.body.errors).toBe("Jenis hewan tidak ditemukan!");
  });

  it("should return error if not authorized", async () => {
    const animalType = await AnimalTypesTest.getAnimalTypesId();
    const response = await supertest(web)
      .delete(`/admin/animal-types/${animalType?.id}`)
      .set("SESSION-TOKEN", "invalid_token");

    expect(response.status).toBe(401);
    expect(response.body.errors).toBe("Unauthorized");
  });

  it("should return error if role not admin", async () => {
    const animalType = await AnimalTypesTest.getAnimalTypesId();
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
      .delete(`/admin/animal-types/${animalType?.id}`)
      .set("SESSION-TOKEN", "token-client");

    logger.debug(response.body);

    expect(response.status).toBe(403);
    expect(response.body.errors).toBe(
      "Anda tidak memiliki hak akses pada halaman ini!"
    );
  });
});
