import express from 'express';

import { isUser } from '../middlewares/user-auth.middleware.js';

import authController from '../controllers/auth/auth.controller.js';

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/change-password', isUser, authController.changePassword);
router.post('/loginBusiness/:businessId', isUser, authController.loginBusiness);

export default router;
