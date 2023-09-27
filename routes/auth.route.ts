import express from 'express';
import AuthController from '../controllers/auth.controller';
import { isAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.patch('/change-password', isAuth, AuthController.changePassword);

export default router;
