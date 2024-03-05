
import createHttpError from "http-errors";

import prisma from "../../../../../config/prisma.js";

const getCollectedVouchers = async (req, res, next) => {
    try {
        const { id } = req.user;
        const result = await prisma.collectedVoucher.findMany({
            where: { user_id: id },
            include: {
                voucher: true
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
        const isOwner = await prisma.collectedVoucher.findFirst({
            where: {
                id: collectedVoucherId,
                user_id: id
            }
        });
        if (!isOwner) {
            throw createHttpError(401);
        }
        const result = await prisma.collectedVoucher.findFirst({
            where: { user_id: id },
            select: {
                id: true,
                status: true,
                reward: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        image_url: true,
                        tick_price: true,
                        business: {
                            select: {
                                name: true,
                                avatar_image_url: true,
                                address_name: true,
                                lat: true,
                                lng: true,
                            }
                        }
                    }
                },
                created_at: true,
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