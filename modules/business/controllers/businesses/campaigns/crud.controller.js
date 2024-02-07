import createHttpError from "http-errors";

import prisma from "../../../../../config/prisma.js";
import schemas from "./schemas.js";

const getCampaigns = async (req, res, next) => {
    try {
        const businessId = req.business.id;
        const result = await prisma.campaign.findMany({
            where: { business_id: businessId },
            select: {
                id: true,
                name: true,
                description: true,
                start_date: true,
                end_date: true,
                status: true,
                _count: {
                    select: {
                        vouchers: true,
                        comments: true,
                        loves: true,
                        saves: true,
                    }
                },
            },
        });
        res.json(result);
    } catch (e) {
        next(e);
    }
}

const createCampaign = async (req, res, next) => {
    try {
        const { value: body, error: bodyError } = schemas.createCampaignBody.validate(req.body);
        if (bodyError) {
            throw createHttpError(400);
        }
        const businessId = req.business.id;
        const { voucherIds, ...rest } = body;
        const result = await prisma.campaign.create({
            data: {
                business: {
                    connect: { id: businessId }
                },
                vouchers: {
                    connect: voucherIds.map(id => ({ id }))
                },
                ...rest
            },
            select: {
                id: true,
                name: true,
                description: true,
                start_date: true,
                end_date: true,
                loves_count: true,
                saves_count: true,
                status: true,
                _count: {
                    select: {
                        vouchers: true,
                        comments: true,
                        loves: true,
                        saves: true,
                    }
                },
            },
        });
        res.json(result);
    } catch (e) {
        next(e);
    }
}

const getCampaign = async (req, res, next) => {
    try {
        const businessId = req.business.id;
        const { id } = req.params;
        const result = await prisma.campaign.findUnique({
            where: { id, business_id: businessId },
            select: {
                id: true,
                name: true,
                description: true,
                start_date: true,
                end_date: true,
                status: true,
                _count: {
                    select: {
                        vouchers: true,
                        comments: true,
                        loves: true,
                        saves: true,
                    }
                },
            },
        });
        res.json(result);
    } catch (e) {
        next(e);
    }
}

const updateCampaign = async (req, res, next) => {
    try {
        const { value: body, error: bodyError } = schemas.updateCampaignBody.validate(req.body);
        if (bodyError) {
            throw createHttpError(400);
        }
        const businessId = req.business.id;
        const { id } = req.params;
        const result = await prisma.campaign.update({
            where: { id, business_id: businessId },
            data: body,
            select: {
                id: true,
                name: true,
                description: true,
                start_date: true,
                end_date: true,
                status: true,
                _count: {
                    select: {
                        vouchers: true,
                        comments: true,
                        loves: true,
                        saves: true,
                    }
                },
            },
        });
        res.json(result);
    } catch (e) {
        next(e);
    }
}

const deleteCampaign = async (req, res, next) => {
    try {
        const businessId = req.business.id;
        const { id } = req.params;
        const result = await prisma.campaign.delete({
            where: { id, business_id: businessId },
            select: {
                id: true,
                name: true,
                description: true,
                start_date: true,
                end_date: true,
                status: true,
                _count: {
                    select: {
                        vouchers: true,
                        comments: true,
                        loves: true,
                        saves: true,
                    }
                },
            },
        });
        res.json(result);
    } catch (e) {
        next(e);
    }
}

export default {
    getCampaigns,
    createCampaign,
    getCampaign,
    updateCampaign,
    deleteCampaign,
};
