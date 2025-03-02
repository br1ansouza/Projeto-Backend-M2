import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

export const adminOrDriverMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    throw new AppError("Usuário não autenticado.", 401);
  }

  if (req.user.profile === "BRANCH" || req.user.profile === "DRIVER") {
    return next();
  }

  throw new AppError("Acesso negado. Apenas filiais e motoristas podem visualizar movimentações.", 403);
};
