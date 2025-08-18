import express from "express";
import { guestRouter } from "../route/guest";
import { errorValidationMiddleware } from "../middleware/error-validation-middleware";

export const web = express();
web.use(express.json());
web.use(guestRouter);
web.use(errorValidationMiddleware);
