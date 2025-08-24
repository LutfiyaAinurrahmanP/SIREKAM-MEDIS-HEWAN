import supertest from "supertest";
import { AnimalTypesTest, PetsTest, UserTest } from "./test-util";
import { web } from "../src/backend/application/web";
import { logger } from "../src/backend/application/logging";

describe("CHECK test-util.ts", () => {
  beforeEach(async () => {
    await PetsTest.deletePets();
    await AnimalTypesTest.deleteAnimalTypes();
    await UserTest.deleteUser();
    await UserTest.createUser();
    await AnimalTypesTest.createAnimalTypes();
    await PetsTest.createPets();
  });

  it("should login an existing user", async () => {
    const response = await supertest(web).post("/login").send({
      username: "lutfiyapr",
      password: "password",
    });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.username).toBe("lutfiyapr");
    expect(response.body.data.fullname).toBe("Lutfiya Ainurrahman Prasetyo");
    expect(response.body.data.email).toBe("lutfiyapr.stu@pnc.ac.id");
    expect(response.body.data.role).toBe("admin");
    expect(response.body.data.phone).toBe("081915133813");
  });
});
