import express from 'express';

import FeedController from '../controllers/feed.controller';
import { isAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/:user_id/:address_id', isAuth, FeedController.getNewsfeed);
router.get('/:user_id/:address_id/suggestion', isAuth, FeedController.getBusinessSuggestion);

export default router;
