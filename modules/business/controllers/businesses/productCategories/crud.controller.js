import createHttpError from "http-errors";

import prisma from "../../../../../config/prisma.js";
import schemas from "./schemas.js";

const getProductCategories = async (req, res, next) => {
    try {
        const businessId = req.business.id;
        const productCategories = await prisma.productCategory.findMany({
            where: { business_id: businessId },
            select: { id: true, name: true },
        });
        res.json(productCategories);
    } catch (e) {
        next(e)
    }
};

const createProductCategory = async (req, res, next) => {
    try {
        const { value: body, error: bodyError } = schemas.createProductCategoryBody.validate(req.body);
        if (bodyError) {
            throw createHttpError(400);
        }
        const businessId = req.business.id;
        const result = await prisma.productCategory.create({
            data: { business_id: businessId, ...body },
            select: { id: true, name: true },
        });
        res.json(result);
    } catch (e) {
        next(e);
    }
};

const getProductCategory = async (req, res, next) => {
    try {
        const businessId = req.business.id;
        const { productCategoryId } = req.params;
        const productCategory = await prisma.productCategory.findUnique({
            where: { id: productCategoryId, business_id: businessId},
            select: { id: true, name: true },
        });
        res.json(productCategory);
    } catch (e) {
        next(e);
    }
};

const updateProductCategory = async (req, res, next) => {
    try {
        const { value: body, error: bodyError } = schemas.updateProductCategoryBody.validate(req.body);
        if (bodyError) {
            throw createHttpError(400);
        }
        const businessId = req.business.id;
        const { productCategoryId } = req.params;
        const result = await prisma.productCategory.update({
            where: { id: productCategoryId, business_id: businessId},
            data: body,
            select: { id: true, name: true },
        });
        res.json(result);
    } catch (e) {
        next(e);
    }
};

const deleteProductCategory = async (req, res, next) => {
    try {
        const businessId = req.business.id;
        const { productCategoryId } = req.params;
        const result = await prisma.productCategory.delete({
            where: { id: productCategoryId, business_id: businessId},
            select: { id: true, name: true },
        });
        res.json(result);
    } catch (e) {
        next(e);
    }
};

export default {
    getProductCategories,
    createProductCategory,
    getProductCategory,
    updateProductCategory,
    deleteProductCategory,
};