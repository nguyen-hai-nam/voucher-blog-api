import express from 'express';

import VoucherController from '../controllers/voucher.controller';
import { isAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/count', isAuth, VoucherController.countVouchers);
router.get('/', isAuth, VoucherController.getAllVouchers);
router.post('/', isAuth, VoucherController.createVoucher);
router.get('/:id', isAuth, VoucherController.getVoucherById);
router.patch('/:id', isAuth, VoucherController.updateVoucherById);
router.delete('/:id', isAuth, VoucherController.deleteVoucherById);

export default router;
