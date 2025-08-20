import express from "express";
import { guestRouter } from "../route/guest";
import { errorValidationMiddleware } from "../middleware/error-validation-middleware";
import { apiRouter } from "../route/api";
import { authMiddleware } from "../middleware/auth-middleware";

export const web = express();
web.use(express.json());
web.use(guestRouter);
web.use(apiRouter);
web.use(authMiddleware);
web.use(errorValidationMiddleware);
