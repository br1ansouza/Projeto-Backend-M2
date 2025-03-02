# 📌 Projeto M2 - API de Gestão de Filiais e Produtos
Módulo 2 - DEVinHouse [Clamed] V3

- 🚀 API desenvolvida em Node.js, TypeScript e TypeORM, utilizando PostgreSQL para armazenamento de dados.

---

# 🛠 Tecnologias Utilizadas
- Node.js
- Express
- TypeScript
- TypeORM
- PostgreSQL
- JWT (JSON Web Token)
- Bcrypt
- Swagger (Documentação da API)

## 📌 Steps to run this project
1. Run npm i command
2. Setup database settings inside .env file
3. Run npm run start command

---

- A API será iniciada em:
http://localhost:3000

- A documentação Swagger estará disponível em:
http://localhost:3000/api-docs/

## 🔐 Autenticação
A API utiliza JWT (JSON Web Token) para autenticação. Para acessar as rotas protegidas, é necessário incluir um token válido no Header Authorization.

Exemplo de uso do token:
```
Authorization: Bearer <SEU_TOKEN_AQUI>
```
Para obter um token de acesso, é necessário realizar login na rota /login.

---

# 📌 Rotas da API

### 🔹 Autenticação (`/auth`)

| Método | Endpoint  | Descrição |
|--------|----------|-----------|
| `POST` | `/login` | Autentica um usuário e retorna um token |

### 🔹 Usuários (`/users`)

| Método  | Endpoint          | Descrição |
|---------|------------------|-----------|
| `POST`  | `/users`         | Cadastro de um novo usuário (Apenas ADMIN) |
| `PATCH` | `/users/:id/status` | Atualiza o status de um usuário (Apenas ADMIN) |

### 🔹 Produtos (`/products`)

| Método | Endpoint     | Descrição |
|--------|-------------|-----------|
| `POST` | `/products` | Criação de um novo produto (Apenas FILIAIS) |
| `GET`  | `/products` | Retorna todos os produtos cadastrados (Apenas FILIAIS) |

---

# 📖 Como Rodar o Projeto

## 1️⃣ Configurar o Banco de Dados
Crie um banco de dados PostgreSQL e defina as credenciais no arquivo .env:
```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=senha
DB_NAME=projeto-m2
JWT_SECRET=seuSegredoJWT
```

## 2️⃣ Instalar Dependências
```npm install```

## 3️⃣ Executar Migrations
```npm run typeorm -- -d src/data-source.ts migration:run```

## 4️⃣ Iniciar o Servidor
```npm run start```

- O servidor será iniciado em http://localhost:3000.

---
# 📌 Como Testar a API
🔹 Obter Token (Login)
Faça uma requisição POST /login com:
```
{
  "email": "admin@email.com",
  "password": "senha123"
}
```

🔹 Criar um Produto
Requisição POST /products (Apenas FILIAL):
```
{
  "name": "Produto Exemplo",
  "amount": 10,
  "description": "Descrição do produto",
  "url_cover": "http://imagem.com/produto.jpg"
}
```

Headers:
```
Authorization: Bearer <TOKEN>
```
🔹 Listar Produtos
Requisição GET /products (Apenas FILIAL).

---
