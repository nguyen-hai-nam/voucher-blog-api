import express from 'express';

import productCategoryController from '../controllers/product-category.controller.js';
import { isAuth } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/count', isAuth, productCategoryController.countProductCategories);
router.get('/', isAuth, productCategoryController.getAllProductCategories);
router.post('/', isAuth, productCategoryController.createProductCategory);
router.get('/:id', isAuth, productCategoryController.getProductCategoryById);
router.patch('/:id', isAuth, productCategoryController.updateProductCategoryById);
router.delete('/:id', isAuth, productCategoryController.deleteProductCategoryById);

export default router;
