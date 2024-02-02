import express from 'express';

import { isUser } from '../middlewares/user-auth.middleware.js';
import userCrudController from '../controllers/users/crud.controller.js';
import userAddressCrudController from '../controllers/users/user-addresses/crud.controller.js';

const router = express.Router();

router.get('/me', isUser, userCrudController.getCurrentUser);
router.put('/me', isUser, userCrudController.updateCurrentUser);

router.get('/me/userAddresses', isUser, userAddressCrudController.getUserAddresses);
router.post('/me/userAddresses', isUser, userAddressCrudController.createUserAddress);
router.get('/me/userAddresses/:userAddressId', isUser, userAddressCrudController.getUserAddress);
router.put('/me/userAddresses/:userAddressId', isUser, userAddressCrudController.updateUserAddress);
router.delete('/me/userAddresses/:userAddressId', isUser, userAddressCrudController.deleteUserAddress);

export default router;
