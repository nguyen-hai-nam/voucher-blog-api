import express from 'express';

import { isUser } from '../middlewares/user-auth.middleware.js';
import userCrudController from '../controllers/users/crud.controller.js';
import userActionController from '../controllers/users/action.controller.js';
import userAddressCrudController from '../controllers/users/user-addresses/crud.controller.js';
import collectedRewardController from '../controllers/users/collectedRewards/crud.controller.js';

const router = express.Router();

router.get('/me', isUser, userCrudController.getCurrentUser);
router.get('/me/managingBusinesses', isUser, userCrudController.getManagingBusinesses);
router.get('/me/followingBusinesses', isUser, userCrudController.getFollowingBusinesses);
router.put('/me', isUser, userCrudController.updateCurrentUser);

router.get('/me/getTickHistory/:businessId', isUser, userActionController.getTickHistory);
router.get('/me/getCustomerInfos', isUser, userActionController.getCustomerInfos);
router.post('/me/collectReward/:rewardId', isUser, userActionController.collectReward);
router.put('/me/redeemReward/:collectedRewardId', isUser, userActionController.redeemReward);
router.post('/me/collectVoucher/:voucherId', isUser, userActionController.collectVoucher);
router.put('/me/redeemVoucher/:collectedVoucherId', isUser, userActionController.redeemVoucher);

router.get('/me/userAddresses', isUser, userAddressCrudController.getUserAddresses);
router.post('/me/userAddresses', isUser, userAddressCrudController.createUserAddress);
router.get('/me/userAddresses/:userAddressId', isUser, userAddressCrudController.getUserAddress);
router.put('/me/userAddresses/:userAddressId', isUser, userAddressCrudController.updateUserAddress);
router.delete('/me/userAddresses/:userAddressId', isUser, userAddressCrudController.deleteUserAddress);

router.get('/me/collectedRewards', isUser, collectedRewardController.getCollectedRewards);
router.get('/me/collectedRewards/:collectedRewardId', isUser, collectedRewardController.getCollectedReward);
router.delete('/me/collectedRewards/:collectedRewardId', isUser, collectedRewardController.deleteCollectedReward);


export default router;
