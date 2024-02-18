import prisma from "../../../../config/prisma.js";

const getBusiness = async (req, res, next) => {
    try {
        const { businessId } = req.params;
        const result = await prisma.business.findUnique({
            where: {
                id: businessId
            }
        });
        res.json(result);
    } catch (e) {
        next(e);
    }
}

const getProducts = async (req, res, next) => {
    try {
        const { businessId } = req.params;
        const result = await prisma.product.findMany({
            where: {
                business_id: businessId
            }
        });
        res.json(result);
    } catch (e) {
        next(e);
    }
}

const getProduct = async (req, res, next) => {
    try {
        const { productId, businessId } = req.params;
        const result = await prisma.product.findUnique({
            where: {
                id: productId,
                business_id: businessId,
            }
        });
        res.json(result);
    } catch (e) {
        next(e);
    }
}

const getCampaigns = async (req, res, next) => {
    try {
        const { businessId } = req.params;
        const result = await prisma.campaign.findMany({
            where: {
                business_id: businessId
            }
        });
        res.json(result);
    } catch (e) {
        next(e);
    }
}

const getCampaign = async (req, res, next) => {
    try {
        const { campaignId, businessId } = req.params;
        const result = await prisma.campaign.findUnique({
            where: {
                id: campaignId,
                business_id: businessId,
            }
        });
        res.json(result);
    } catch (e) {
        next(e);
    }
}

const getVouchers = async (req, res, next) => {
    try {
        const { businessId } = req.params;
        const result = await prisma.voucher.findMany({
            where: {
                business_id: businessId
            }
        });
        res.json(result);
    } catch (e) {
        next(e);
    }
}

const getVoucher = async (req, res, next) => {
    try {
        const { voucherId, businessId } = req.params;
        const result = await prisma.voucher.findUnique({
            where: {
                id: voucherId,
                business_id: businessId,
            }
        });
        res.json(result);
    } catch (e) {
        next(e);
    }
}

const getRewards = async (req, res, next) => {
    try {
        const { businessId } = req.params;
        const result = await prisma.reward.findMany({
            where: {
                business_id: businessId
            }
        });
        res.json(result);
    } catch (e) {
        next(e);
    }
}

const getReward = async (req, res, next) => {
    try {
        const { rewardId, businessId } = req.params;
        const result = await prisma.reward.findUnique({
            where: {
                id: rewardId,
                business_id: businessId,
            }
        });
        res.json(result);
    } catch (e) {
        next(e);
    }
}

export default {
    getBusiness,
    getProducts,
    getProduct,
    getCampaigns,
    getCampaign,
    getVouchers,
    getVoucher,
    getRewards,
    getReward,
}