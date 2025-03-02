import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { AppError } from "../utils/AppError";

const userRepository = AppDataSource.getRepository(User);

export const loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new AppError("E-mail e senha são obrigatórios.", 400);
        }

        const user = await userRepository.findOne({ where: { email } });

        if (!user) {
            throw new AppError("Credenciais inválidas.", 401);
        }

        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            throw new AppError("Credenciais inválidas.", 401);
        }

        const tokenPayload = {
            id: user.id,
            profile: user.profile || "USER"
        };

        const token = jwt.sign(
            tokenPayload,
            process.env.JWT_SECRET as string,
            { expiresIn: "1h" }
        );

        res.status(200).json({ token });
    } catch (error) {
        next(error);
    }
};
