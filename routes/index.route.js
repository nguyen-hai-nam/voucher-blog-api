import express from 'express';
import authRouter from './auth.route.js';
import userRouter from './user.route.js';
import businessRouter from './business.route.js';
import productRouter from './product.route.js';
import voucherRouter from './voucher.route.js';
import postRouter from './post.route.js';
import newsfeedRouter from './newsfeed.route.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/businesses', businessRouter);
router.use('/products', productRouter);
router.use('/vouchers', voucherRouter);
router.use('/posts', postRouter);
router.use('/newsfeed', newsfeedRouter);
router.use((req, res) => {
    res.status(404).json({ message: 'Page Not Found' });
});

export default router;
