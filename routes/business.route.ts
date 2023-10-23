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
router.post('/:business_id/address', isAuth, BusinessController.createBusinessAddress);
router.patch('/:business_id/address/:address_id', isAuth, BusinessController.updateBusinessAddressById);
router.post('/:business_id/timetable', isAuth, BusinessController.createBusinessTimetable);
router.patch('/:business_id/timetable/:timetable_id', isAuth, BusinessController.updateBusinessTimetableById);
router.post('/:id/follow', isAuth, BusinessController.followBusinessById);
router.post('/:id/unfollow', isAuth, BusinessController.unfollowBusinessById);

export default router;
