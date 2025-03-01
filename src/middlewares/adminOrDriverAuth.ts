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

  const user = req.user;
  const requestedId = Number(req.params.id);



  if (user.profile === "ADMIN") {
    return next();
  }

  if (user.profile === "DRIVER" && Number(user.id) === requestedId) {
    return next();
  }
  throw new AppError("Não autorizado.", 403);
};
