import fs from "fs";
import createHttpError from "http-errors";

import prisma from "../../../../../config/prisma.js";
import schemas from "./schemas.js";

const getRewards = async (req, res, next) => {
    try {
        const businessId = req.business.id;
        const result = await prisma.reward.findMany({
            where: { business_id: businessId },
            select: {
                id: true,
                name: true,
                description: true,
                image_url: true,
                tick_price: true,
            }
        });
        res.json(result);
    } catch (e) {
        next(e);
    }
}

const createReward = async (req, res, next) => {
    try {
        const { value: body, error: bodyError } = schemas.createRewardBody.validate(req.body);
        if (bodyError) {
            throw createHttpError(400);
        }
        if (!req.file) {
            throw createHttpError(400);
        }
        const imageUrl = `${req.protocol}://${req.get('host')}/${req.file.path}`;
        const businessId = req.business.id;
        const result = await prisma.reward.create({
            data: {
                business: {
                    connect: { id: businessId }
                },
                image_url: imageUrl,
                ...body
            },
            select: {
                id: true,
                name: true,
                description: true,
                image_url: true,
                tick_price: true,
            }
        });
        res.json(result);
    } catch (e) {
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        next(e);
    }
}

const getReward = async (req, res, next) => {
    try {
        const businessId = req.business.id;
        const { rewardId } = req.params;
        const result = await prisma.reward.findUnique({
            where: { id: rewardId, business_id: businessId },
            include: {
                _count: {
                    select: {
                        collectors: true
                    }
                }
            }
        });
        res.json(result);
    } catch (e) {
        next(e);
    }
}

const updateReward = async (req, res, next) => {
    try {
        const { value: body, error: bodyError } = schemas.updateRewardBody.validate(req.body);
        if (bodyError) {
            throw createHttpError(400);
        }
        const businessId = req.business.id;
        const { rewardId } = req.params;
        const result = await prisma.reward.update({
            where: { id: rewardId, business_id: businessId },
            data: body,
            select: {
                id: true,
                name: true,
                description: true,
                image_url: true,
                tick_price: true,
            }
        });
        res.json(result);
    } catch (e) {
        next(e);
    }
}

const deleteReward = async (req, res, next) => {
    try {
        const businessId = req.business.id;
        const { rewardId } = req.params;
        const result = await prisma.reward.delete({
            where: { id: rewardId, business_id: businessId },
            select: {
                id: true,
                name: true,
                description: true,
                image_url: true,
                tick_price: true,
            }
        });
        res.json(result);
    } catch (e) {
        next(e);
    }
}

export default {
    getRewards,
    createReward,
    getReward,
    updateReward,
    deleteReward,
};