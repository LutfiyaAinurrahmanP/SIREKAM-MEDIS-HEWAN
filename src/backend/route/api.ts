import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { UserController } from "../controller/user-controller";
import { AnimalTypesController } from "../controller/animal-types-controller";
import { roleMiddleware, UserRole } from "../middleware/role-middleware";

export const apiRouter = express.Router();
apiRouter.use(authMiddleware);

// User API
apiRouter.delete("/role/user/logout", UserController.logout);

// ADMIN
export const adminRouter = express.Router();
adminRouter.use(roleMiddleware([UserRole.ADMIN]));

// Animal Types API
adminRouter.post("/animal-types", AnimalTypesController.create);
adminRouter.get("/animal-types", AnimalTypesController.list);
adminRouter.get("/animal-types/:id", AnimalTypesController.get);
adminRouter.patch("/animal-types/:id", AnimalTypesController.update);

// Mount admin router
apiRouter.use("/admin", adminRouter);
