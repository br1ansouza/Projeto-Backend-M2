import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Movement } from "../entities/Movement";
import { Product } from "../entities/Product";
import { Branch } from "../entities/Branch";
import { AppError } from "../utils/AppError";

const movementRepository = AppDataSource.getRepository(Movement);
const productRepository = AppDataSource.getRepository(Product);
const branchRepository = AppDataSource.getRepository(Branch);

export const listMovements = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const movements = await movementRepository.find({
      relations: ["product", "destinationBranch"],
    });

    res.status(200).json(movements);
  } catch (error) {
    next(error);
  }
};

export const createMovement = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { destination_branch_id, product_id, quantity } = req.body;

    if (!destination_branch_id || !product_id || !quantity) {
      throw new AppError("Todos os campos obrigatórios devem ser preenchidos.", 400);
    }

    if (quantity <= 0) {
      throw new AppError("A quantidade deve ser maior que zero.", 400);
    }

    const originBranchId = req.user?.branch_id;
    if (!originBranchId) {
      throw new AppError("Usuário não está vinculado a uma filial.", 403);
    }

    if (originBranchId === destination_branch_id) {
      throw new AppError("A filial de origem não pode ser a mesma que a filial de destino.", 400);
    }

    const product = await productRepository.findOne({
      where: { id: product_id, branch: { id: originBranchId } },
      relations: ["branch"],
    });

    if (!product) {
      throw new AppError("Produto não encontrado na filial de origem.", 404);
    }

    if (quantity > product.amount) {
      throw new AppError("Estoque insuficiente para essa movimentação.", 400);
    }

    const destinationBranch = await branchRepository.findOne({
      where: { id: destination_branch_id },
    });

    if (!destinationBranch) {
      throw new AppError("Filial de destino não encontrada.", 404);
    }

    const movement = movementRepository.create({
      destinationBranch,
      product,
      quantity,
      status: "PENDING",
    });

    await movementRepository.save(movement);

    product.amount -= quantity;
    await productRepository.save(product);

    res.status(201).json(movement);
  } catch (error) {
    next(error);
  }
};

export const startMovement = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
  
      if (!req.user) {
        throw new AppError("Usuário não autenticado.", 401);
      }
  
      if (req.user.profile !== "DRIVER") {
        throw new AppError("Apenas motoristas podem iniciar movimentações.", 403);
      }
  
      const movement = await movementRepository.findOne({
        where: { id: Number(id) },
        relations: ["product", "destinationBranch"],
      });
  
      if (!movement) {
        throw new AppError("Movimentação não encontrada.", 404);
      }
  
      if (movement.status !== "PENDING") {
        throw new AppError("A movimentação já foi iniciada ou finalizada.", 400);
      }
  
      movement.status = "IN_PROGRESS";
      movement.driver = req.user;
      await movementRepository.save(movement);
  
      res.status(200).json(movement);
    } catch (error) {
      next(error);
    }
  };  

  export const endMovement = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
  
      if (!req.user) {
        throw new AppError("Usuário não autenticado.", 401);
      }
  
      const movement = await movementRepository.findOne({
        where: { id: Number(id) },
        relations: ["product", "destinationBranch", "driver"],
      });
  
      if (!movement) {
        throw new AppError("Movimentação não encontrada.", 404);
      }
  
      if (movement.status === "FINISHED") {
        throw new AppError("Movimentação já foi finalizada.", 400);
      }
  
      if (!movement.driver || movement.driver.id !== req.user.id) {
        throw new AppError("Usuário não autorizado para finalizar esta movimentação.", 403);
      }
  
      movement.status = "FINISHED";
      await movementRepository.save(movement);
  
      const newProduct = productRepository.create({
        name: movement.product.name,
        amount: movement.quantity,
        description: movement.product.description,
        url_cover: movement.product.url_cover,
        branch: movement.destinationBranch,
      });
  
      await productRepository.save(newProduct);
  
      res.status(200).json(movement);
    } catch (error) {
      next(error);
    }
  };