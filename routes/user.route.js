import express from 'express';

import userAddressController from '../controllers/user_address.controller.js';
import userController from '../controllers/user.controller.js';
import { isAuth, isAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/addresses', isAuth, userAddressController.getAllUserAddresses);
router.post('/addresses', isAuth, userAddressController.createUserAddress);
router.patch('/addresses/:id', isAuth, userAddressController.updateUserAddressById);
router.delete('/addresses/:id', isAuth, userAddressController.deleteUserAddressById);
router.get('/count', isAdmin, userController.countUsers);
router.get('/', isAdmin, userController.getAllUsers);
router.get('/:id', isAuth, userController.getUserById);
router.patch('/:id', isAuth, userController.updateUserById);
router.delete('/:id', isAdmin, userController.deleteUserById);
router.get('/:id/addresses', isAuth, userController.getAddresses);
router.get('/:id/managing-businesses', isAuth, userController.getManagingBusinesses);
router.get('/:id/following-businesses', isAuth, userController.getFollowingBusinesses);
router.get('/:id/vouchers', isAuth, userController.getVouchers);
router.post('/:id/vouchers/collect/:voucherId', isAuth, userController.collectVoucher);
router.post('/:id/vouchers/discard/:voucherId', isAuth, userController.discardVoucher);
router.post('/:id/posts/love/:postId', isAuth, userController.loveCampagin);
router.post('/:id/posts/unlove/:postId', isAuth, userController.unloveCampaign);
router.post('/:id/posts/save/:postId', isAuth, userController.saveCampaign);
router.post('/:id/posts/unsave/:postId', isAuth, userController.unsaveCampaign);

router.get('/distance/:userAddressId/:businessId', isAuth, userController.getDistance);
router.post('/follow/:businessId', isAuth, userController.followBusiness);
router.post('/unfollow/:businessId', isAuth, userController.unfollowBusiness);

export default router;
