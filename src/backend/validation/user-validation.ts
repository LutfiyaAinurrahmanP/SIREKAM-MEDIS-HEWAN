import { z, ZodType } from "zod";
import { Roles } from "../generated/prisma";

export class UserValidation {
  static readonly REGISTER: ZodType = z.object({
    username: z.string().min(5).max(64),
    fullname: z.string().min(5).max(64),
    email: z.string().email().min(5).max(64),
    password: z.string().min(8).max(64),
    role: z.enum([Roles.admin, Roles.staff, Roles.veterinarian, Roles.client]),
    phone: z.string().min(10).max(14),
  });
}
