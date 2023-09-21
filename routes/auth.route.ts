/* eslint-disable @typescript-eslint/ban-ts-comment */
import express from 'express';
import AuthController from '../controllers/auth.controller';
import { isAuth } from '../middlewares/auth.middleware';

const router = express.Router();

// @ts-ignore
router.post('/register', AuthController.register);
// @ts-ignore
router.post('/login', AuthController.login);
// @ts-ignore
router.patch('/change-password', isAuth, AuthController.changePassword);

export default router;
