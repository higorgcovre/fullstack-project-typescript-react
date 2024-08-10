import "reflect-metadata";
import { AppDataSource } from "./config/data-source";
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexão com o banco de dados
AppDataSource.initialize().then(() => {
  console.log('Conectado ao banco de dados');
  
  // Rotas
  app.use('/api', userRoutes);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });

}).catch(error => console.log('Erro ao conectar ao banco de dados:', error));

export default app;
