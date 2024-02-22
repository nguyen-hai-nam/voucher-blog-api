import fs from "fs";
import createHttpError from "http-errors";

import prisma from "../../../../../config/prisma.js";
import { selectParser, includeParser } from "../../../../../helpers/http.helper.js";
import schemas from "./schemas.js";

const selectWhitelist = [
    'id', 'campaign_id', 'index', 'type', 'media_url', 'description',
    'discount_type', 'percent', 'max_value', 'value', 'fixed_price',
    'usage', 'status', 'collected_count', 'max_use', 'condition_min_bill_value',
    'condition_beginning_hour', 'condition_ending_hour', 'condition_target'
];

const includeWhitelist = [
    'business', 'campaign', 'collectors', 'redeemers', 'appliedProducts'
]

const getVouchers = async (req, res, next) => {
    try {
        const businessId = req.business.id;
        const { select, include } = req.query;
        const selectObject = selectParser(select, selectWhitelist);
        const includeObject = includeParser(include, includeWhitelist);
        const result = await prisma.voucher.findMany({
            where: { business_id: businessId },
            select: {
                ...selectObject,
                ...includeObject
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
        const { select, include } = req.query;
        const selectObject = selectParser(select, selectWhitelist);
        const includeObject = includeParser(include, includeWhitelist);
        const businessId = req.business.id;
        const mediaUrl = req.file.path;
        const result = await prisma.voucher.create({
            data: {
                business: {
                    connect: { id: businessId }
                },
                media_url: `${req.protocol}://${req.get('host')}/${mediaUrl}`,
                ...body
            },
            select: {
                ...selectObject,
                ...includeObject
            },
        });
        res.json(result);
    } catch (e) {
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        next(e);
    }
}

const getVoucher = async (req, res, next) => {
    try {
        const businessId = req.business.id;
        const { voucherId } = req.params;
        const { select, include } = req.query;
        const selectObject = selectParser(select, selectWhitelist);
        const includeObject = includeParser(include, includeWhitelist);
        const result = await prisma.voucher.findUnique({
            where: { id: voucherId, business_id: businessId },
            select: {
                ...selectObject,
                ...includeObject
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
        const { voucherId } = req.params;
        const { select, include } = req.query;
        const selectObject = selectParser(select, selectWhitelist);
        const includeObject = includeParser(include, includeWhitelist);
        const { campaign_id, ...rest } = req.body;
        const result = await prisma.voucher.update({
            where: { id: voucherId, business_id: businessId },
            data: {
                campaign: {
                    connect: { id: campaign_id }
                },
                ...rest
            },
            select: {
                ...selectObject,
                ...includeObject
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
        const { voucherId } = req.params;
        const { select, include } = req.query;
        const selectObject = selectParser(select, selectWhitelist);
        const includeObject = includeParser(include, includeWhitelist);
        const voucher = await prisma.voucher.findUnique({
            where: { id: voucherId, business_id: businessId },
            select: { media_url: true },
        })
        const result = await prisma.voucher.delete({
            where: { id: voucherId, business_id: businessId },
            select: {
                ...selectObject,
                ...includeObject
            },
        });
        if (voucher.media_url) {
            const url = new URL(voucher.media_url);
            const filePath = url.pathname;
            fs.unlinkSync(`.${filePath}`);
        }
        res.json(result);
    } catch (e) {
        console.log(e)
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