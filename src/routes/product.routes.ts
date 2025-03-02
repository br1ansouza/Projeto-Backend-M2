import { Router } from "express";
import { createProduct, listProducts } from "../controllers/ProductController";
import { authMiddleware } from "../middlewares/auth";
import { branchAuthMiddleware } from "../middlewares/branchAuth";

const productRouter = Router();

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Criação de um novo produto (Apenas para FILIAIS)
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
 *                 example: "Produto A"
 *               amount:
 *                 type: integer
 *                 example: 10
 *               description:
 *                 type: string
 *                 example: "Descrição do produto"
 *               url_cover:
 *                 type: string
 *                 example: "http://example.com/image.jpg"
 *     responses:
 *       201:
 *         description: Produto criado com sucesso.
 *       400:
 *         description: Dados inválidos.
 *       403:
 *         description: Usuário sem permissão para criar produtos.
 */
productRouter.post("/", authMiddleware, branchAuthMiddleware, createProduct);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Lista todos os produtos cadastrados (Apenas para FILIAIS)
 *     tags:
 *       - Produtos
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Retorna a lista de produtos cadastrados.
 *       403:
 *         description: Acesso negado. Apenas filiais podem acessar esta rota.
 */
productRouter.get("/", authMiddleware, branchAuthMiddleware, listProducts);

export default productRouter;
