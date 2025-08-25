import { prismaClient } from "../src/backend/application/database";
import bcrypt from "bcrypt";

export class UserTest {
  static async deleteUser() {
    await prismaClient.user.deleteMany({
      where: {
        username: {
          in: ["lutfiyapr", "dummy data", "dummy data2"],
        },
      },
    });
  }

  static async createUser() {
    await prismaClient.user.createMany({
      data: [
        {
          username: "lutfiyapr",
          fullname: "Lutfiya Ainurrahman Prasetyo",
          email: "lutfiyapr.stu@pnc.ac.id",
          password: await bcrypt.hash("password", 10),
          role: "admin",
          phone: "081915133813",
          token: "token123",
        },
        {
          username: "dummy data",
          fullname: "Lutfiya Ainurrahman Prasetyo",
          email: "dummy-data.stu@pnc.ac.id",
          password: "password",
          role: "client",
          phone: "081915133813",
          token: "token234",
        },
      ],
    });
  }

  static async getUserId() {
    return await prismaClient.user.findFirst({
      where: {
        username: "lutfiyapr",
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

export class PetsTest {
  static async getUserId1() {
    const user = await prismaClient.user.findFirst({
      where: {
        username: "lutfiyapr",
      },
    });
    return user?.id;
  }

  static async getUserId2() {
    const user = await prismaClient.user.findFirst({
      where: {
        username: "dummy data",
      },
    });
    return user?.id;
  }

  static async getAnimalTypesId1() {
    const animalTypes = await prismaClient.animalTypes.findFirst({
      where: {
        name: "Kucing",
      },
    });
    return animalTypes?.id;
  }

  static async getAnimalTypesId2() {
    const animalTypes = await prismaClient.animalTypes.findFirst({
      where: {
        name: "Anjing",
      },
    });
    return animalTypes?.id;
  }

  static async createPets() {
    const userId1: number | undefined = await this.getUserId1();
    const animalTypesId1: number | undefined = await this.getAnimalTypesId1();
    const userId2: number | undefined = await this.getUserId2();
    const animalTypesId2: number | undefined = await this.getAnimalTypesId2();

    await prismaClient.pets.createMany({
      data: [
        {
          owner_id: userId1!,
          name: "Luna",
          animal_type_id: animalTypesId1!,
          breed: "Persian",
          gender: "female",
          birth_date: new Date("2022-05-14"),
          weight: 3.4,
          color: "Putih",
          notes: "Kucing sangat aktif, suka bermain bola mainan",
        },
        {
          owner_id: userId2!,
          name: "Max",
          animal_type_id: animalTypesId2!,
          breed: "Golden Retriever",
          gender: "male",
          birth_date: new Date("2021-09-08"),
          weight: 28.5,
          color: "Emas",
          notes: "Anjing ramah, rutin vaksinasi lengkap",
        },
      ],
    });
  }

  static async deletePets() {
    await prismaClient.pets.deleteMany({
      where: {
        name: {
          in: ["Luna", "Max"],
        },
      },
    });
  }
}

export class MedicinesTest {
  static async deleteMedicines() {
    await prismaClient.medicines.deleteMany({
      where: {
        code: {
          in: ["OBT-AX500", "OBT-PC500", "OBT-PCX500"],
        },
      },
    });
  }

  static async createMedicines() {
    await prismaClient.medicines.createMany({
      data: [
        {
          name: "Amoxicillin 500mg",
          code: "OBT-AX500",
          type: "tablets",
          unit: "pcs",
          stock_qty: 120,
          price: 7500,
          is_active: true,
        },
        {
          name: "Paracetamol 500mg",
          code: "OBT-PC500",
          type: "tablets",
          unit: "pcs",
          stock_qty: 200,
          price: 1500,
          is_active: true,
        },
      ],
    });
  }

  static async getMedicineId() {
    return await prismaClient.medicines.findFirst({
      where: {
        code: "OBT-AX500",
      },
    });
    // return medicines?.id;
  }
}

export class ServiceCategoriesTest {
  static async deleteServiceCategories() {
    return await prismaClient.serviceCategories.deleteMany({
      where: {
        name: {
          in: ["Konsultasi Umum", "Vaksinasi"],
        },
      },
    });
  }

  static async createServiceCategories() {
    return await prismaClient.serviceCategories.createMany({
      data: [
        {
          name: "Vaksinasi",
          description:
            "Layanan vaksinasi rutin untuk kucing, anjing, dan kelinci",
          price: 120000.0,
          is_active: true,
        },
        {
          name: "Konsultasi Umum",
          description: "Pemeriksaan dasar hewan peliharaan oleh dokter hewan",
          price: 75000.0,
          is_active: true,
        },
      ],
    });
  }

  static async getServiceCategoriesId() {
    return await prismaClient.serviceCategories.findFirst({
      orderBy: {
        id: "desc",
      },
    });
  }
}
