import express from 'express';

import FeedController from '../controllers/feed.controller';
import { isAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/', isAuth, FeedController.getNewsfeed);


export default router;
