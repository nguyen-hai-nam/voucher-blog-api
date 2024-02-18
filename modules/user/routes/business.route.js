import express from 'express';

import businessCrudController from '../controllers/businesses/crud.controller.js';

const router = express.Router();

router.get('/:businessId', businessCrudController.getBusiness);
router.get('/:businessId/products', businessCrudController.getProducts);
router.get('/:businessId/products/:productId', businessCrudController.getProduct);
router.get('/:businessId/campaigns', businessCrudController.getCampaigns);
router.get('/:businessId/campaigns/:campaignId', businessCrudController.getCampaign);
router.get('/:businessId/vouchers', businessCrudController.getVouchers);
router.get('/:businessId/vouchers/:voucherId', businessCrudController.getVoucher);
router.get('/:businessId/rewards', businessCrudController.getRewards);
router.get('/:businessId/rewards/:rewardId', businessCrudController.getReward);

export default router;
