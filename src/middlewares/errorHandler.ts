import { Request, Response, NextFunction } from "express";
import { HttpException } from "../shared/errors/httpException";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof HttpException) {
    res.status(err.statusCode).json({ message: err.message });
    return;
  }

  console.error("Unhandled Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
  return;
};
