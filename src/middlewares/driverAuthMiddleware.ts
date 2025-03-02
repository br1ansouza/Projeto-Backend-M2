import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

export const driverAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user || req.user.profile !== "DRIVER") {
    throw new AppError("Acesso negado. Apenas motoristas podem acessar esta rota.", 403);
  }
  next();
};
