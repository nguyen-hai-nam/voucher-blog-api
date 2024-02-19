
import createHttpError from "http-errors";

import prisma from "../../../../../config/prisma.js";

const getCollectedRewards = async (req, res, next) => {
    try {
        const { id } = req.user;
        const result = await prisma.collectedReward.findMany({
            where: { user_id: id },
            select: {
                id: true,
                status: true,
                reward: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
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

const getCollectedReward = async (req, res, next) => {
    try {
        const { id } = req.user;
        const { collectedRewardId } = req.params;
        const isOwner = await prisma.collectedReward.findFirst({
            where: {
                id: collectedRewardId,
                user_id: id
            }
        });
        if (!isOwner) {
            throw createHttpError(401);
        }
        const result = await prisma.collectedReward.findFirst({
            where: { user_id: id },
            select: {
                id: true,
                status: true,
                reward: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
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

const deleteCollectedReward = async (req, res, next) => {
    try {
        const { id } = req.user;
        const { collectedRewardId } = req.params;
        const isOwner = await prisma.collectedReward.findFirst({
            where: {
                id: collectedRewardId,
                user_id: id
            }
        });
        if (!isOwner) {
            throw createHttpError(401);
        }
        const result = await prisma.collectedReward.delete({
            where: { user_id: id },
            select: { id: true }
        });
        res.json(result);
    } catch (e) {
        next(e);
    }
}

export default {
    getCollectedRewards,
    getCollectedReward,
    deleteCollectedReward
};