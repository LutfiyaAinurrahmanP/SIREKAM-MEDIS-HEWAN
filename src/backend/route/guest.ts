import express from "express";
import { UserController } from "../controller/user-controller";

export const guestRouter = express.Router();

guestRouter.post("/register", UserController.register);
