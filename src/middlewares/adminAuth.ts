import { Request, Response, NextFunction } from "express";

export const adminAuthMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.user || req.user.profile !== "ADMIN") {
    res.status(403).json({ message: "Acesso negado. Apenas ADMIN pode acessar esta rota." });
    return;
  }
  next();
};
