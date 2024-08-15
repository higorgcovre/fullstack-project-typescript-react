import { DataSource } from "typeorm";
import { User } from "../models/User"; 
import "reflect-metadata";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "Higor2804$",
  database: "postgres",
  synchronize: true,
  logging: false,
  entities: [
    User, 
  ],
  migrations: [
    "src/migration/**/*.ts",
  ],
  subscribers: [
    "src/subscriber/**/*.ts",
  ],
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
