import prisma from '../config/prisma.js';
import { parseQuery } from '../helpers/http.helper.js';

const countProducts = async (req, res, next) => {
    const query = parseQuery(req.query);
    try {
        const count = await prisma.product.count({
            where: query.where
        });
        return res.status(200).json({ success: true, data: count });
    } catch (error) {
        next(error);
    }
};

const getAllProducts = async (req, res, next) => {
    const query = parseQuery(req.query);
    try {
        const products = await prisma.product.findMany({
            where: query.where,
            skip: query.skip,
            take: query.take,
            select: query.select,
            include: query.include
        });
        return res.status(200).json({ success: true, data: products });
    } catch (error) {
        next(error);
    }
};

const createProduct = async (req, res, next) => {
    const query = parseQuery(req.query);
    try {
        const { business_id, ...productData } = req.body.data;
        const product = await prisma.product.create({
            data: {
                ...productData,
                business: {
                    connect: { id: business_id }
                }
            },
            select: query.select,
            include: query.include
        });
        return res.status(201).json({ success: true, data: product });
    } catch (error) {
        next(error);
    }
};

const getProductById = async (req, res, next) => {
    const { id } = req.params;
    const query = parseQuery(req.query);
    try {
        const product = await prisma.product.findUnique({
            where: { id },
            select: query.select,
            include: query.include
        });
        if (!product) {
            return res.status(404).json({ message: 'Not found', error: 'Not found' });
        }
        return res.status(200).json({ success: true, data: product });
    } catch (error) {
        next(error);
    }
};

const updateProductById = async (req, res, next) => {
    const { id } = req.params;
    const query = parseQuery(req.query);
    try {
        const product = await prisma.product.update({
            where: { id },
            data: req.body,
            select: query.select,
            include: query.include
        });
        return res.status(200).json({ success: true, data: product });
    } catch (error) {
        next(error);
    }
};

const deleteProductById = async (req, res, next) => {
    const { id } = req.params;
    const query = parseQuery(req.query);
    try {
        const product = await prisma.product.delete({
            where: { id },
            select: query.select,
            include: query.include
        });
        return res.status(200).json({ success: true, data: product });
    } catch (error) {
        next(error);
    }
};

export default {
    countProducts,
    getAllProducts,
    createProduct,
    getProductById,
    updateProductById,
    deleteProductById
};
