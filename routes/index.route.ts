import express from 'express';
import AuthRouter from './auth.route';
import UserRouter from './user.route';
import BusinessRouter from './business.route';
import ProductRouter from './product.route';

const router = express.Router();

router.use('/auth', AuthRouter);
router.use('/users', UserRouter);
router.use('/businesses', BusinessRouter);
router.use('/products', ProductRouter);
router.use((req, res) => {
	res.status(404).json({ message: 'Page Not Found' });
});

export default router;
