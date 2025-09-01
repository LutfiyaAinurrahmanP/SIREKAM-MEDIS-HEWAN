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
  switch (type) {
    case "users":
      await UserTest.createUser();
      return;

    case "animal-types":
      await UserTest.createUser();
      await AnimalTypesTest.createAnimalTypes();
      return;

    case "pets":
      await UserTest.createUser();
      await AnimalTypesTest.createAnimalTypes();
      await PetsTest.createPets();
      return;

    case "service-categories":
      await UserTest.createUser();
      await AnimalTypesTest.createAnimalTypes();
      await PetsTest.createPets();
      await ServiceCategoriesTest.createServiceCategories();
      return;

    case "appointments":
      await UserTest.createUser();
      await AnimalTypesTest.createAnimalTypes();
      await PetsTest.createPets();
      await ServiceCategoriesTest.createServiceCategories();
      await AppointmentsTest.createAppointments();
      return;

    case "medicines":
      await UserTest.createUser();
      await AnimalTypesTest.createAnimalTypes();
      await PetsTest.createPets();
      await ServiceCategoriesTest.createServiceCategories();
      await AppointmentsTest.createAppointments();
      await MedicinesTest.createMedicines();
      return;

    case "medical-records":
      await UserTest.createUser();
      await AnimalTypesTest.createAnimalTypes();
      await PetsTest.createPets();
      await ServiceCategoriesTest.createServiceCategories();
      await AppointmentsTest.createAppointments();
      await MedicinesTest.createMedicines();
      await MedicalRecordsTest.createMedicalRecords();
      return;

    case "prescriptions":
      await UserTest.createUser();
      await AnimalTypesTest.createAnimalTypes();
      await PetsTest.createPets();
      await ServiceCategoriesTest.createServiceCategories();
      await AppointmentsTest.createAppointments();
      await MedicinesTest.createMedicines();
      await MedicalRecordsTest.createMedicalRecords();
      await PrescriptionsTest.createPrescriptions();
      return;

    case "prescription-items":
      await UserTest.createUser();
      await AnimalTypesTest.createAnimalTypes();
      await PetsTest.createPets();
      await ServiceCategoriesTest.createServiceCategories();
      await AppointmentsTest.createAppointments();
      await MedicinesTest.createMedicines();
      await MedicalRecordsTest.createMedicalRecords();
      await PrescriptionsTest.createPrescriptions();
      await PrescriptionItemsTest.createPrescriptionItems();
      return;

    case "transactions":
      await UserTest.createUser();
      await AnimalTypesTest.createAnimalTypes();
      await PetsTest.createPets();
      await ServiceCategoriesTest.createServiceCategories();
      await AppointmentsTest.createAppointments();
      await MedicinesTest.createMedicines();
      await MedicalRecordsTest.createMedicalRecords();
      await PrescriptionsTest.createPrescriptions();
      await PrescriptionItemsTest.createPrescriptionItems();
      await TransactionsTest.createTransactions();
      return;

    case "treatment-notes":
      await UserTest.createUser();
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
      return;

    default:
      await UserTest.createUser();
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
