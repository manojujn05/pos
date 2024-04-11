import express from 'express';
import UserController from '../controllers/user.controller';
import { authenticateToken } from '../middleware/authenticateToken'

const router = express.Router();

router.post('/users', UserController.createUser);

router.get('/users', authenticateToken, UserController.getAllUsers);

router.get('/users/:id', UserController.getUserById);

router.put('/users/:id', UserController.updateUser);

router.delete('/users/:id', UserController.deleteUser);

export default router;