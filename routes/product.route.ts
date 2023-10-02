import express from 'express';

import ProductController from '../controllers/product.controller';
import { isAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/count', isAuth, ProductController.countProducts);
router.get('/', isAuth, ProductController.getAllProducts);
router.post('/', isAuth, ProductController.createProduct);
router.get('/:id', isAuth, ProductController.getProductById);
router.patch('/:id', isAuth, ProductController.updateProductById);
router.delete('/:id', isAuth, ProductController.deleteProductById);

export default router;