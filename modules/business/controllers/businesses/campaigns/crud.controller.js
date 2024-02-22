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
        const { voucher_ids, ...rest } = body;
        const vouchers = await prisma.voucher.findMany({
            where: {
                id: {
                    in: voucher_ids
                },
                campaign_id: null
            }
        });
        if (vouchers.length !== voucher_ids.length) {
            throw createHttpError(400, 'Some vouchers have been already included in a campaign');
        }
        const result = await prisma.campaign.create({
            data: {
                business: {
                    connect: { id: businessId }
                },
                vouchers: {
                    connect: voucher_ids.map(id => ({ id })),
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
        const { campaignId } = req.params;
        const result = await prisma.campaign.findUnique({
            where: { id: campaignId, business_id: businessId },
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
        const { campaignId } = req.params;
        const result = await prisma.campaign.update({
            where: { id: campaignId, business_id: businessId },
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
        const { campaignId } = req.params;
        const result = await prisma.campaign.delete({
            where: { id: campaignId, business_id: businessId },
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
