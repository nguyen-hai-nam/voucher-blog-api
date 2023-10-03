import { RequestHandler } from 'express';

import prisma from '../config/prisma';
import { Payload } from '../interfaces/payload';
import { Post, Prisma } from '@prisma/client';

const countPosts: RequestHandler<
	{},
	{ message: string; data?: number; error?: unknown },
	{ payload: Payload },
	{ page?: number; perPage?: number }
> = async (req, res) => {
	try {
		const count = await prisma.post.count();
		return res.status(200).json({ message: 'Success', data: count });
	} catch (error) {
		return res.status(500).json({ message: 'Error', error });
	}
};

const getAllPosts: RequestHandler<
	{},
	{ message: string; page?: number; perPage?: number; data?: Post[]; error?: unknown },
	{ payload: Payload },
	{ page?: number; perPage?: number }
> = async (req, res) => {
	const { page = 1, perPage = 10 } = req.query;
	const skip = (page - 1) * perPage;
	const take = perPage;
	try {
		const posts = await prisma.post.findMany({
			skip,
			take
		});
		return res.status(200).json({ message: 'Success', page, perPage, data: posts });
	} catch (error) {
		return res.status(500).json({ message: 'Error', error });
	}
};

const createPost: RequestHandler<
	{},
	{ message: string; data?: Post; error?: unknown },
	{ payload: Payload; data: Prisma.PostCreateInput & { business_id: string } & { vouchers: string[] } },
	{ page?: number; perPage?: number }
> = async (req, res) => {
	try {
		const { business_id, vouchers, ...postData } = req.body.data;
		const post = await prisma.post.create({
			data: {
				...postData,
				business: {
					connect: {
						id: business_id
					}
				},
				vouchers: {
					create: vouchers?.map((voucherId, index) => ({
						voucher: {
							connect: {
								id: voucherId
							}
						},
						index
					}))
				}
			}
		});
		return res.status(201).json({ message: 'Success', data: post });
	} catch (error) {
		return res.status(500).json({ message: 'Error', error });
	}
};

const getPostById: RequestHandler<
	{ id: string },
	{ message: string; data?: Post; error?: unknown },
	{ payload: Payload },
	{}
> = async (req, res) => {
	const { id } = req.params;
	try {
		const post = await prisma.post.findUnique({
			where: { id }
		});
		if (!post) {
			return res.status(404).json({ message: 'Not found', error: 'Not found' });
		}
		return res.status(200).json({ message: 'Success', data: post });
	} catch (error) {
		return res.status(500).json({ message: 'Error', error });
	}
};

const updatePostById: RequestHandler<
	{ id: string },
	{ message: string; data?: Post; error?: unknown },
	{ payload: Payload; data: Prisma.PostUpdateInput },
	{}
> = async (req, res) => {
	const { id } = req.params;
	try {
		const post = await prisma.post.update({
			where: { id },
			data: req.body.data
		});
		return res.status(200).json({ message: 'Success', data: post });
	} catch (error) {
		return res.status(500).json({ message: 'Error', error });
	}
};

const deletePostById: RequestHandler<
	{ id: string },
	{ message: string; data?: Post; error?: unknown },
	{ payload: Payload },
	{}
> = async (req, res) => {
	const { id } = req.params;
	try {
		const post = await prisma.post.delete({
			where: { id }
		});
		return res.status(200).json({ message: 'Success', data: post });
	} catch (error) {
		return res.status(500).json({ message: 'Error', error });
	}
};

export default {
	countPosts,
	getAllPosts,
	createPost,
	getPostById,
	updatePostById,
	deletePostById
};
