import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';
import bcrypt from 'bcryptjs';
import { validateCPF, validateCNPJ } from '../utils/validators';
import { AppError } from '../utils/AppError';

const userRepository = AppDataSource.getRepository(User);

export async function getUserById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    const user = await userRepository.findOne({
      where: { id: Number(id) },
      select: ["id", "name", "status", "profile"],
    });

    if (!user) {
      throw new AppError("Usuário não encontrado.", 404);
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

export async function createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { name, profile, email, password, document, full_address } = req.body;

    if (!name || !profile || !email || !password || !document) {
      throw new AppError('Todos os campos obrigatórios devem ser preenchidos.', 400);
    }

    if (!['DRIVER', 'BRANCH', 'ADMIN'].includes(profile)) {
      throw new AppError('Perfil inválido.', 400);
    }

    if (password.length < 6 || password.length > 20) {
      throw new AppError('A senha deve ter entre 6 e 20 caracteres.', 400);
    }

    if (profile === 'DRIVER' && !validateCPF(document)) {
      throw new AppError('CPF inválido.', 400);
    }
    if (profile === 'BRANCH' && !validateCNPJ(document)) {
      throw new AppError('CNPJ inválido.', 400);
    }

    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new AppError('Email já cadastrado.', 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userCreated = userRepository.create({
      name,
      profile,
      email,
      password_hash: hashedPassword,
    });

    await userRepository.save(userCreated);

    res.status(201).json({ name: userCreated.name, profile: userCreated.profile });
  } catch (error) {
    next(error);
  }
}

export async function getUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const users = await userRepository.find({
      select: ['id', 'name', 'profile', 'email', 'status', 'created_at', 'updated_at'],
    });
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

export async function updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const { name, password, full_address } = req.body;

    const user = await userRepository.findOne({ where: { id: Number(id) } });

    if (!user) {
      throw new AppError("Usuário não encontrado.", 404);
    }

    if (!req.user) {
      throw new AppError("Usuário não autenticado.", 401);
    }

    if (req.user.profile !== "ADMIN" && req.user.id !== Number(id)) {
      throw new AppError("Acesso negado.", 401);
    }

    if (name) user.name = name;
    if (full_address) user.full_address = full_address;

    if (password) {
      if (password.length < 6 || password.length > 20) {
        throw new AppError("A senha deve ter entre 6 e 20 caracteres.", 400);
      }
      user.password_hash = await bcrypt.hash(password, 10);
    }

    await userRepository.save(user);

    res.status(200).json({
      id: user.id,
      name: user.name,
      full_address: user.full_address,
      profile: user.profile,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateUserStatus(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;

    const user = await userRepository.findOne({ where: { id: Number(id) } });

    if (!user) {
      throw new AppError("Usuário não encontrado.", 404);
    }

    if (!req.user || req.user.profile !== "ADMIN") {
      throw new AppError("Apenas ADMIN pode alterar o status de um usuário.", 403);
    }

    user.status = !user.status;

    await userRepository.save(user);

    res.status(200).json({ message: "Status atualizado com sucesso." });
  } catch (error) {
    next(error);
  }
}
