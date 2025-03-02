import { Router } from "express";
import { createUser, getUsers, getUserById, updateUser } from "../controllers/UserController";
import { adminAuthMiddleware } from "../middlewares/adminAuth";
import { authMiddleware } from "../middlewares/auth";
import { adminOrDriverMiddleware } from "../middlewares/adminOrDriverAuth";

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
userRouter.post("/", createUser);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lista todos os usuários cadastrados (Sem autenticação temporária)
 *     tags:
 *       - Usuários
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "João Silva"
 *                   status:
 *                     type: string
 *                     example: "ATIVO"
 *                   full_address:
 *                     type: string
 *                     example: "Rua A, 123, São Paulo"
 *                   profile:
 *                     type: string
 *                     example: "ADMIN"
 */
userRouter.get("/", getUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Busca um usuário pelo ID
 *     tags:
 *       - Usuários
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Usuário encontrado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "João Silva"
 *                 status:
 *                   type: string
 *                   example: "ATIVO"
 *                 full_address:
 *                   type: string
 *                   example: "Rua A, 123, São Paulo"
 *                 profile:
 *                   type: string
 *                   example: "ADMIN"
 *       404:
 *         description: Usuário não encontrado.
 */
userRouter.get("/:id", getUserById);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualiza os dados de um usuário (Apenas ADMIN ou o próprio usuário)
 *     tags:
 *       - Usuários
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Novo Nome"
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 maxLength: 20
 *                 example: "novaSenha123"
 *               full_address:
 *                 type: string
 *                 example: "Rua Nova, 456"
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Novo Nome"
 *                 full_address:
 *                   type: string
 *                   example: "Rua Nova, 456"
 *                 profile:
 *                   type: string
 *                   example: "ADMIN"
 *       400:
 *         description: Dados inválidos.
 *       401:
 *         description: Usuário sem permissão para atualizar este perfil.
 *       404:
 *         description: Usuário não encontrado.
 */
userRouter.put("/:id", authMiddleware, updateUser);

export default userRouter;