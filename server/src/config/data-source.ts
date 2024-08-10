import { DataSource } from "typeorm";
import "reflect-metadata";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "meu_usuario",
  password: "minha_senha",
  database: "meu_projeto",
  synchronize: true,
  logging: false,
  entities: [
    "src/models/**/*.ts"
  ],
  migrations: [
    "src/migration/**/*.ts"
  ],
  subscribers: [
    "src/subscriber/**/*.ts"
  ],
});
