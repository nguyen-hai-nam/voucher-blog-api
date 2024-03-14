
import createHttpError from "http-errors";

import prisma from "../../../../../config/prisma.js";

const getCollectedVouchers = async (req, res, next) => {
    try {
        const { id } = req.user;
        const result = await prisma.collectedVoucher.findMany({
            where: { user_id: id },
            include: {
                voucher: {
                    include: {
                        campaign: true,
                        business: true
                    }
                }
            }
        });
        res.json(result);
    } catch (e) {
        next(e);
    }
}

const getCollectedVoucher = async (req, res, next) => {
    try {
        const { id } = req.user;
        const { collectedVoucherId } = req.params;
        const isOwner = await prisma.collectedVoucher.findUnique({
            where: {
                id: collectedVoucherId,
                user_id: id
            }
        });
        if (!isOwner) {
            throw createHttpError(401);
        }
        const result = await prisma.collectedVoucher.findUnique({
            where: { 
                id: collectedVoucherId,
            },
            include: {
                voucher: {
                    include: {
                        campaign: true,
                        business: true
                    }
                }
            }
        });
        res.json(result);
    } catch (e) {
        next(e);
    }
}

const deleteCollectedVoucher = async (req, res, next) => {
    try {
        const { id } = req.user;
        const { collectedVoucherId } = req.params;
        const isOwner = await prisma.collectedVoucher.findFirst({
            where: {
                id: collectedVoucherId,
                user_id: id
            }
        });
        if (!isOwner) {
            throw createHttpError(401);
        }
        const result = await prisma.collectedVoucher.delete({
            where: { user_id: id },
            select: { id: true }
        });
        res.json(result);
    } catch (e) {
        next(e);
    }
}

export default {
    getCollectedVouchers,
    getCollectedVoucher,
    deleteCollectedVoucher
};