# 📌 Projeto - API de Gestão de Filiais e Produtos

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
1. Run `npm install` command
2. Setup database settings inside `.env` file
3. Run `npm run start` command

---

- A API será iniciada em:
  - 📍 http://localhost:3000

- A documentação Swagger estará disponível em:
  - 📄 http://localhost:3000/api-docs/

---

## 🔐 Autenticação
A API utiliza JWT (JSON Web Token) para autenticação. Para acessar as rotas protegidas, é necessário incluir um token válido no Header Authorization.

Exemplo de uso do token:
```
Authorization: Bearer <SEU_TOKEN_AQUI>
```
Para obter um token de acesso, é necessário realizar login na rota /login.

---

# 📌 Rotas da API

## 🔹 **Autenticação (`/login`)**
| Método | Endpoint  | Descrição |
|--------|----------|-----------|
| `POST` | `/login` | Autentica um usuário e retorna um token |

## 🔹 **Usuários (`/users`)**
| Método  | Endpoint          | Descrição |
|---------|------------------|-----------|
| `POST`  | `/users`         | Cadastro de um novo usuário (Apenas ADMIN) |
| `PATCH` | `/users/:id/status` | Atualiza o status de um usuário (Apenas ADMIN) |

## 🔹 **Produtos (`/products`)**
| Método | Endpoint     | Descrição |
|--------|-------------|-----------|
| `POST` | `/products` | Criação de um novo produto (Apenas FILIAIS) |
| `GET`  | `/products` | Retorna todos os produtos cadastrados (Apenas FILIAIS) |

---

## 🔹 **Movimentações (`/movements`)**
| Método  | Endpoint                  | Descrição |
|---------|--------------------------|-----------|
| `POST`  | `/movements`              | Criar uma nova movimentação (Apenas FILIAIS) |
| `GET`   | `/movements`              | Lista todas as movimentações (Apenas FILIAIS e MOTORISTAS) |
| `PATCH` | `/movements/:id/start`    | Inicia a movimentação (Apenas para MOTORISTAS) |
| `PATCH` | `/movements/:id/end`      | Finaliza a movimentação e transfere o estoque (Apenas MOTORISTA que iniciou a viagem) |

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

🔹 Criar uma Movimentação
Requisição POST /movements (Apenas FILIAL):
```
{
  "destination_branch_id": 2,
  "product_id": 1,
  "quantity": 5
}
```

Headers:
```
Authorization: Bearer <TOKEN_FILIAL>
```

🔹 Iniciar uma Movimentação

Requisição PATCH /movements/:id/start (Apenas MOTORISTAS):
```
PATCH /movements/1/start
```

Headers:
```
Authorization: Bearer <TOKEN_MOTORISTA>
```

🔹 Finalizar uma Movimentação

Requisição PATCH /movements/:id/end (Apenas MOTORISTA que iniciou a viagem):
```
PATCH /movements/1/end
```

Headers:
```
Authorization: Bearer <TOKEN_MOTORISTA>
```
Quando finalizado:

- A movimentação terá o status FINISHED.
- Um novo produto será criado na filial de destino com a quantidade movimentada.

---

📌 Observações Importantes

- Apenas FILIAIS podem criar movimentações
- Apenas MOTORISTAS podem iniciar e finalizar movimentações
- O motorista que iniciou a movimentação deve ser o mesmo a finalizá-la
- Ao finalizar, o produto é transferido para a filial de destino

---

🚀 Conclusão

Essa API foi desenvolvida para gerenciar usuários, produtos e movimentações de forma segura e eficiente. Todos os endpoints seguem as regras de autenticação e autorização definidas, garantindo que cada perfil de usuário tenha acesso apenas às operações permitidas.
