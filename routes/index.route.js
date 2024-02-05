import express from 'express';
import docRouter from './doc.js';
import authRouter from './auth.route.js';
import userRouter from './user.route.js';
import businessRouter from './business.route.js';
import productRouter from './product.route.js';
import productCategoryRouter from './product-category.route.js';
import voucherRouter from './voucher.route.js';
import postRouter from './campaign.route.js';
import newsfeedRouter from './newsfeed.route.js';
import userModuleRouter from '../modules/user/routes/index.js';
import businessModuleRouter from '../modules/business/routes/index.js';

const router = express.Router();

router.use('/docs', docRouter);
router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/businesses', businessRouter);
router.use('/products', productRouter);
router.use('/productCategories', productCategoryRouter);
router.use('/vouchers', voucherRouter);
router.use('/campaigns', postRouter);
router.use('/newsfeed', newsfeedRouter);
router.use('/user', userModuleRouter);
router.use('/business', businessModuleRouter);
router.use((req, res) => {
    res.status(404).json({ message: 'Page Not Found' });
});

export default router;
