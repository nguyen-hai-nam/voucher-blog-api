import express from 'express';
import UserRoute from './user.route';
import AuthRoute from './auth.route';

const router = express.Router();

router.use('/auth', AuthRoute);
router.use('/users', UserRoute);
router.use((req, res) => {
	res.status(404).json({ message: 'Page Not Found' });
});

export default router;
