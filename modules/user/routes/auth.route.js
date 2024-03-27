import express from 'express';

import { isUser } from '../middlewares/user-auth.middleware.js';

import authController from '../controllers/auth/auth.controller.js';

const router = express.Router();

router.get('/me', isUser, authController.getCurrentUser);
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/change-password', isUser, authController.changePassword);
router.post('/loginBusiness/:businessId', isUser, authController.loginBusiness);
router.post('/register-business', isUser, authController.registerBusiness);

export default router;
