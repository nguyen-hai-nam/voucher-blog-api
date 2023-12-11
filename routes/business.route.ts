import express from 'express';

import businessController from '../controllers/business.controller';
import { upload } from '../middlewares/upload.middleware';
import { isAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/count', isAuth, businessController.countBusinesses);
router.get('/categories', isAuth, businessController.getCategories);

router.get('/', isAuth, businessController.getAllBusinesses);
router.post(
	'/',
	isAuth,
	upload.fields([
		{ name: 'businessAvatarImage', maxCount: 1 },
		{ name: 'businessFrontImages', maxCount: 4 },
		{ name: 'businessInsideImages', maxCount: 4 },
		{ name: 'businessMenuImages', maxCount: 4 },
		{ name: 'representerNationalIdImages', maxCount: 2 },
		{ name: 'representerLicenseImages', maxCount: 4 }
	]),
	businessController.createBusiness
);
router.get('/:id', isAuth, businessController.getBusinessById);
router.patch('/:id', isAuth, businessController.updateBusinessById);
router.delete('/:id', isAuth, businessController.deleteBusinessById);

router.post('/:business_id/address', isAuth, businessController.createBusinessAddress);
router.patch('/:business_id/address/:address_id', isAuth, businessController.updateBusinessAddressById);

router.post('/:business_id/timetable', isAuth, businessController.createBusinessTimetable);
router.patch('/:business_id/timetable/:timetable_id', isAuth, businessController.updateBusinessTimetableById);

router.get('/:business_id/products/count', isAuth, businessController.countProducts);
router.get('/:business_id/products', isAuth, businessController.getAllProducts);
router.post('/:business_id/products', isAuth, businessController.createProduct);
router.get('/:business_id/products/:id', isAuth, businessController.getProductById);
router.patch('/:business_id/products/:id', isAuth, businessController.updateProductById);
router.delete('/:business_id/products/:id', isAuth, businessController.deleteProductById);

router.get('/:business_id/vouchers/count', isAuth, businessController.countVouchers);
router.get('/:business_id/vouchers', isAuth, businessController.getAllVouchers);
router.post('/:business_id/vouchers', isAuth, businessController.createVoucher);
router.get('/:business_id/vouchers/:id', isAuth, businessController.getVoucherById);
router.patch('/:business_id/vouchers/:id', isAuth, businessController.updateVoucherById);
router.delete('/:business_id/vouchers/:id', isAuth, businessController.deleteVoucherById);

router.get('/:business_id/posts/count', isAuth, businessController.countPosts);
router.get('/:business_id/posts', isAuth, businessController.getAllPosts);
router.post('/:business_id/posts', isAuth, businessController.createPost);
router.get('/:business_id/posts/:id', isAuth, businessController.getPostById);
router.patch('/:business_id/posts/:id', isAuth, businessController.updatePostById);
router.delete('/:business_id/posts/:id', isAuth, businessController.deletePostById);

// TODO: move to user route
router.post('/:id/follow', isAuth, businessController.followBusinessById);
router.post('/:id/unfollow', isAuth, businessController.unfollowBusinessById);

export default router;
