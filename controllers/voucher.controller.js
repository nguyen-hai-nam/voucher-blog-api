import prisma from '../config/prisma.js';

const countVouchers = async (req, res) => {
    try {
        const count = await prisma.voucher.count();
        return res.status(200).json({ message: 'Success', data: count });
    } catch (error) {
        return res.status(500).json({ message: 'Error', error });
    }
};

const getAllVouchers = async (req, res) => {
    const { page = 1, perPage = 10 } = req.query;
    const skip = (page - 1) * perPage;
    const take = perPage;
    try {
        const vouchers = await prisma.voucher.findMany({
            skip,
            take
        });
        return res.status(200).json({ message: 'Success', page, perPage, data: vouchers });
    } catch (error) {
        return res.status(500).json({ message: 'Error', error });
    }
};

const createVoucher = async (req, res) => {
    try {
        const { business_id, ...voucherData } = req.body.data;
        const voucher = await prisma.voucher.create({
            data: {
                ...voucherData,
                business: {
                    connect: { id: business_id }
                }
            }
        });
        return res.status(201).json({ message: 'Success', data: voucher });
    } catch (error) {
        return res.status(500).json({ message: 'Error', error });
    }
};

const getVoucherById = async (req, res) => {
    const { id } = req.params;
    try {
        const voucher = await prisma.voucher.findUnique({
            where: { id }
        });
        if (!voucher) {
            return res.status(404).json({ message: 'Not found', error: 'Not found' });
        }
        return res.status(200).json({ message: 'Success', data: voucher });
    } catch (error) {
        return res.status(500).json({ message: 'Error', error });
    }
};

const updateVoucherById = async (req, res) => {
    const { id } = req.params;
    try {
        const voucher = await prisma.voucher.update({
            where: { id },
            data: req.body.data
        });
        return res.status(200).json({ message: 'Success', data: voucher });
    } catch (error) {
        return res.status(500).json({ message: 'Error', error });
    }
};

const deleteVoucherById = async (req, res) => {
    const { id } = req.params;
    try {
        const voucher = await prisma.voucher.delete({
            where: { id }
        });
        return res.status(200).json({ message: 'Success', data: voucher });
    } catch (error) {
        return res.status(500).json({ message: 'Error', error });
    }
};

export default {
    countVouchers,
    getAllVouchers,
    createVoucher,
    getVoucherById,
    updateVoucherById,
    deleteVoucherById
};
