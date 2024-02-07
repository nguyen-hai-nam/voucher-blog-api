import fs from "fs";
import createHttpError from "http-errors";

import prisma from "../../../../../config/prisma.js";
import schemas from "./schemas.js";

const getVouchers = async (req, res, next) => {
    try {
        const businessId = req.business.id;
        const result = await prisma.voucher.findMany({
            where: { business_id: businessId },
            select: {
                id: true,
                campaign_id: true,
                index: true,
                type: true,
                media_url: true,
                description: true,
                discount_type: true,
                percent: true, 
                max_value: true,
                value: true,
                fixed_price: true,
                usage: true, status: true,
                collected_count: true,
                max_use: true,
                condition_min_bill_value: true,
                condition_beginning_hour: true,
                condition_ending_hour: true,
                condition_target: true,
            },
        }); res.json(result);
    } catch (e) { next(e); }
}

const createVoucher = async (req, res, next) => {
    try {
        const { value: body, error: bodyError } = schemas.createVoucherBody.validate(req.body);
        if (bodyError) {
            throw createHttpError(400);
        }
        if (!req.file) {
            throw createHttpError(400);
        }
        const businessId = req.business.id;
        const mediaUrl = req.file.path;
        const result = await prisma.voucher.create({
            data: {
                business: {
                    connect: { id: businessId }
                },
                media_url: mediaUrl,
                ...body
            },
            select: {
                id: true,
                campaign_id: true,
                index: true,
                type: true,
                media_url: true,
                description: true,
                discount_type: true,
                percent: true,
                max_value: true,
                value: true,
                fixed_price: true,
                usage: true,
                status: true,
                collected_count: true,
                max_use: true,
                condition_min_bill_value: true,
                condition_beginning_hour: true,
                condition_ending_hour: true,
                condition_target: true,
            },
        });
        res.json(result);
    } catch (e) {
        fs.unlinkSync(req.file.path);
        next(e);
    }
}

const getVoucher = async (req, res, next) => {
    try {
        const businessId = req.business.id;
        const { id } = req.params;
        const result = await prisma.voucher.findUnique({
            where: { id, campaign_id: businessId },
            select: {
                id: true,
                campaign_id: true,
                index: true,
                type: true,
                media_url: true,
                description: true,
                discount_type: true,
                percent: true,
                max_value: true,
                value: true,
                fixed_price: true,
                usage: true,
                status: true,
                collected_count: true,
                max_use: true,
                condition_min_bill_value: true,
                condition_beginning_hour: true,
                condition_ending_hour: true,
                condition_target: true,
            },
        });
        res.json(result);
    } catch (e) {
        next(e);
    }
}

const updateVoucher = async (req, res, next) => {
    try {
        const businessId = req.business.id;
        const { id } = req.params;
        const { campaign_id, ...rest } = req.body;
        const result = await prisma.voucher.update({
            where: { id, campaign_id: businessId },
            data: {
                campaign: {
                    connect: { id: campaign_id }
                },
                ...rest
            },
            select: {
                id: true,
                campaign_id: true,
                index: true,
                type: true,
                media_url: true,
                description: true,
                discount_type: true,
                percent: true,
                max_value: true,
                value: true,
                fixed_price: true,
                usage: true,
                status: true,
                collected_count: true,
                max_use: true,
                condition_min_bill_value: true,
                condition_beginning_hour: true,
                condition_ending_hour: true,
                condition_target: true,
            },
        });
        res.json(result);
    } catch (e) {
        next(e);
    }
}

const deleteVoucher = async (req, res, next) => {
    try {
        const businessId = req.business.id;
        const { id } = req.params;
        const result = await prisma.voucher.delete({
            where: { id, campaign_id: businessId },
            select: {
                id: true,
                campaign_id: true,
                index: true,
                type: true,
                media_url: true,
                description: true,
                discount_type: true,
                percent: true,
                max_value: true,
                value: true,
                fixed_price: true,
                usage: true,
                status: true,
                collected_count: true,
                max_use: true,
                condition_min_bill_value: true,
                condition_beginning_hour: true,
                condition_ending_hour: true,
                condition_target: true,
            },
        });
        res.json(result);
    } catch (e) {
        next(e);
    }
}

export default {
    getVouchers,
    createVoucher,
    getVoucher,
    updateVoucher,
    deleteVoucher,
};