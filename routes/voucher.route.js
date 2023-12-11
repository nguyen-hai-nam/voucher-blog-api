import express from 'express';

import voucherController from '../controllers/voucher.controller.js';
import { isAuth } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/count', isAuth, voucherController.countVouchers);
router.get('/', isAuth, voucherController.getAllVouchers);
router.post('/', isAuth, voucherController.createVoucher);
router.get('/:id', isAuth, voucherController.getVoucherById);
router.patch('/:id', isAuth, voucherController.updateVoucherById);
router.delete('/:id', isAuth, voucherController.deleteVoucherById);

export default router;
