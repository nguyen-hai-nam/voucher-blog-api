import express from 'express';

import productController from '../controllers/product.controller.js';
import { isAuth } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/count', isAuth, productController.countProducts);
router.get('/', isAuth, productController.getAllProducts);
router.post('/', isAuth, productController.createProduct);
router.get('/:id', isAuth, productController.getProductById);
router.patch('/:id', isAuth, productController.updateProductById);
router.delete('/:id', isAuth, productController.deleteProductById);

export default router;
