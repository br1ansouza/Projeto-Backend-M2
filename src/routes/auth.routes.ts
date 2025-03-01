import { Router } from "express";
import { loginUser } from "../controllers/AuthController";

const authRouter = Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Autenticação do usuário
 *     tags:
 *       - Autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "admin@email.com"
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 maxLength: 20
 *                 example: "12345678"
 *     responses:
 *       200:
 *         description: Usuário autenticado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "Bearer <JWT_TOKEN>"
 *       401:
 *         description: Credenciais inválidas.
 */

authRouter.post("/", loginUser);

authRouter.get("/", (req, res) => {
    res.status(200).send("Rota de login ativa.");
  });

export default authRouter;