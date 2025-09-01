import { prismaClient } from "../src/backend/application/database";
import bcrypt from "bcrypt";

export class UserTest {
  static async deleteUser() {
    await prismaClient.user.deleteMany({
      where: {
        username: {
          in: [
            "lutfiyapr",
            "dummy data",
            "dummy data2",
            "staff",
            "veterinarian",
          ],
        },
      },
    });
  }

  static async createUser() {
    await prismaClient.user.createMany({
      data: [
        {
          username: "dummy data",
          fullname: "Lutfiya Ainurrahman Prasetyo",
          email: "dummy-data.stu@pnc.ac.id",
          password: "password",
          role: "client",
          phone: "081915133813",
          token: "token-client", //token 234
        },
        {
          username: "staff",
          fullname: "Lutfiya Ainurrahman Prasetyo",
          email: "staff.stu@pnc.ac.id",
          password: await bcrypt.hash("password", 10),
          role: "staff",
          phone: "081915133813",
          token: "token-staff", //token222
        },
        {
          username: "veterinarian",
          fullname: "Lutfiya Ainurrahman Prasetyo",
          email: "veterinarian.stu@pnc.ac.id",
          password: await bcrypt.hash("password", 10),
          role: "veterinarian",
          phone: "081915133813",
          token: "token-veterinarian",
        },
        {
          username: "lutfiyapr",
          fullname: "Lutfiya Ainurrahman Prasetyo",
          email: "lutfiyapr.stu@pnc.ac.id",
          password: await bcrypt.hash("password", 10),
          role: "admin",
          phone: "081915133813",
          token: "token-admin", // token123
        },
      ],
    });
  }

  static async getUserId() {
    return await prismaClient.user.findFirst({
      orderBy: {
        id: "desc",
      },
    });
  }

  static async getUserStaffId() {
    return await prismaClient.user.findFirst({
      where: {
        username: "staff",
      },
    });
  }

  static async getUserVeterinarianId() {
    return await prismaClient.user.findFirst({
      where: {
        username: "veterinarian",
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
          in: ["Luna", "Max", "Max Updated"],
        },
      },
    });
  }

  static async getPetsId() {
    return await prismaClient.pets.findFirst({
      where: {
        name: "Luna",
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

export class AppointmentsTest {
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

  static async getPetId1() {
    const pet = await prismaClient.pets.findFirst({
      where: {
        name: "Luna",
      },
    });
    return pet?.id;
  }

  static async getPetId2() {
    const pet = await prismaClient.pets.findFirst({
      where: {
        name: "Max",
      },
    });
    return pet?.id;
  }

  static async createAppointments() {
    const userId1: number | undefined = await this.getUserId1();
    const userId2: number | undefined = await this.getUserId2();
    const petId1: number | undefined = await this.getPetId1();
    const petId2: number | undefined = await this.getPetId2();
    await prismaClient.appointments.createMany({
      data: [
        {
          pet_id: petId1!,
          created_by: userId1!,
          schedule_date: new Date("2025-08-15"),
          schedule_time: "08:00",
          status: "scheduled",
          reason: "Vaksinasi rabies",
          notes: "Vaksinasi rabies tahunan",
        },
        {
          pet_id: petId2!,
          created_by: userId2!,
          schedule_date: new Date("2025-08-15"),
          schedule_time: "08:00",
          status: "scheduled",
          reason: "Pemeriksaan luka setelah kecelakaan",
          notes: "Pernah mengalami kecelakaan 2 minggu lalu",
        },
      ],
    });
  }

  static async deleteAppointments() {
    await prismaClient.appointments.deleteMany();
  }

  static async getAppointmentsId() {
    return await prismaClient.appointments.findFirst({
      orderBy: {
        id: "desc",
      },
    });
  }
}

export class MedicalRecordsTest {
  static async getPetId1() {
    const pet = await prismaClient.pets.findFirst({
      where: {
        name: "Luna",
      },
    });
    return pet?.id;
  }

  static async getPetId2() {
    const pet = await prismaClient.pets.findFirst({
      where: {
        name: "Max",
      },
    });
    return pet?.id;
  }

  static async getUserVeterinarianId() {
    const veterinarian = await prismaClient.user.findFirst({
      where: {
        username: "veterinarian",
      },
    });
    return veterinarian?.id;
  }

  static async getServiceCategoriesId1() {
    const serviceCategories = await prismaClient.serviceCategories.findFirst({
      where: {
        name: "Vaksinasi",
      },
    });
    return serviceCategories?.id;
  }

  static async getServiceCategoriesId2() {
    const serviceCategories = await prismaClient.serviceCategories.findFirst({
      where: {
        name: "Konsultasi Umum",
      },
    });
    return serviceCategories?.id;
  }

  static async getAppointmentsId1() {
    const petId1: number | undefined = await this.getPetId1();
    const appointmentId = await prismaClient.appointments.findFirst({
      where: {
        pet_id: petId1,
      },
    });
    return appointmentId?.id;
  }

  static async getAppointmentsId2() {
    const petId2: number | undefined = await this.getPetId2();
    const appointmentId = await prismaClient.appointments.findFirst({
      where: {
        pet_id: petId2,
      },
    });
    return appointmentId?.id;
  }

  static async deleteMedicalRecords() {
    return await prismaClient.medicalRecords.deleteMany();
  }

  static async getMedicalRecordsId() {
    return await prismaClient.medicalRecords.findFirst({
      orderBy: {
        id: "desc",
      },
    });
  }

  static async createMedicalRecords() {
    const petId1: number | undefined = await this.getPetId1();
    const petId2: number | undefined = await this.getPetId2();
    const veterinarianId: number | undefined =
      await this.getUserVeterinarianId();
    const serviceCategoriesId1: number | undefined =
      await this.getServiceCategoriesId1();
    const serviceCategoriesId2: number | undefined =
      await this.getServiceCategoriesId2();
    const appointmentId1: number | undefined = await this.getAppointmentsId1();
    const appointmentId2: number | undefined = await this.getAppointmentsId2();
    return await prismaClient.medicalRecords.createMany({
      data: [
        {
          pet_id: petId1!,
          service_id: serviceCategoriesId1!,
          appointment_id: appointmentId1!,
          veterinarian_id: veterinarianId!,
          visit_date: new Date("2025-08-15"),
          subject:
            "Pemilik melaporkan bahwa kucing tampak sehat, nafsu makan baik, dan tidak ada gejala sakit. Datang untuk vaksinasi rabies tahunan",
          objective:
            "Suhu tubuh 38.2°C, detak jantung 120 bpm, napas normal, bulu bersih dan rapi, mata dan telinga dalam kondisi normal",
          assessment:
            "Kondisi umum baik, tidak ditemukan kelainan. Layak untuk vaksinasi rabies",
          plan: "Memberikan vaksin rabies 1 dosis, memberikan kartu vaksin baru, menyarankan pemeriksaan kesehatan rutin setiap 6 bulan",
          weight: 12.4,
          temperature_celsius: 38.2,
          next_visit_date: new Date("2025-08-22"),
          status: "final",
        },
        {
          pet_id: petId2!,
          service_id: serviceCategoriesId2!,
          appointment_id: appointmentId2!,
          veterinarian_id: veterinarianId!,
          visit_date: new Date("2025-08-15"),
          subject:
            "Anjing mengalami pincang pada kaki belakang kiri sejak 3 hari lalu setelah bermain di taman. Pemilik melaporkan anjing menjadi kurang aktif",
          objective:
            "Terdapat luka terbuka ±3 cm di kaki belakang kiri, sedikit bengkak, suhu lokal meningkat. Tidak ada patah tulang terdeteksi secara palpasi",
          assessment:
            "Luka terbuka ringan dengan inflamasi, kemungkinan akibat goresan benda tajam",
          plan: "Membersihkan luka dengan antiseptik, memberikan antibiotik topikal, meresepkan obat antiinflamasi selama 5 hari, kontrol ulang 1 minggu",
          weight: 16.1,
          temperature_celsius: 36.9,
          next_visit_date: new Date("2025-08-22"),
          status: "draft",
        },
      ],
    });
  }
}

export class PrescriptionsTest {
  static async getUserVeterinarianId() {
    const veterinarian = await prismaClient.user.findFirst({
      where: {
        username: "veterinarian",
      },
    });
    return veterinarian?.id;
  }

  static async getMedicalRecordsId() {
    const medicalRecord = await prismaClient.medicalRecords.findFirst({
      orderBy: {
        id: "desc",
      },
    });
    return medicalRecord?.id;
  }

  static async deletePrescriptions() {
    return await prismaClient.prescriptions.deleteMany();
  }

  static async createPrescriptions() {
    const veterinarianId: number | undefined =
      await this.getUserVeterinarianId();
    const medicalRecordId: number | undefined =
      await this.getMedicalRecordsId();
    await prismaClient.prescriptions.createMany({
      data: [
        {
          medical_record_id: medicalRecordId!,
          veterinarian_id: veterinarianId!,
          notes:
            "Kucing mengalami demam ringan dan kehilangan nafsu makan. Diberikan obat antipiretik",
        },
        {
          medical_record_id: medicalRecordId!,
          veterinarian_id: veterinarianId!,
          notes:
            "Kelinci diperiksa rutin, kondisi sehat, hanya disarankan untuk memperbaiki pola makan",
        },
      ],
    });
  }

  static async getPrescriptionsId() {
    return await prismaClient.prescriptions.findFirst({
      orderBy: {
        id: "desc",
      },
    });
  }
}

export class PrescriptionItemsTest {
  static async getMedicineId() {
    const medicine = await prismaClient.medicines.findFirst({
      orderBy: {
        id: "desc",
      },
    });
    return medicine?.id;
  }

  static async getPrescriptionsId() {
    const prescription = await prismaClient.prescriptions.findFirst({
      orderBy: {
        id: "desc",
      },
    });
    return prescription?.id;
  }

  static async deletePrescriptionItems() {
    return await prismaClient.prescriptionItems.deleteMany();
  }

  static async createPrescriptionItems() {
    const medicinesId: number | undefined = await this.getMedicineId();
    const prescriptionsId: number | undefined = await this.getPrescriptionsId();
    return await prismaClient.prescriptionItems.createMany({
      data: [
        {
          prescription_id: prescriptionsId!,
          medicine_id: medicinesId!,
          dosage: "500 mg",
          frequency: "3 kali sehari",
          duration_days: 7,
          instructions: "Diminum setelah makan",
        },
        {
          prescription_id: prescriptionsId!,
          medicine_id: medicinesId!,
          dosage: "250 mg",
          frequency: "2 kali sehari",
          duration_days: 14,
          instructions: "Jangan dikunyah, telan dengan air putih",
        },
      ],
    });
  }

  static async getPrescriptionItemsId() {
    return await prismaClient.prescriptionItems.findFirst({
      orderBy: {
        id: "desc",
      },
    });
  }
}

export class TransactionsTest {
  static async getMedicalRecordsId() {
    const medicalRecord = await prismaClient.medicalRecords.findFirst({
      orderBy: {
        id: "desc",
      },
    });
    return medicalRecord?.id;
  }

  static async getUserId() {
    const user = await prismaClient.user.findFirst({
      where: {
        username: "staff",
      },
    });
    return user?.id;
  }

  static async getPetId() {
    const pet = await prismaClient.pets.findFirst({
      orderBy: {
        id: "desc",
      },
    });
    return pet?.id;
  }

  static async deleteTransactions() {
    return await prismaClient.transactions.deleteMany();
  }

  static async createTransactions() {
    const userId: number | undefined = await this.getUserId();
    const petId: number | undefined = await this.getPetId();
    const medicalRecordId: number | undefined =
      await this.getMedicalRecordsId();

    await prismaClient.transactions.createMany({
      data: [
        {
          created_by: userId!,
          pet_id: petId!,
          medical_record_id: medicalRecordId!,
          total_amount: 280000.0,
          paid_amount: 300000.0,
          payment_status: "pending",
          payment_method: "cash",
          invoice_date: new Date("2025-08-17"),
          notes: "Perhatikan perkembangan kesehatan hewan peliharaan",
        },
        {
          created_by: userId!,
          pet_id: petId!,
          medical_record_id: medicalRecordId!,
          total_amount: 120000.0,
          paid_amount: 150000.0,
          payment_status: "paid",
          payment_method: "transfer",
          invoice_date: new Date("2025-08-17"),
          notes: "Perhatikan perkembangan kesehatan hewan peliharaan",
        },
      ],
    });
  }

  static async getTransactionsId() {
    return await prismaClient.transactions.findFirst({
      orderBy: {
        id: "desc",
      },
    });
  }
}

export class TreatmentNotesTest {
  static async getMedicalRecordsId() {
    const medicalRecord = await prismaClient.medicalRecords.findFirst({
      orderBy: {
        id: "desc",
      },
    });
    return medicalRecord?.id;
  }

  static async getUserId() {
    const user = await prismaClient.user.findFirst({
      where: {
        username: "staff",
      },
    });
    return user?.id;
  }

  static async deleteTreatmentNotes() {
    return await prismaClient.treatmentNotes.deleteMany();
  }

  static async createTreatmentNotes() {
    const userId: number | undefined = await this.getUserId();
    const medicalRecordId: number | undefined =
      await this.getMedicalRecordsId();

    return await prismaClient.treatmentNotes.createMany({
      data: [
        {
          created_by: userId!,
          medical_record_id: medicalRecordId!,
          notes: "Catatan perawatan hewan peliharaan",
        },
        {
          created_by: userId!,
          medical_record_id: medicalRecordId!,
          notes: "Perhatikan efek samping obat dalam beberapa hari",
        },
      ],
    });
  }

  static async getTreatmentNotesId() {
    return await prismaClient.treatmentNotes.findFirst({
      orderBy: {
        id: "desc",
      },
    });
  }
}
