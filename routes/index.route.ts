import express from 'express';
import authRouter from './auth.route';
import userRouter from './user.route';
import businessRouter from './business.route';
import productRouter from './product.route';
import voucherRouter from './voucher.route';
import postRouter from './post.route';
import newsfeedRouter from './newsfeed.route';

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
