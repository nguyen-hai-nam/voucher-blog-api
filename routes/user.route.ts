import express from 'express';

import UserController from '../controllers/user.controller';
import { isAuth, isAdmin } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/count', isAdmin, UserController.countUsers);
router.get('/', isAdmin, UserController.getAllUsers);
router.get('/:id', isAuth, UserController.getUserById);
router.patch('/:id', isAuth, UserController.updateUserById);

export default router;
