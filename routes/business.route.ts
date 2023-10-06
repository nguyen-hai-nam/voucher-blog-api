import express from 'express';

import BusinessController from '../controllers/business.controller';
import { isAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/count', isAuth, BusinessController.countBusinesses);
router.get('/', isAuth, BusinessController.getAllBusinesses);
router.post('/', isAuth, BusinessController.createBusiness);
router.get('/:id', isAuth, BusinessController.getBusinessById);
router.patch('/:id', isAuth, BusinessController.updateBusinessById);
router.delete('/:id', isAuth, BusinessController.deleteBusinessById);
router.post('/:id/follow', isAuth, BusinessController.followBusinessById);
router.post('/:id/unfollow', isAuth, BusinessController.unfollowBusinessById);

export default router;
