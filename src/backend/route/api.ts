import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { UserController } from "../controller/user-controller";
import { AnimalTypesController } from "../controller/animal-types-controller";
import { roleMiddleware, UserRole } from "../middleware/role-middleware";
import { MedicinesController } from "../controller/medicines-controller";
import { ServiceCategoriesController } from "../controller/service-categories-controller";
import { PetsController } from "../controller/pets-controller";
import { AppointmentsController } from "../controller/appointments-controller";
import MedicalRecordsController from "../controller/medical-records-controller";
import { PrescriptionsController } from "../controller/prescriptions-controller";
import { PrescriptionItemsController } from "../controller/prescription-items-controller";
import { TransactionsController } from "../controller/transactions-controller";
import { TreatmentNotesController } from "../controller/treatment-notes-controller";

export const apiRouter = express.Router();
apiRouter.use(authMiddleware);

// User API
apiRouter.delete("/role/user/logout", UserController.logout);
apiRouter.delete("/admin/user/logout", UserController.logout);
apiRouter.delete("/staff/user/logout", UserController.logout);
apiRouter.delete("/veterinarian/user/logout", UserController.logout);
apiRouter.delete("/client/user/logout", UserController.logout);

// ADMIN
export const adminRouter = express.Router();
adminRouter.use(roleMiddleware([UserRole.ADMIN]));

// Animal Types API
adminRouter.post("/animal-types", AnimalTypesController.create);
adminRouter.get("/animal-types", AnimalTypesController.list);
adminRouter.get("/animal-types/:id", AnimalTypesController.get);
adminRouter.patch("/animal-types/:id", AnimalTypesController.update);
adminRouter.delete("/animal-types/:id", AnimalTypesController.delete);

// Medicines API
adminRouter.post("/medicines", MedicinesController.create);
adminRouter.get("/medicines", MedicinesController.list);
adminRouter.get("/medicines/:id", MedicinesController.get);
adminRouter.patch("/medicines/:id", MedicinesController.update);
adminRouter.delete("/medicines/:id", MedicinesController.delete);

// // Service Categories API
adminRouter.post("/service-categories", ServiceCategoriesController.create);
adminRouter.get("/service-categories", ServiceCategoriesController.list);
adminRouter.get("/service-categories/:id", ServiceCategoriesController.get);
adminRouter.patch(
  "/service-categories/:id",
  ServiceCategoriesController.update
);
adminRouter.delete(
  "/service-categories/:id",
  ServiceCategoriesController.delete
);

// User API
adminRouter.post("/users", UserController.create);
adminRouter.get("/users", UserController.list);
adminRouter.get("/users/:id", UserController.get);
adminRouter.patch("/users/:id", UserController.update);
adminRouter.delete("/users/:id", UserController.delete);

// Mount admin router
apiRouter.use("/admin", adminRouter);

// Staff
export const staffRouter = express.Router();
staffRouter.use(roleMiddleware([UserRole.STAFF]));

// Pets API
staffRouter.post("/pets", PetsController.create);
staffRouter.get("/pets", PetsController.list);
staffRouter.get("/pets/:id", PetsController.get);
staffRouter.patch("/pets/:id", PetsController.update);
staffRouter.delete("/pets/:id", PetsController.delete);

// Appointments API
staffRouter.post("/appointments", AppointmentsController.create);
staffRouter.get("/appointments", AppointmentsController.list);
staffRouter.get("/appointments/:id", AppointmentsController.get);
staffRouter.patch("/appointments/:id", AppointmentsController.update);
staffRouter.delete("/appointments/:id", AppointmentsController.delete);

// Medical Records API
staffRouter.post("/medical-records", MedicalRecordsController.create);
staffRouter.get("/medical-records", MedicalRecordsController.list);
staffRouter.get("/medical-records/:id", MedicalRecordsController.get);
staffRouter.patch("/medical-records/:id", MedicalRecordsController.update);
staffRouter.delete("/medical-records/:id", MedicalRecordsController.delete);

// Prescription API
staffRouter.post("/prescriptions", PrescriptionsController.create);
staffRouter.get("/prescriptions", PrescriptionsController.list);
staffRouter.get("/prescriptions/:id", PrescriptionsController.get);
staffRouter.patch("/prescriptions/:id", PrescriptionsController.update);
staffRouter.delete("/prescriptions/:id", PrescriptionsController.delete);

// Prescription items API
staffRouter.post("/prescription-items", PrescriptionItemsController.create);
staffRouter.get("/prescription-items", PrescriptionItemsController.list);
staffRouter.get("/prescription-items/:id", PrescriptionItemsController.get);
staffRouter.patch(
  "/prescription-items/:id",
  PrescriptionItemsController.update
);
staffRouter.delete(
  "/prescription-items/:id",
  PrescriptionItemsController.delete
);

// Transactions API
staffRouter.post("/transactions", TransactionsController.create);
staffRouter.get("/transactions", TransactionsController.list);
staffRouter.get("/transactions/:id", TransactionsController.get);
staffRouter.patch("/transactions/:id", TransactionsController.update);
staffRouter.delete("/transactions/:id", TransactionsController.delete);

apiRouter.use("/staff", staffRouter);

// Veterinarian API
export const veterinarianRouter = express.Router();
veterinarianRouter.use(roleMiddleware([UserRole.VETERINARIAN]));

// Treatment notes API
veterinarianRouter.post("/treatment-notes", TreatmentNotesController.create);
veterinarianRouter.get("/treatment-notes", TreatmentNotesController.list);
veterinarianRouter.get("/treatment-notes/:id", TreatmentNotesController.get);
veterinarianRouter.patch(
  "/treatment-notes/:id",
  TreatmentNotesController.update
);
veterinarianRouter.delete(
  "/treatment-notes/:id",
  TreatmentNotesController.delete
);

apiRouter.use("/veterinarian", veterinarianRouter);
