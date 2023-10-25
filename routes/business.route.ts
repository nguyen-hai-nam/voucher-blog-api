import express from 'express';

import BusinessController from '../controllers/business.controller';
import { isAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/count', isAuth, BusinessController.countBusinesses);
router.get('/', isAuth, BusinessController.getAllBusinesses);
router.post('/', isAuth, BusinessController.createBusiness);
router.get('/:id', isAuth, BusinessController.getBusinessById);
router.patch('/:id', isAuth, BusinessController.updateBusinessById);
router.delete('/:id', isAuth, BusinessController.deleteBusinessById);

router.post('/:business_id/address', isAuth, BusinessController.createBusinessAddress);
router.patch('/:business_id/address/:address_id', isAuth, BusinessController.updateBusinessAddressById);

router.post('/:business_id/timetable', isAuth, BusinessController.createBusinessTimetable);
router.patch('/:business_id/timetable/:timetable_id', isAuth, BusinessController.updateBusinessTimetableById);

router.get('/:business_id/products/count', isAuth, BusinessController.countProducts);
router.get('/:business_id/products', isAuth, BusinessController.getAllProducts);
router.post('/:business_id/products', isAuth, BusinessController.createProduct);
router.get('/:business_id/products/:id', isAuth, BusinessController.getProductById);
router.patch('/:business_id/products/:id', isAuth, BusinessController.updateProductById);
router.delete('/:business_id/products/:id', isAuth, BusinessController.deleteProductById);

router.get('/:business_id/vouchers/count', isAuth, BusinessController.countVouchers);
router.get('/:business_id/vouchers', isAuth, BusinessController.getAllVouchers);
router.post('/:business_id/vouchers', isAuth, BusinessController.createVoucher);
router.get('/:business_id/vouchers/:id', isAuth, BusinessController.getVoucherById);
router.patch('/:business_id/vouchers/:id', isAuth, BusinessController.updateVoucherById);
router.delete('/:business_id/vouchers/:id', isAuth, BusinessController.deleteVoucherById);

router.get('/:business_id/posts/count', isAuth, BusinessController.countPosts);
router.get('/:business_id/posts', isAuth, BusinessController.getAllPosts);
router.post('/:business_id/posts', isAuth, BusinessController.createPost);
router.get('/:business_id/posts/:id', isAuth, BusinessController.getPostById);
router.patch('/:business_id/posts/:id', isAuth, BusinessController.updatePostById);
router.delete('/:business_id/posts/:id', isAuth, BusinessController.deletePostById);

// TODO: move to user route
router.post('/:id/follow', isAuth, BusinessController.followBusinessById);
router.post('/:id/unfollow', isAuth, BusinessController.unfollowBusinessById);

export default router;
