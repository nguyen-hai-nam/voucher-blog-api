import express from 'express';

import businessController from '../controllers/business.controller.js';
import { upload } from '../middlewares/upload.middleware.js';
import { isAuth } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/count', isAuth, businessController.countBusinesses);
router.get('/categories', isAuth, businessController.getCategories);

router.get('/', isAuth, businessController.getAllBusinesses);
router.post(
    '/',
    isAuth,
    upload.fields([
        { name: 'avatarImage', maxCount: 1 },
        { name: 'frontImages', maxCount: 4 },
        { name: 'insideImages', maxCount: 4 },
        { name: 'menuImages', maxCount: 4 },
        { name: 'licenseImages', maxCount: 4 }
    ]),
    businessController.createBusiness
);
router.get('/:id', isAuth, businessController.getBusinessById);
router.patch('/:id', isAuth, businessController.updateBusinessById);
router.delete('/:id', isAuth, businessController.deleteBusinessById);

router.get('/:businessId/products/count', isAuth, businessController.countProducts);
router.get('/:businessId/products', isAuth, businessController.getAllProducts);
router.post(
    '/:businessId/products',
    isAuth,
    upload.fields([{ name: 'productImages', maxCount: 4 }]),
    businessController.createProduct
);
router.get('/:businessId/products/:id', isAuth, businessController.getProductById);
router.patch('/:businessId/products/:id', isAuth, businessController.updateProductById);
router.delete('/:businessId/products/:id', isAuth, businessController.deleteProductById);

router.get('/:businessId/campaigns/count', isAuth, businessController.countCampaigns);
router.get('/:businessId/campaigns', isAuth, businessController.getAllCampaigns);
router.post('/:businessId/campaigns', isAuth, upload.any(), businessController.createCampaign);
router.get('/:businessId/campaigns/:id', isAuth, businessController.getCampaignById);
router.patch('/:businessId/campaigns/:id', isAuth, businessController.updateCampaignById);
router.delete('/:businessId/campaigns/:id', isAuth, businessController.deleteCampaignById);

export default router;
