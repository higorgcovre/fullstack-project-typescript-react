import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import { AppDataSource } from './config/data-source';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', userRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log('Conectado ao banco de dados com sucesso');
    const PORT = process.env.PORT || 5002;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco de dados:', error);
  });

export default app;
