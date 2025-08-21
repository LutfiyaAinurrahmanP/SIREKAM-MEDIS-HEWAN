import { NextFunction, Response } from "express";
import { UserRequest } from "../type/user-request";

export enum UserRole {
  ADMIN = "admin",
  STAFF = "staff",
  VETERINARIAN = "veterinarian",
  CLIENT = "client",
}

export const roleMiddleware = (roles: UserRole[]) => {
  return (req: UserRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        errors: "Unauthorized",
      });
    }

    if (!roles.includes(req.user.role as UserRole)) {
      return res.status(403).json({
        errors: "Forbidden",
      });
    }

    next();
  };
};
