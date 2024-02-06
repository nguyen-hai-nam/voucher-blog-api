import express from 'express';

import { isBusiness } from '../middlewares/business-auth.middleware.js';
import { upload } from '../../../config/multer.js';
import businessActionController from '../controllers/businesses/action.controller.js';
import productCategoryCrudController from '../controllers/businesses/productCategories/crud.controller.js';
import productCrudController from '../controllers/businesses/products/crud.controller.js';

const router = express.Router();

router.post('/me/tick/:userId', isBusiness, businessActionController.tickCustomer);

/**
 * @openapi
 * /businesses/me/productCategories:
 *   get:
 *     summary: Get product categories for the current business
 *     tags: [Business - Product Category]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of product categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductCategory'
 *       401:
 *         description: Unauthorized
 */
router.get('/me/productCategories', isBusiness, productCategoryCrudController.getProductCategories);
/**
 * @openapi
 * /businesses/me/productCategories:
 *   post:
 *     summary: Create a new product category for the current business
 *     tags: [Business - Product Category]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductCategoryCreate'
 *     responses:
 *       200:
 *         description: Product category created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductCategory'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post('/me/productCategories', isBusiness, productCategoryCrudController.createProductCategory);
/**
 * @openapi
 * /businesses/me/productCategories/{productCategoryId}:
 *   get:
 *     summary: Get a product category by ID for the current business
 *     tags: [Business - Product Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productCategoryId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product category created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductCategory'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 */
router.get('/me/productCategories/:productCategoryId', isBusiness, productCategoryCrudController.getProductCategory);
/**
 * @openapi
 * /businesses/me/productCategories/{productCategoryId}:
 *   put:
 *     summary: Update a product category by ID for the current business
 *     tags: [Business - Product Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productCategoryId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductCategoryUpdate'
 *     responses:
 *       200:
 *         description: A product category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductCategory'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 */
router.put('/me/productCategories/:productCategoryId', isBusiness, productCategoryCrudController.updateProductCategory);
/**
 * @openapi
 * /businesses/me/productCategories/{productCategoryId}:
 *   delete:
 *     summary: Delete a product category by ID for the current business
 *     tags: [Business - Product Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productCategoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product category to delete
 *     responses:
 *       200:
 *         description: Product category deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductCategory'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 */
router.delete('/me/productCategories/:productCategoryId', isBusiness, productCategoryCrudController.deleteProductCategory);
/**
 * @openapi
 * /businesses/me/products:
 *   get:
 *     summary: Get all products for the current business
 *     tags: [Business - Product]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: An array of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.get('/me/products', isBusiness, productCrudController.getProducts);

/**
 * @openapi
 * /businesses/me/products:
 *   post:
 *     summary: Create a new product for the current business
 *     tags: [Business - Product]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/ProductCreate'
 *     responses:
 *       200:
 *         description: The created product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post('/me/products', isBusiness, upload('productImages').array('images'), productCrudController.createProduct);
/**
 * @openapi
 * /businesses/me/products/{productId}:
 *   get:
 *     summary: Get a specific product for the current business
 *     tags: [Business - Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product
 *     responses:
 *       200:
 *         description: The requested product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 */
router.get('/me/products/:productId', isBusiness, productCrudController.getProduct);
/**
 * @openapi
 * /businesses/me/products/{productId}:
 *   put:
 *     summary: Update a specific product for the current business
 *     tags: [Business - Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductUpdate'
 *     responses:
 *       200:
 *         description: The updated product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 */
router.put('/me/products/:productId', isBusiness, productCrudController.updateProduct);
/**
 * @openapi
 * /businesses/me/products/{productId}:
 *   delete:
 *     summary: Delete a specific product for the current business
 *     tags: [Business - Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product
 *     responses:
 *       200:
 *         description: The deleted product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 */
router.delete('/me/products/:productId', isBusiness, productCrudController.deleteProduct);

export default router;
