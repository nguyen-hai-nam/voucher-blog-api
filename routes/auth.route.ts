import express from 'express';
import authController from '../controllers/auth.controller';
import { isAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/me', isAuth, authController.getCurrentUser);
router.post('/register', authController.register);
router.post('/login', authController.login);
router.patch('/change-password', isAuth, authController.changePassword);

export default router;
