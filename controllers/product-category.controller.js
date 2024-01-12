import prisma from '../config/prisma.js';
import { parseQuery } from '../helpers/http.helper.js';

const countProductCategories = async (req, res, next) => {
    const query = parseQuery(req.query);
    try {
        const count = await prisma.productCategory.count({
            where: query.where
        });
        return res.status(200).json({ success: true, data: count });
    } catch (error) {
        next(error);
    }
};

const getAllProductCategories = async (req, res, next) => {
    const query = parseQuery(req.query);
    try {
        const categories = await prisma.productCategory.findMany({
            where: query.where,
            skip: query.skip,
            take: query.take,
            select: query.select,
            include: query.include
        });
        return res.status(200).json({ success: true, data: categories });
    } catch (error) {
        next(error);
    }
};

const createProductCategory = async (req, res, next) => {
    const query = parseQuery(req.query);
    try {
        const category = await prisma.productCategory.create({
            data: req.body,
            select: query.select,
            include: query.include
        });
        return res.status(201).json({ success: true, data: category });
    } catch (error) {
        next(error);
    }
};

const getProductCategoryById = async (req, res, next) => {
    const { id } = req.params;
    const query = parseQuery(req.query);
    try {
        const category = await prisma.productCategory.findUnique({
            where: { id },
            select: query.select,
            include: query.include
        });
        if (!category) {
            return res.status(404).json({ message: 'Not found', error: 'Not found' });
        }
        return res.status(200).json({ success: true, data: category });
    } catch (error) {
        next(error);
    }
};

const updateProductCategoryById = async (req, res, next) => {
    const { id } = req.params;
    const query = parseQuery(req.query);
    try {
        const category = await prisma.productCategory.update({
            where: { id },
            data: req.body,
            select: query.select,
            include: query.include
        });
        return res.status(200).json({ success: true, data: category });
    } catch (error) {
        next(error);
    }
};

const deleteProductCategoryById = async (req, res, next) => {
    const { id } = req.params;
    const query = parseQuery(req.query);
    try {
        const category = await prisma.productCategory.delete({
            where: { id },
            select: query.select,
            include: query.include
        });
        return res.status(200).json({ success: true, data: category });
    } catch (error) {
        next(error);
    }
};

export default {
    countProductCategories,
    getAllProductCategories,
    createProductCategory,
    getProductCategoryById,
    updateProductCategoryById,
    deleteProductCategoryById
};
