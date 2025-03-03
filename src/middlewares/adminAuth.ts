import { Request, Response, NextFunction } from "express";

export const adminAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next();
};
