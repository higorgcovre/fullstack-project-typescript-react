import { Router } from 'express';
import { createUser, getUsers, updateUser, deleteUser } from '../controllers/userController';

const router = Router();

// Define as rotas e associa cada rota a uma função do controlador
router.post('/users', createUser);
router.get('/users', getUsers);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;
