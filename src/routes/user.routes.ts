import { Router } from "express";
import { createUser, getUsers, getUserById, updateUser, updateUserStatus } from "../controllers/UserController";
import { adminAuthMiddleware } from "../middlewares/adminAuth";
import { authMiddleware } from "../middlewares/auth";
import { adminOrDriverMiddleware } from "../middlewares/adminOrDriverAuth";
import  productRouter  from "./product.routes";
import { branchAuthMiddleware } from "../middlewares/branchAuth";
import { createProduct } from "../controllers/ProductController";


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
 *       400:
 *         description: Dados inválidos.
 *       409:
 *         description: E-mail já cadastrado.
 */
userRouter.post("/", authMiddleware, adminAuthMiddleware, createUser);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lista todos os usuários cadastrados (Apenas ADMIN)
 *     tags:
 *       - Usuários
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso.
 *       401:
 *         description: Usuário não autenticado.
 *       403:
 *         description: Acesso negado.
 */
userRouter.get("/", authMiddleware, adminAuthMiddleware, getUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Busca um usuário pelo ID (Apenas ADMIN ou o próprio usuário)
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
 *     responses:
 *       200:
 *         description: Usuário encontrado com sucesso.
 *       401:
 *         description: Usuário não autenticado.
 *       403:
 *         description: Acesso negado.
 *       404:
 *         description: Usuário não encontrado.
 */
userRouter.get("/:id", authMiddleware, getUserById);

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
 *       400:
 *         description: Dados inválidos.
 *       401:
 *         description: Usuário sem permissão.
 *       404:
 *         description: Usuário não encontrado.
 */
userRouter.put("/:id", authMiddleware, updateUser);

/**
 * @swagger
 * /users/{id}/status:
 *   patch:
 *     summary: Atualiza o status de um usuário (Apenas ADMIN)
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
 *     responses:
 *       200:
 *         description: Status atualizado com sucesso.
 *       401:
 *         description: Usuário não autenticado.
 *       403:
 *         description: Não autorizado.
 *       404:
 *         description: Usuário não encontrado.
 */
userRouter.patch("/:id/status", authMiddleware, adminAuthMiddleware, updateUserStatus);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Criação de um novo produto (Apenas Filial)
 *     tags:
 *       - Produtos
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
 *               - amount
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Produto Exemplo"
 *               amount:
 *                 type: integer
 *                 example: 10
 *               description:
 *                 type: string
 *                 example: "Descrição do produto"
 *               url_cover:
 *                 type: string
 *                 example: "http://imagem.com/produto.jpg"
 *     responses:
 *       201:
 *         description: Produto criado com sucesso.
 *       400:
 *         description: Dados inválidos.
 *       401:
 *         description: Usuário não autenticado.
 */
productRouter.post("/", authMiddleware, branchAuthMiddleware, createProduct);

export default userRouter;
