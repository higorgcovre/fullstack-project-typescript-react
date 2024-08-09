import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas (você vai adicionar as rotas aqui mais tarde)
// app.use('/api/users', userRoutes);

export default app;
