import express from 'express';

import userAddressController from '../controllers/user_address.controller';
import userController from '../controllers/user.controller';
import { isAuth, isAdmin } from '../middlewares/auth.middleware';

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
router.get('/:id/posts', isAuth, userController.getPosts);
router.post('/:id/posts/love/:postId', isAuth, userController.lovePost);
router.post('/:id/posts/unlove/:postId', isAuth, userController.unlovePost);
router.post('/:id/posts/save/:postId', isAuth, userController.savePost);
router.post('/:id/posts/unsave/:postId', isAuth, userController.unsavePost);

export default router;
