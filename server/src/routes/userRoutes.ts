import { Router } from 'express';
import { loginUser, createUser, getUsers, updateUser, deleteUser, verifyToken, getUserByEmail } from '../controllers/userController';

const router = Router();

router.post('/login', loginUser);
router.post('/users', createUser);
router.post('/verify-token', verifyToken);
router.get('/users', getUsers);
router.get('/users/email', getUserByEmail);  // Adicione esta linha
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;
