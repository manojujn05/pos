import express from 'express';
import RoleController from '../controllers/role.controller';
import { authenticateToken } from '../middleware/authenticateToken'

const router = express.Router();


//router.get('/users', authenticateToken, UserController.getAllUsers);
router.get('/roles', RoleController.getAllRoles);

router.get('/roles/:id', RoleController.getRoleById);


export default router;