import { Router } from "express";
import { 
    createMovement, 
    listMovements, 
    startMovement, 
    endMovement 
} from "../controllers/MovementController";
import { authMiddleware } from "../middlewares/auth";
import { branchAuthMiddleware } from "../middlewares/branchAuth";
import { adminOrDriverMiddleware } from "../middlewares/adminOrDriverAuth";
import { driverAuthMiddleware } from "../middlewares/driverAuthMiddleware";

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

/**
 * @swagger
 * /movements/{id}/start:
 *   patch:
 *     summary: Inicia a movimentação (Apenas para MOTORISTAS)
 *     tags:
 *       - Movimentações
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da movimentação a ser iniciada
 *     responses:
 *       200:
 *         description: Movimentação iniciada com sucesso.
 *       403:
 *         description: Usuário sem permissão para iniciar movimentações.
 *       404:
 *         description: Movimentação não encontrada.
 */
movementRouter.patch("/:id/start", authMiddleware, driverAuthMiddleware, startMovement);

/**
 * @swagger
 * /movements/{id}/end:
 *   patch:
 *     summary: Finaliza a movimentação e transfere os produtos para a filial de destino (Apenas para MOTORISTA que iniciou a viagem)
 *     tags:
 *       - Movimentações
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da movimentação a ser finalizada
 *     responses:
 *       200:
 *         description: Movimentação finalizada com sucesso e produtos transferidos.
 *       403:
 *         description: Usuário sem permissão para finalizar movimentações.
 *       404:
 *         description: Movimentação não encontrada.
 */
movementRouter.patch("/:id/end", authMiddleware, driverAuthMiddleware, endMovement);

export default movementRouter;
