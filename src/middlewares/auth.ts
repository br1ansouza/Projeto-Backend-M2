import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError";

declare global {
  namespace Express {
    interface Request {
      user?: { id: number; profile: "ADMIN" | "DRIVER" | "BRANCH" };
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  console.log("Authorization Header:", authHeader);

  if (!authHeader) {
    throw new AppError("Token não fornecido.", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    console.log("Decoded Token:", decoded);

    req.user = decoded as { id: number; profile: "ADMIN" | "DRIVER" | "BRANCH" };

    return next();
  } catch (error) {
    console.error("Erro na autenticação:", error); 
    throw new AppError("Token inválido ou expirado.", 401);
  }
};
