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
router.get('/:user_id/addresses', isAuth, userController.getAllUserAddresses);
router.get('/:id', isAuth, userController.getUserById);
router.patch('/:id', isAuth, userController.updateUserById);
router.delete('/:id', isAdmin, userController.deleteUserById);
router.get('/:userId/vouchers', isAdmin, userController.getAllCollectedVouchers);
router.post('/:userId/vouchers/collect/:voucherId', isAdmin, userController.collectVoucher);

export default router;
