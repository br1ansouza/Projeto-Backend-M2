require('dotenv').config();

import dotenv from "dotenv";
dotenv.config();

import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Driver } from "./entities/Driver";
import { Branch } from "./entities/Branch";
import { Product } from "./entities/Product";

export const AppDataSource: DataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: process.env.NODE_ENV === 'development',
    logging: process.env.NODE_ENV === 'development',
    entities: [User, Driver, Branch, Product],
    migrations: ["src/migrations/*.ts"],
    subscribers: [],
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
    migrationsRun: process.env.NODE_ENV === 'production'
});