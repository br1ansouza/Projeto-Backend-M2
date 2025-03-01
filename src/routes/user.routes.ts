import { Router } from "express";
import { createUser } from "../controllers/UserController";
import { adminAuthMiddleware } from "../middlewares/adminAuth";
import { getUsers } from "../controllers/UserController";

const userRouter = Router();

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Criação de um novo usuário (Apenas ADMIN)
 *     tags:
 *       - Usuários
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - profile
 *               - email
 *               - password
 *               - document
 *             properties:
 *               name:
 *                 type: string
 *                 example: "João Silva"
 *               profile:
 *                 type: string
 *                 enum: [DRIVER, BRANCH, ADMIN]
 *                 example: "DRIVER"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "joao@email.com"
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 maxLength: 20
 *                 example: "12345678"
 *               document:
 *                 type: string
 *                 example: "123.456.789-00"
 *               full_address:
 *                 type: string
 *                 example: "Rua Exemplo, 123"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "João Silva"
 *                 profile:
 *                   type: string
 *                   example: "DRIVER"
 *       400:
 *         description: Dados inválidos.
 *       409:
 *         description: E-mail já cadastrado.
 */
userRouter.post("/", adminAuthMiddleware, createUser);

userRouter.get("/", adminAuthMiddleware, getUsers);

export default userRouter;