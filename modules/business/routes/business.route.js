import express from 'express';

import { isBusiness } from '../middlewares/business-auth.middleware.js';
import businessActionController from '../controllers/businesses/action.controller.js';

const router = express.Router();

router.post('/me/tick/:userId', isBusiness, businessActionController.tickCustomer);

export default router;
