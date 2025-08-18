import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { addUniqueError, formatZodError } from "../error/validation-error";
import { UniqueError } from "../error/unique-error";
import { ResponseError } from "../error/response-error";

export function errorValidationMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      errors: formatZodError(err),
    });
  }

  if (err instanceof UniqueError) {
    const errors = {};
    addUniqueError(errors, err.field, err.message);
    return res.status(400).json({
      errors: errors,
    });
  }

  if (err instanceof ResponseError) {
    return res.status(err.status).json({
      errors: err.message,
    });
  }

  console.error(err);
  return res.status(500).json({
    errors: "Internal server error",
  });
}
