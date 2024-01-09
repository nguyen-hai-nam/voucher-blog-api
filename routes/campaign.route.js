import express from 'express';

import campaignController from '../controllers/campaign.controller.js';
import { isAuth } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/count', isAuth, campaignController.countCampaigns);
router.get('/', isAuth, campaignController.getAllCampaigns);
router.post('/', isAuth, campaignController.createCampaign);
router.get('/:id', isAuth, campaignController.getCampaignById);
router.patch('/:id', isAuth, campaignController.updateCampaignById);
router.delete('/:id', isAuth, campaignController.deleteCampaignById);

export default router;
