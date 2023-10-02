import { RequestHandler } from 'express';

import prisma from '../config/prisma';
import { Payload } from '../interfaces/payload';
import { Product, Prisma } from '@prisma/client';

const countProducts: RequestHandler<
	{},
	{ message: string; data?: number; error?: unknown },
	{ payload: Payload },
	{ page?: number; perPage?: number }
> = async (req, res) => {
	try {
		const count = await prisma.product.count();
		return res.status(200).json({ message: 'Success', data: count });
	} catch (error) {
		return res.status(500).json({ message: 'Error', error });
	}
};

const getAllProducts: RequestHandler<
	{},
	{ message: string; page?: number; perPage?: number; data?: Product[]; error?: unknown },
	{ payload: Payload },
	{ page?: number; perPage?: number }
> = async (req, res) => {
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

const createProduct: RequestHandler<
	{},
	{ message: string; data?: Product; error?: unknown },
	{ payload: Payload; data: Prisma.ProductCreateInput & { business_id: string } },
	{ page?: number; perPage?: number }
> = async (req, res) => {
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

const getProductById: RequestHandler<
	{ id: string },
	{ message: string; data?: Product; error?: unknown },
	{ payload: Payload },
	{}
> = async (req, res) => {
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

const updateProductById: RequestHandler<
	{ id: string },
	{ message: string; data?: Product; error?: unknown },
	{ payload: Payload; data: Prisma.ProductUpdateInput },
	{}
> = async (req, res) => {
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

const deleteProductById: RequestHandler<
	{ id: string },
	{ message: string; data?: Product; error?: unknown },
	{ payload: Payload },
	{}
> = async (req, res) => {
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
