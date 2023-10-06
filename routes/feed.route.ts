import express from 'express';

import FeedController from '../controllers/feed.controller';
import { isAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/', isAuth, FeedController.getNewsfeed);
router.get('/suggest', isAuth, FeedController.getUnfollowedNearbyBusinesses);

export default router;
