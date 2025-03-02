import { Router } from "express";
import { createMovement } from "../controllers/MovementController";
import { authMiddleware } from "../middlewares/auth";
import { branchAuthMiddleware } from "../middlewares/branchAuth";
import { adminOrDriverMiddleware } from "../middlewares/adminOrDriverAuth";
import { listMovements } from "../controllers/MovementController";

const movementRouter = Router();

/**
 * @swagger
 * /movements:
 *   post:
 *     summary: Criação de uma nova movimentação (Apenas para FILIAIS)
 *     tags:
 *       - Movimentações
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - destination_branch_id
 *               - product_id
 *               - quantity
 *             properties:
 *               destination_branch_id:
 *                 type: integer
 *                 example: 2
 *               product_id:
 *                 type: integer
 *                 example: 5
 *               quantity:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       201:
 *         description: Movimentação criada com sucesso.
 *       400:
 *         description: Dados inválidos ou estoque insuficiente.
 *       403:
 *         description: Usuário sem permissão para criar movimentações.
 */
movementRouter.post("/", authMiddleware, branchAuthMiddleware, createMovement);

/**
 * @swagger
 * /movements:
 *   get:
 *     summary: Lista todas as movimentações (Apenas para FILIAIS e MOTORISTAS)
 *     tags:
 *       - Movimentações
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de movimentações retornada com sucesso.
 *       403:
 *         description: Usuário sem permissão para visualizar movimentações.
 */
movementRouter.get("/", authMiddleware, adminOrDriverMiddleware, listMovements);

export default movementRouter;
