import supertest from "supertest";
import { UserTest } from "./test-util";
import { web } from "../src/backend/application/web";
import { logger } from "../src/backend/application/logging";
import e from "express";

describe("POST /users", () => {
  beforeEach(async () => {
    await UserTest.deleteUser();
  });

  it("should create a new user", async () => {
    const response = await supertest(web).post("/users").send({
      username: "lutfiyapr",
      fullname: "Lutfiya Ainurrahman Prasetyo",
      email: "lutfiyapr.stu@pnc.ac.id",
      password: "password",
      role: "admin",
      phone: "081915133813",
    });

    logger.debug(response.body);
    expect(response.status).toBe(201);
    expect(response.body.data.username).toBe("lutfiyapr");
    expect(response.body.data.fullname).toBe("Lutfiya Ainurrahman Prasetyo");
    expect(response.body.data.email).toBe("lutfiyapr.stu@pnc.ac.id");
    expect(response.body.data.role).toBe("admin");
    expect(response.body.data.phone).toBe("081915133813");
  });
});
