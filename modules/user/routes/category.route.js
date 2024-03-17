import express from 'express';

import { isUser } from '../middlewares/user-auth.middleware.js';
import categoryCrudController from '../controllers/categories/crud.controller.js';

const router = express.Router();

router.get('/', isUser, categoryCrudController.getCategories);

export default router;