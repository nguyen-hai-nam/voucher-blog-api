import express from 'express';

import UserAddressController from '../controllers/user_address.controller';
import UserController from '../controllers/user.controller';
import { isAuth, isAdmin } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/addresses', isAuth, UserAddressController.getAllUserAddresses);
router.post('/addresses', isAuth, UserAddressController.createUserAddress);
router.patch('/addresses/:id', isAuth, UserAddressController.updateUserAddressById);
router.delete('/addresses/:id', isAuth, UserAddressController.deleteUserAddressById);
router.get('/count', isAdmin, UserController.countUsers);
router.get('/', isAdmin, UserController.getAllUsers);
router.get('/:id', isAuth, UserController.getUserById);
router.patch('/:id', isAuth, UserController.updateUserById);

export default router;
