import prisma from '../config/prisma.js';
import { parseQuery } from '../helpers/http.helper.js';

const countVouchers = async (req, res, next) => {
    const query = parseQuery(req.query);
    try {
        const count = await prisma.voucher.count({
            where: query.where
        });
        return res.status(200).json({ success: true, data: count });
    } catch (error) {
        next(error);
    }
};

const getAllVouchers = async (req, res, next) => {
    const query = parseQuery(req.query);
    try {
        const vouchers = await prisma.voucher.findMany({
            where: query.where,
            skip: query.skip,
            take: query.take,
            select: query.select,
            include: query.include
        });
        return res.status(200).json({ success: true, data: vouchers });
    } catch (error) {
        next(error);
    }
};

const createVoucher = async (req, res, next) => {
    const query = parseQuery(req.query);
    try {
        const { business_id, ...voucherData } = req.body.data;
        const voucher = await prisma.voucher.create({
            data: {
                ...voucherData,
                business: {
                    connect: { id: business_id }
                }
            },
            select: query.select,
            include: query.include
        });
        return res.status(201).json({ success: true, data: voucher });
    } catch (error) {
        next(error);
    }
};

const getVoucherById = async (req, res, next) => {
    const { id } = req.params;
    const query = parseQuery(req.query);
    try {
        const voucher = await prisma.voucher.findUnique({
            where: { id },
            select: query.select,
            include: query.include
        });
        if (!voucher) {
            return res.status(404).json({ message: 'Not found', error: 'Not found' });
        }
        return res.status(200).json({ success: true, data: voucher });
    } catch (error) {
        next(error);
    }
};

const updateVoucherById = async (req, res, next) => {
    const { id } = req.params;
    const query = parseQuery(req.query);
    try {
        const voucher = await prisma.voucher.update({
            where: { id },
            data: req.body,
            select: query.select,
            include: query.include
        });
        return res.status(200).json({ success: true, data: voucher });
    } catch (error) {
        next(error);
    }
};

const deleteVoucherById = async (req, res, next) => {
    const { id } = req.params;
    const query = parseQuery(req.query);
    try {
        const voucher = await prisma.voucher.delete({
            where: { id },
            select: query.select,
            include: query.include
        });
        return res.status(200).json({ success: true, data: voucher });
    } catch (error) {
        next(error);
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
