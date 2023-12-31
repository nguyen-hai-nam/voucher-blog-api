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

router.get('/:business_id/products/count', isAuth, businessController.countProducts);
router.get('/:business_id/products', isAuth, businessController.getAllProducts);
router.post(
    '/:businessId/products',
    isAuth,
    upload.fields([{ name: 'productImages', maxCount: 4 }]),
    businessController.createProduct
);
router.get('/:business_id/products/:id', isAuth, businessController.getProductById);
router.patch('/:business_id/products/:id', isAuth, businessController.updateProductById);
router.delete('/:business_id/products/:id', isAuth, businessController.deleteProductById);

router.get('/:businessId/productCategories/count', isAuth, businessController.countProductCategories);
router.get('/:businessId/productCategories', isAuth, businessController.getProductCategories);
router.post('/:businessId/productCategories', isAuth, businessController.createProductCategory);
router.get('/:businessId/productCategories/:id', isAuth, businessController.getProductCategory);
router.patch('/:businessId/productCategories/:id', isAuth, businessController.updateProductCategory);
router.delete('/:businessId/productCategories/:id', isAuth, businessController.deleteProductCategory);

router.get('/:business_id/campaigns/count', isAuth, businessController.countCampaigns);
router.get('/:business_id/campaigns', isAuth, businessController.getAllCampaigns);
router.post('/:business_id/campaigns', isAuth, upload.any(), businessController.createCampaign);
router.get('/:business_id/campaigns/:id', isAuth, businessController.getCampaignById);
router.patch('/:business_id/campaigns/:id', isAuth, businessController.updateCampaignById);
router.delete('/:business_id/campaigns/:id', isAuth, businessController.deleteCampaignById);

// TODO: move to user route
router.post('/:id/follow', isAuth, businessController.followBusinessById);
router.post('/:id/unfollow', isAuth, businessController.unfollowBusinessById);

export default router;
