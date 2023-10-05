import express from 'express';
import AuthRouter from './auth.route';
import UserRouter from './user.route';
import BusinessRouter from './business.route';
import ProductRouter from './product.route';
import VoucherRouter from './voucher.route';
import PostRouter from './post.route';
import FeedRouter from './feed.route';

const router = express.Router();

router.use('/auth', AuthRouter);
router.use('/users', UserRouter);
router.use('/businesses', BusinessRouter);
router.use('/products', ProductRouter);
router.use('/vouchers', VoucherRouter);
router.use('/posts', PostRouter);
router.use('/feed', FeedRouter);
router.use((req, res) => {
	res.status(404).json({ message: 'Page Not Found' });
});

export default router;
