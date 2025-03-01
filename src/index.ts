require("dotenv").config();
import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source";
import cors from "cors";
import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes";
import { handleError } from "./middlewares/handleError";
import { setupSwagger } from "./config/swagger";
import logger from "./config/winston";

const app = express();

app.use(cors());
app.use(express.json());

setupSwagger(app);

app.use("/users", userRouter);
app.use("/login", authRouter);

app.use(handleError);

AppDataSource.initialize()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      logger.info(`O servidor está rodando em http://localhost:${process.env.PORT || 3000}`);
    });
  })
  .catch((error) => console.log(error));
