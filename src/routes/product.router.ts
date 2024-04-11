import express from 'express';
import ProductController from '../controllers/product.controller';
import { authenticateToken, authorize } from '../middleware/authenticateToken'

const router = express.Router();

router.post('/products', authorize(1), ProductController.createProduct);

router.get('/products', authenticateToken, ProductController.getAllProduct);

router.get('/users/:id', authenticateToken, ProductController.getProductById);

router.put('/users/:id', authorize(1), ProductController.updateProduct);

router.delete('/users/:id', authorize(2), ProductController.deleteProduct);

export default router;