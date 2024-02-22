import createHttpError from "http-errors";

import prisma from '../../../../config/prisma.js';
import schemas from './schemas.js';

const getCurrentBusiness = async (req, res, next) => {
    try {
        const businessId = req.business.id;
        const result = await prisma.business.findUnique({
            where: { id: businessId },
            select: {
                id: true,
                category_id: true,
                name: true,
                description: true,
                tax_code: true,
                avatar_image_url: true,
                email: true,
                phone_number: true,
                website: true,
                address_name: true,
                lng: true,
                lat: true,
                open_hour: true,
                close_hour: true,
                lowest_price: true,
                highest_price: true,
                rating: true,
            },
        });
        res.json(result);
    } catch (e) {
        next(e);
    }
}

const updateCurrentBusiness = async (req, res, next) => {
    try {
        const { value: body, error: bodyError } = schemas.updateCurrentBusinessBody.validate(req.body);
        if (bodyError) {
            throw createHttpError(400);
        }
        const { id } = req.params;
        const { category_id, ...rest } = body;
        const result = await prisma.business.update({
            where: { id },
            data: {
                category: {
                    connect: { id: category_id }
                },
                ...rest
            },
            select: {
                id: true,
                category_id: true,
                name: true,
                description: true,
                tax_code: true,
                avatar_image_url: true,
                email: true,
                phone_number: true,
                website: true,
                address_name: true,
                lng: true,
                lat: true,
                open_hour: true,
                close_hour: true,
                lowest_price: true,
                highest_price: true,
                followers_count: true,
                rating: true,
                status: true,
                created_at: true,
                updated_at: true,
            },
        });
        res.json(result);
    } catch (e) {
        next(e);
    }
}

export default {
    getCurrentBusiness,
    updateCurrentBusiness,
};