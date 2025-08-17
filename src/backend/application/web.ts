import express from "express";
import { guestRouter } from "../route/guest";

export const web = express();
web.use(express.json());
web.use(guestRouter);
