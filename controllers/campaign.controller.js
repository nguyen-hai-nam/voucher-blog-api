import prisma from '../config/prisma.js';
import { parseQuery } from '../helpers/http.helper.js';

const countCampaigns = async (req, res, next) => {
    const query = parseQuery(req.query);
    try {
        const count = await prisma.campaign.count({
            where: query.where
        });
        return res.status(200).json({ success: true, data: count });
    } catch (error) {
        next(error);
    }
};

const getAllCampaigns = async (req, res, next) => {
    const query = parseQuery(req.query);
    try {
        const campaigns = await prisma.campaign.findMany({
            where: query.where,
            skip: query.skip,
            take: query.take,
            select: query.select,
            include: query.include
        });
        return res.status(200).json({ success: true, data: campaigns });
    } catch (error) {
        next(error);
    }
};

const createCampaign = async (req, res, next) => {
    const query = parseQuery(req.query);
    try {
        const { business_id, ...campaignData } = req.body;
        const campaign = await prisma.campaign.create({
            data: {
                ...campaignData,
                business: {
                    connect: { id: business_id }
                }
            },
            select: query.select,
            include: query.include
        });
        return res.status(201).json({ success: true, data: campaign });
    } catch (error) {
        next(error);
    }
};

const getCampaignById = async (req, res, next) => {
    const { id } = req.params;
    const query = parseQuery(req.query);
    try {
        const campaign = await prisma.campaign.findUnique({
            where: { id },
            select: query.select,
            include: query.include
        });
        return res.status(200).json({ success: true, data: campaign });
    } catch (error) {
        next(error);
    }
};

const updateCampaignById = async (req, res, next) => {
    const { id } = req.params;
    const query = parseQuery(req.query);
    try {
        const campaign = await prisma.campaign.update({
            where: { id },
            data: req.body,
            select: query.select,
            include: query.include
        });
        return res.status(200).json({ success: true, data: campaign });
    } catch (error) {
        next(error);
    }
};

const deleteCampaignById = async (req, res, next) => {
    const { id } = req.params;
    const query = parseQuery(req.query);
    try {
        const campaign = await prisma.campaign.delete({
            where: { id },
            select: query.select,
            include: query.include
        });
        return res.status(200).json({ success: true, data: campaign });
    } catch (error) {
        next(error);
    }
};

export default {
    countCampaigns,
    getAllCampaigns,
    createCampaign,
    getCampaignById,
    updateCampaignById,
    deleteCampaignById
};
