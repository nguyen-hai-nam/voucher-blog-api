import express from 'express';

import newsfeedController from '../controllers/newsfeed.controller';
import { isAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/:user_id/:address_id', isAuth, newsfeedController.getNewsfeed);
router.get('/:user_id/:address_id/suggestion', isAuth, newsfeedController.getBusinessSuggestion);

export default router;
