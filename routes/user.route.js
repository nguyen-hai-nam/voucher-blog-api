import express from 'express';

import userAddressController from '../controllers/user-address.controller.js';
import userController from '../controllers/user.controller.js';
import { isAuth, isAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/addresses', isAuth, userAddressController.getAllUserAddresses);
router.post('/addresses', isAuth, userAddressController.createUserAddress);
router.patch('/addresses/:id', isAuth, userAddressController.updateUserAddressById);
router.delete('/addresses/:id', isAuth, userAddressController.deleteUserAddressById);

router.post('/collectVoucher/:voucherId', isAuth, userController.collectVoucher);
router.post('/discardVoucher/:voucherId', isAuth, userController.discardVoucher);
router.post('/loveCampaign/:campaignId', isAuth, userController.loveCampagin);
router.post('/unloveCampaign/:campaignId', isAuth, userController.unloveCampaign);
router.post('/saveCampaign/:campaignId', isAuth, userController.saveCampaign);
router.post('/unsaveCampaign/:campaignId', isAuth, userController.unsaveCampaign);
router.get('/distance/:userAddressId/:businessId', isAuth, userController.getDistance);
router.post('/follow/:businessId', isAuth, userController.followBusiness);
router.post('/unfollow/:businessId', isAuth, userController.unfollowBusiness);

router.get('/count', isAdmin, userController.countUsers);
router.get('/', isAdmin, userController.getAllUsers);
router.get('/:id', isAuth, userController.getUserById);
router.patch('/:id', isAuth, userController.updateUserById);
router.delete('/:id', isAdmin, userController.deleteUserById);

export default router;
