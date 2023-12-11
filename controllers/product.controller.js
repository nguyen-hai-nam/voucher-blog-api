import prisma from '../config/prisma.js';

const countProducts = async (req, res) => {
    try {
        const count = await prisma.product.count();
        return res.status(200).json({ message: 'Success', data: count });
    } catch (error) {
        return res.status(500).json({ message: 'Error', error });
    }
};

const getAllProducts = async (req, res) => {
    const { page = 1, perPage = 10 } = req.query;
    const skip = (page - 1) * perPage;
    const take = perPage;
    try {
        const products = await prisma.product.findMany({
            skip,
            take
        });
        return res.status(200).json({ message: 'Success', page, perPage, data: products });
    } catch (error) {
        return res.status(500).json({ message: 'Error', error });
    }
};

const createProduct = async (req, res) => {
    try {
        const { business_id, ...productData } = req.body.data;
        const product = await prisma.product.create({
            data: {
                ...productData,
                business: {
                    connect: { id: business_id }
                }
            }
        });
        return res.status(201).json({ message: 'Success', data: product });
    } catch (error) {
        return res.status(500).json({ message: 'Error', error });
    }
};

const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await prisma.product.findUnique({
            where: { id }
        });
        if (!product) {
            return res.status(404).json({ message: 'Not found', error: 'Not found' });
        }
        return res.status(200).json({ message: 'Success', data: product });
    } catch (error) {
        return res.status(500).json({ message: 'Error', error });
    }
};

const updateProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await prisma.product.update({
            where: { id },
            data: req.body.data
        });
        return res.status(200).json({ message: 'Success', data: product });
    } catch (error) {
        return res.status(500).json({ message: 'Error', error });
    }
};

const deleteProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await prisma.product.delete({
            where: { id }
        });
        return res.status(200).json({ message: 'Success', data: product });
    } catch (error) {
        return res.status(500).json({ message: 'Error', error });
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
