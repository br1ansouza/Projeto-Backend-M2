import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

export const branchAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.profile !== "BRANCH") {
    throw new AppError("Acesso negado. Apenas filiais podem criar produtos.", 403);
  }
  next();
};
