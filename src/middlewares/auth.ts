import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

const userRepository = AppDataSource.getRepository(User);

declare global {
  namespace Express {
    interface Request {
      user?: { 
        id: number; 
        profile: "ADMIN" | "DRIVER" | "BRANCH"; 
        branch_id?: number; 
      };
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token não fornecido.", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: number;
      profile: "ADMIN" | "DRIVER" | "BRANCH";
    };

    const user = await userRepository.findOne({
      where: { id: decoded.id },
      relations: ["branch"],
    });
    
    if (!user) {
      throw new AppError("Usuário não encontrado.", 404);
    }
    
    req.user = {
      id: user.id,
      profile: user.profile,
      branch_id: user.branch?.id ?? null,
    };
    

    return next();
  } catch (error) {
    throw new AppError("Token inválido ou expirado.", 401);
  }
};
