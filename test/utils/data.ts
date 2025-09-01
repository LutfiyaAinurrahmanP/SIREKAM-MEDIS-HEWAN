import {
  AnimalTypesTest,
  AppointmentsTest,
  MedicalRecordsTest,
  MedicinesTest,
  PetsTest,
  PrescriptionItemsTest,
  PrescriptionsTest,
  ServiceCategoriesTest,
  TransactionsTest,
  TreatmentNotesTest,
  UserTest,
} from "../test-util";

export async function deleteData() {
  await TreatmentNotesTest.deleteTreatmentNotes();
  await TransactionsTest.deleteTransactions();
  await PrescriptionItemsTest.deletePrescriptionItems();
  await PrescriptionsTest.deletePrescriptions();
  await MedicalRecordsTest.deleteMedicalRecords();
  await MedicinesTest.deleteMedicines();
  await AppointmentsTest.deleteAppointments();
  await ServiceCategoriesTest.deleteServiceCategories();
  await PetsTest.deletePets();
  await AnimalTypesTest.deleteAnimalTypes();
  await UserTest.deleteUser();
}

export async function createData(type?: string) {
  await UserTest.createUser();

  switch (type) {
    case "users":
      await UserTest.createUser(); // ✅ Buat User
      return; // ✅ Stop di sini, tidak buat AnimalTypes dan seterusnya

    case "animal-types":
      await AnimalTypesTest.createAnimalTypes(); // ✅ Buat AnimalTypes
      return; // ✅ Stop di sini, tidak buat Pets dan seterusnya

    case "pets":
      await AnimalTypesTest.createAnimalTypes();
      await PetsTest.createPets(); // ✅ Buat sampai Pets
      return;

    case "service-categories":
      await AnimalTypesTest.createAnimalTypes();
      await PetsTest.createPets();
      await ServiceCategoriesTest.createServiceCategories(); // ✅ Buat sampai ServiceCategories
      return;

    case "appointments":
      await AnimalTypesTest.createAnimalTypes();
      await PetsTest.createPets();
      await ServiceCategoriesTest.createServiceCategories();
      await AppointmentsTest.createAppointments(); // ✅ Buat sampai Appointments
      return;

    case "medicines":
      await AnimalTypesTest.createAnimalTypes();
      await PetsTest.createPets();
      await ServiceCategoriesTest.createServiceCategories();
      await AppointmentsTest.createAppointments();
      await MedicinesTest.createMedicines(); // ✅ Buat sampai Medicines
      return;

    case "medical-records":
      await AnimalTypesTest.createAnimalTypes();
      await PetsTest.createPets();
      await ServiceCategoriesTest.createServiceCategories();
      await AppointmentsTest.createAppointments();
      await MedicinesTest.createMedicines();
      await MedicalRecordsTest.createMedicalRecords(); // ✅ Buat sampai MedicalRecords
      return;

    case "prescriptions":
      await AnimalTypesTest.createAnimalTypes();
      await PetsTest.createPets();
      await ServiceCategoriesTest.createServiceCategories();
      await AppointmentsTest.createAppointments();
      await MedicinesTest.createMedicines();
      await MedicalRecordsTest.createMedicalRecords();
      await PrescriptionsTest.createPrescriptions(); // ✅ Buat sampai Prescriptions
      return;

    case "prescription-items":
      await AnimalTypesTest.createAnimalTypes();
      await PetsTest.createPets();
      await ServiceCategoriesTest.createServiceCategories();
      await AppointmentsTest.createAppointments();
      await MedicinesTest.createMedicines();
      await MedicalRecordsTest.createMedicalRecords();
      await PrescriptionsTest.createPrescriptions();
      await PrescriptionItemsTest.createPrescriptionItems(); // ✅ Buat sampai PrescriptionItems
      return;

    case "transactions":
      await AnimalTypesTest.createAnimalTypes();
      await PetsTest.createPets();
      await ServiceCategoriesTest.createServiceCategories();
      await AppointmentsTest.createAppointments();
      await MedicinesTest.createMedicines();
      await MedicalRecordsTest.createMedicalRecords();
      await PrescriptionsTest.createPrescriptions();
      await PrescriptionItemsTest.createPrescriptionItems();
      await TransactionsTest.createTransactions(); // ✅ Buat sampai Transactions
      return;

    case "treatment-notes":
      await AnimalTypesTest.createAnimalTypes();
      await PetsTest.createPets();
      await ServiceCategoriesTest.createServiceCategories();
      await AppointmentsTest.createAppointments();
      await MedicinesTest.createMedicines();
      await MedicalRecordsTest.createMedicalRecords();
      await PrescriptionsTest.createPrescriptions();
      await PrescriptionItemsTest.createPrescriptionItems();
      await TransactionsTest.createTransactions();
      await TreatmentNotesTest.createTreatmentNotes(); // ✅ Buat semua
      return;

    default:
      // Jika tidak ada type yang match, buat semua data
      await AnimalTypesTest.createAnimalTypes();
      await PetsTest.createPets();
      await ServiceCategoriesTest.createServiceCategories();
      await AppointmentsTest.createAppointments();
      await MedicinesTest.createMedicines();
      await MedicalRecordsTest.createMedicalRecords();
      await PrescriptionsTest.createPrescriptions();
      await PrescriptionItemsTest.createPrescriptionItems();
      await TransactionsTest.createTransactions();
      await TreatmentNotesTest.createTreatmentNotes();
  }
}
