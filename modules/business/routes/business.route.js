import express from 'express';

import { isBusiness } from '../middlewares/business-auth.middleware.js';
import businessActionController from '../controllers/businesses/action.controller.js';
import productCategoryCrudController from '../controllers/businesses/productCategories/crud.controller.js';

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
 *                 type: 'object'
 *                 properties:
 *                   id:
 *                     type: 'string'
 *                     description: 'The unique identifier for a product category'
 *                   name:
 *                     type: 'string'
 *                     description: 'The name of the product category'
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
 *               type: 'object'
 *               properties:
 *                 id:
 *                   type: 'string'
 *                   description: 'The unique identifier for a product category'
 *                 name:
 *                   type: 'string'
 *                   description: 'The name of the product category'
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
 *               type: 'object'
 *               properties:
 *                 id:
 *                   type: 'string'
 *                   description: 'The unique identifier for a product category'
 *                 name:
 *                   type: 'string'
 *                   description: 'The name of the product category'
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
 *               type: 'object'
 *               properties:
 *                 id:
 *                   type: 'string'
 *                   description: 'The unique identifier for a product category'
 *                 name:
 *                   type: 'string'
 *                   description: 'The name of the product category'
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
 *               type: 'object'
 *               properties:
 *                 id:
 *                   type: 'string'
 *                   description: 'The unique identifier for a product category'
 *                 name:
 *                   type: 'string'
 *                   description: 'The name of the product category'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 */
router.delete('/me/productCategories/:productCategoryId', isBusiness, productCategoryCrudController.deleteProductCategory);

export default router;
