import express from 'express';
import OrderController from '../controllers/order.controller';
import { authenticateToken, authorize } from '../middleware/authenticateToken'

const router = express.Router();

router.post('/orders', authorize(1), OrderController.createOrder);

router.get('/orders',  OrderController.getAllOrders);

router.get('/orders/:id',  OrderController.getOrderById);

router.put('/orders/:id', authorize(1), OrderController.updateProduct);

router.delete('/users/:id', authorize(2), OrderController.deleteProduct);

export default router;