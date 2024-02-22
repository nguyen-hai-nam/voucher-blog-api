import express from 'express';

import { isBusiness } from '../middlewares/business-auth.middleware.js';
import { upload } from '../../../config/multer.js';
import businessCrudController from '../controllers/businesses/crud.controller.js';
import businessActionController from '../controllers/businesses/action.controller.js';
import productCategoryCrudController from '../controllers/businesses/productCategories/crud.controller.js';
import productCrudController from '../controllers/businesses/products/crud.controller.js';
import voucherCrudController from '../controllers/businesses/vouchers/crud.controller.js';
import campaignCrudController from '../controllers/businesses/campaigns/crud.controller.js';
import rewardCrudController from '../controllers/businesses/rewards/crud.controller.js';

const router = express.Router();


/**
 * @swagger
 * /businesses/me:
 *   get:
 *     summary: Retrieve the current business
 *     tags: [Business]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The current business details
 *         content:
 *           application/json:
 *             schema:
*                $ref: '#/components/schemas/Business'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 * 
 */
router.get('/me', isBusiness, businessCrudController.getCurrentBusiness);
/**
 * @swagger
*   put:
*     summary: Update the current business
*     tags: [Business]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/BusinessUpdate'
*     responses:
*       200:
*         description: The business was updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Business'
*       400:
*         description: Bad request
*       500:
*         description: Internal server error
*/
router.put('/me/:id', isBusiness, businessCrudController.updateCurrentBusiness);

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
/**
 * @openapi
 * /businesses/me/vouchers:
 *   get:
 *     summary: Get all vouchers for the current business
 *     tags: [Business - Voucher]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: An array of vouchers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Voucher'
 *       401:
 *         description: Unauthorized
 */
router.get('/me/vouchers', isBusiness, voucherCrudController.getVouchers);
/**
 * @openapi
 * /businesses/me/vouchers:
 *   post:
 *     summary: Create a new voucher for the current business
 *     tags: [Business - Voucher]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/VoucherCreate'
 *     responses:
 *       200:
 *         description: The created voucher
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Voucher'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post('/me/vouchers', isBusiness, upload('voucherMedia').single('media'), voucherCrudController.createVoucher);
/**
 * @openapi
 * /businesses/me/vouchers/{voucherId}:
 *   get:
 *     summary: Get a specific voucher for the current business
 *     tags: [Business - Voucher]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: voucherId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the voucher
 *     responses:
 *       200:
 *         description: The requested voucher
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Voucher'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Voucher not found
 */
router.get('/me/vouchers/:voucherId', isBusiness, voucherCrudController.getVoucher);
/**
 * @openapi
 * /businesses/me/vouchers/{voucherId}:
 *   put:
 *     summary: Update a specific voucher for the current business
 *     tags: [Business - Voucher]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: voucherId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the voucher
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VoucherUpdate'
 *     responses:
 *       200:
 *         description: The updated voucher
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Voucher'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Voucher not found
 */
router.put('/me/vouchers/:voucherId', isBusiness, voucherCrudController.updateVoucher);
/**
 * @openapi
 * /businesses/me/vouchers/{voucherId}:
 *   delete:
 *     summary: Delete a specific voucher for the current business
 *     tags: [Business - Voucher]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: voucherId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the voucher
 *     responses:
 *       200:
 *         description: The deleted voucher
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Voucher'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Voucher not found
 */
router.delete('/me/vouchers/:voucherId', isBusiness, voucherCrudController.deleteVoucher);
/**
 * @swagger
 * /businesses/me/campaigns:
 *   get:
 *     summary: Get a list of campaigns for the current business
 *     tags: [Business - Campaign]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of the campaigns
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Campaign'
 */
router.get('/me/campaigns', isBusiness, campaignCrudController.getCampaigns);
/**
 * @swagger
 * /businesses/me/campaigns:
 *   post:
 *     summary: Create a new campaign for the current business
 *     tags: [Business - Campaign]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CampaignCreate'
 *     responses:
 *       200:
 *         description: The created campaign
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Campaign'
 */
router.post('/me/campaigns', isBusiness, campaignCrudController.createCampaign);
/**
 * @swagger
 * /businesses/me/campaigns/{campaignId}:
 *   get:
 *     summary: Get a specific campaign for the current business
 *     tags: [Business - Campaign]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: campaignId
 *         required: true
 *         description: The ID of the campaign
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The campaign data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Campaign'
 */
router.get('/me/campaigns/:campaignId', isBusiness, campaignCrudController.getCampaign);
/**
 * @swagger
 * /businesses/me/campaigns/{campaignId}:
 *   put:
 *     summary: Update a specific campaign for the current business
 *     tags: [Business - Campaign]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: campaignId
 *         required: true
 *         description: The ID of the campaign
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Campaign'
 *     responses:
 *       200:
 *         description: The updated campaign
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Campaign'
 */
router.put('/me/campaigns/:campaignId', isBusiness, campaignCrudController.updateCampaign);
/**
 * @swagger
 * /businesses/me/campaigns/{campaignId}:
 *   delete:
 *     summary: Delete a specific campaign for the current business
 *     tags: [Business - Campaign]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: campaignId
 *         required: true
 *         description: The ID of the campaign
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The deleted campaign
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Campaign'
 */
router.delete('/me/campaigns/:campaignId', isBusiness, campaignCrudController.deleteCampaign);
/**
 * @swagger
 * /businesses/me/rewards:
 *   get:
 *     summary: Get a list of rewards for the current business
 *     tags: [Business - Reward]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of the rewards
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reward'
 */
router.get('/me/rewards', isBusiness, rewardCrudController.getRewards);
/**
 * @swagger
 * /businesses/me/rewards:
 *   post:
 *     summary: Create a new reward for the current business
 *     tags: [Business - Reward]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RewardCreate'
 *     responses:
 *       200:
 *         description: The created reward
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reward'
 */
router.post('/me/rewards', isBusiness, upload('rewardImages').single('image'), rewardCrudController.createReward);

/**
 * @swagger
 * /businesses/me/rewards/{rewardId}:
 *   get:
 *     summary: Get a specific reward for the current business
 *     tags: [Business - Reward]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: rewardId
 *         required: true
 *         description: The ID of the reward
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The reward data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reward'
 */
router.get('/me/rewards/:rewardId', isBusiness, rewardCrudController.getReward);

/**
 * @swagger
 * /businesses/me/rewards/{rewardId}:
 *   put:
 *     summary: Update a specific reward for the current business
 *     tags: [Business - Reward]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: rewardId
 *         required: true
 *         description: The ID of the reward
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reward'
 *     responses:
 *       200:
 *         description: The updated reward
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reward'
 */
router.put('/me/rewards/:rewardId', isBusiness, rewardCrudController.updateReward);

/**
 * @swagger
 * /businesses/me/rewards/{rewardId}:
 *   delete:
 *     summary: Delete a specific reward for the current business
 *     tags: [Business - Reward]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: rewardId
 *         required: true
 *         description: The ID of the reward
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The deleted reward
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reward'
 */
router.delete('/me/rewards/:rewardId', isBusiness, rewardCrudController.deleteReward);

export default router;
