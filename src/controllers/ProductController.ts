import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Product } from "../entities/Product";
import { Branch } from "../entities/Branch";
import { AppError } from "../utils/AppError";

const productRepository = AppDataSource.getRepository(Product);
const branchRepository = AppDataSource.getRepository(Branch);

export const listProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const products = await productRepository.find({
      relations: ["branch"],
    });

    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, amount, description, url_cover } = req.body;

    if (!name || !amount || !description) {
      throw new AppError("Todos os campos obrigatórios devem ser preenchidos.", 400);
    }

    const branchId = req.user?.branch_id;
    if (!branchId) {
      throw new AppError("Usuário não está vinculado a uma filial.", 403);
    }
    
    const currentBranch = await branchRepository.findOne({
      where: { id: branchId },
    });
    
    if (!currentBranch) {
      throw new AppError("Filial não encontrada.", 404);
    }
    
    const product = productRepository.create({
      name,
      amount,
      description,
      url_cover,
      branch: currentBranch,
    });
    

    await productRepository.save(product);

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};
