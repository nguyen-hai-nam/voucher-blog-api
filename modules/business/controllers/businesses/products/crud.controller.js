import fs from "fs";
import createHttpError from "http-errors";

import prisma from "../../../../../config/prisma.js";
import schemas from "./schemas.js";

const getProducts = async (req, res, next) => {
    try {
        const businessId = req.business.id;
        const result = await prisma.product.findMany({
            where: { business_id: businessId },
            select: {
                id: true,
                category_id: true,
                name: true,
                description: true,
                price: true,
                status: true,
                images: {
                    select: {
                        id: true,
                        url: true
                    }
                }
            },
        });
        res.json(result);
    } catch (e) {
        next(e);
    }
}

const createProduct = async (req, res, next) => {
    try {
        const { value: body, error: bodyError } = schemas.createProductBody.validate(req.body);
        if (bodyError) {
            console.log(bodyError);
            throw createHttpError(400);
        }
        if (!req.files || req.files.length === 0) {
            throw createHttpError(400);
        }
        const images = req.files.map(file => ({ url: `${req.protocol}://${req.get('host')}/${file.path}` }));
        const businessId = req.business.id;
        const { category_id, ...rest } = body;
        const result = await prisma.product.create({
            data: {
                business: {
                    connect: { id: businessId }
                },
                category: {
                    connect: { id: category_id }
                },
                images: {
                    create: images
                },
                ...rest
            },
            select: {
                id: true,
                category_id: true,
                name: true,
                description: true,
                price: true,
                status: true,
                images: {
                    select: {
                        id: true,
                        url: true
                    }
                }
            },
        });
        res.json(result);
    } catch (e) {
        req.files.forEach(file => {
            fs.unlinkSync(file.path);
        });
        next(e);
    }
}

const getProduct = async (req, res, next) => {
    try {
        const businessId = req.business.id;
        const { productId } = req.params;
        const result = await prisma.product.findUnique({
            where: { id: productId, business_id: businessId },
            select: {
                id: true,
                category_id: true,
                name: true,
                description: true,
                price: true,
                status: true,
                images: {
                    select: {
                        id: true,
                        url: true
                    }
                }
            },
        });
        res.json(result);
    } catch (e) {
        next(e);
    }
}

const updateProduct = async (req, res, next) => {
    try {
        const { value: body, error: bodyError } = schemas.updateProductBody.validate(req.body);
        if (bodyError) {
            throw createHttpError(400);
        }
        const businessId = req.business.id;
        const { productId } = req.params;
        const result = await prisma.product.update({
            where: { id: productId, business_id: businessId },
            data: body,
            select: {
                id: true,
                category_id: true,
                name: true,
                description: true,
                price: true,
                status: true,
                images: {
                    select: {
                        id: true,
                        url: true
                    }
                }
            },
        });
        res.json(result);
    } catch (e) {
        next(e);
    }
}

const deleteProduct = async (req, res, next) => {
    try {
        const businessId = req.business.id;
        const { productId } = req.params;
        const result = await prisma.product.delete({
            where: { id: productId, business_id: businessId },
            select: {
                id: true,
                category_id: true,
                name: true,
                description: true,
                price: true,
                status: true,
                images: {
                    select: {
                        id: true,
                        url: true
                    }
                }
            },
        });
        res.json(result);
    } catch (e) {
        next(e);
    }
}

export default {
    getProducts,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
};