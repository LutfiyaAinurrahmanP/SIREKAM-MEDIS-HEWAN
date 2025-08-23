import { prismaClient } from "../src/backend/application/database";
import bcrypt from "bcrypt";

export class UserTest {
  static async deleteUser() {
    await prismaClient.user.deleteMany({
      where: {
        username: "lutfiyapr",
      },
    });
    await prismaClient.user.deleteMany({
      where: {
        username: "dummy data",
      },
    });
  }

  static async createUser() {
    await prismaClient.user.create({
      data: {
        username: "lutfiyapr",
        fullname: "Lutfiya Ainurrahman Prasetyo",
        email: "lutfiyapr.stu@pnc.ac.id",
        password: await bcrypt.hash("password", 10),
        role: "admin",
        phone: "081915133813",
        token: "token123",
      },
    });
  }
}

export class AnimalTypesTest {
  static async createAnimalTypes() {
    await prismaClient.animalTypes.createMany({
      data: [
        {
          name: "Kucing",
          description: "Mamalia kecil dengan bulu halus",
        },
        { name: "Anjing", description: "Mamalia setia dan bersahabat" },
      ],
    });
  }
  static async getAnimalTypesId() {
    return await prismaClient.animalTypes.findFirst({
      where: {
        name: "Kucing",
      },
    });
  }
  static async deleteAnimalTypes() {
    await prismaClient.animalTypes.deleteMany({
      where: {
        name: "Kucing",
      },
    });
    await prismaClient.animalTypes.deleteMany({
      where: {
        name: "Anjing",
      },
    });
    await prismaClient.animalTypes.deleteMany({
      where: {
        name: "Otter",
      },
    });
  }
}
