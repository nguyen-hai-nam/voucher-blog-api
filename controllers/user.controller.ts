import { RequestHandler } from 'express';

import prisma from '../config/prisma';
import { Payload } from '../interfaces/payload';
import userService from '../services/user.service';

const countUsers: RequestHandler<
	{},
	{ message: string; data?: object; error?: unknown },
	{ payload: Payload },
	{ is_admin?: string }
> = async (req, res, next) => {
	if (!req.body.payload || !req.body.payload.is_admin) {
		return res.status(401).json({ message: 'Unauthorized' });
	}
	try {
		const result = await userService.countUsers();
		return res.status(200).json({ message: 'Success', data: { count: result } });
	} catch (error) {
		next(error);
	}
};

const getAllUsers: RequestHandler<
	{},
	{ message: string; page?: number; perPage?: number; data?: object; error?: unknown },
	{ payload: Payload },
	{ page?: number; perPage?: number }
> = async (req, res, next) => {
	const { page = 1, perPage = 10 } = req.query;
	const skip = (page - 1) * perPage;
	const take = perPage;
	try {
		const users = await userService.getAllUsers(skip, take);
		return res.status(200).json({ message: 'Success', page, perPage, data: users });
	} catch (error) {
		next(error);
	}
};

const getAllUserAddresses: RequestHandler<
	{ user_id: string },
	{ message: string; page?: number; perPage?: number; data?: object; error?: unknown },
	{ payload: Payload },
	{}
> = async (req, res, next) => {
	try {
		const addresses = await userService.getAllUserAddresses(req.params.user_id);
		return res.status(200).json({ message: 'Success', data: addresses });
	} catch (error) {
		next(error);
	}
};

const getUserById: RequestHandler<
	{ id: string },
	{ message: string; data?: object | null; error?: unknown },
	{ payload: Payload },
	{}
> = async (req, res, next) => {
	const { id } = req.params;
	if (id !== req.body.payload.id && !req.body.payload.is_admin) {
		return res.status(401).json({ message: 'Unauthorized' });
	}
	try {
		const user = await userService.getUserById(id);
		return res.status(200).json({ message: 'Success', data: user });
	} catch (error) {
		next(error);
	}
};

const updateUserById: RequestHandler<
	{ id: string },
	{ message: string; data?: object; error?: unknown },
	{ payload: Payload; data: object },
	{}
> = async (req, res, next) => {
	const { id } = req.params;
	const updateData = req.body.data;
	if (!updateData) {
		return res.status(400).json({ message: 'Bad request' });
	} else if (id !== req.body.payload.id && !req.body.payload.is_admin) {
		return res.status(401).json({ message: 'Unauthorized' });
	}
	try {
		const result = await userService.updateUserById(id, updateData);
		return res.status(200).json({ message: 'Success', data: result });
	} catch (error) {
		next(error);
	}
};

const deleteUserById: RequestHandler<
	{ id: string },
	{ message: string; data?: object; error?: unknown },
	{ payload: Payload },
	{}
> = async (req, res, next) => {
	const { id } = req.params;
	if (!req.body.payload) {
		return res.status(401).json({ message: 'Unauthorized' });
	}
	try {
		const result = await userService.deleteUserById(id);
		return res.status(200).json({ message: 'Success', data: result });
	} catch (error) {
		next(error);
	}
};

const getAllCollectedVouchers: RequestHandler<
	{ userId: string },
	{ message: string; data?: object | null; error?: unknown },
	{},
	{}
> = async (req, res) => {
	const { userId } = req.params;
	try {
		const userWithCollectedVouchers = await prisma.user.findUnique({
			where: { id: userId },
			select: {
				id: true,
				collectedVouchers: {
					select: {
						voucher_id: true,
						use_count: true,
						created_at: true,
						updated_at: true
					}
				}
			}
		});
		if (!userWithCollectedVouchers) {
			return res.status(404).json({ message: 'User not found' });
		}
		return res.status(200).json({ message: 'Success', data: userWithCollectedVouchers });
	} catch (error) {
		return res.status(500).json({ message: 'Error', error });
	}
};

const collectVoucher: RequestHandler<
	{ userId: string; voucherId: string },
	{ message: string; data?: string; error?: unknown },
	{},
	{}
> = async (req, res) => {
	const { userId, voucherId } = req.params;
	try {
		const voucher = await prisma.voucher.findUnique({
			where: { id: voucherId }
		});
		if (voucher && voucher.count <= 0) {
			return res.status(400).json({ message: 'Voucher is out of stock' });
		}
		await prisma.voucher.update({
			where: { id: voucherId },
			data: { count: { decrement: 1 } }
		});
		await prisma.voucherCustomer.create({
			data: {
				user: {
					connect: {
						id: userId
					}
				},
				voucher: {
					connect: {
						id: voucherId
					}
				},
				use_count: 0
			}
		});
		return res.status(200).json({ message: 'Success', data: 'Collect voucher successfully' });
	} catch (error) {
		return res.status(500).json({ message: 'Error', error });
	}
};

const lovePost: RequestHandler<
	{ userId: string; postId: string },
	{ message: string; error?: unknown },
	{},
	{}
> = async (req, res) => {
	const { userId, postId } = req.params;
	try {
		await userService.lovePost(userId, postId);
		return res.status(200).json({ message: 'Success' });
	} catch (error) {
		return res.status(500).json({ message: 'Error', error });
	}
};

const unlovePost: RequestHandler<
	{ userId: string; postId: string },
	{ message: string; error?: unknown },
	{},
	{}
> = async (req, res) => {
	const { userId, postId } = req.params;
	try {
		await userService.unlovePost(userId, postId);
		return res.status(200).json({ message: 'Success' });
	} catch (error) {
		return res.status(500).json({ message: 'Error', error });
	}
};

const savePost: RequestHandler<
	{ userId: string; postId: string },
	{ message: string; error?: unknown },
	{},
	{}
> = async (req, res) => {
	const { userId, postId } = req.params;
	try {
		await userService.savePost(userId, postId);
		return res.status(200).json({ message: 'Success' });
	} catch (error) {
		return res.status(500).json({ message: 'Error', error });
	}
};

const unsavePost: RequestHandler<
	{ userId: string; postId: string },
	{ message: string; error?: unknown },
	{},
	{}
> = async (req, res) => {
	const { userId, postId } = req.params;
	try {
		await userService.unsavePost(userId, postId);
		return res.status(200).json({ message: 'Success' });
	} catch (error) {
		return res.status(500).json({ message: 'Error', error });
	}
};

const getAllSavedPosts: RequestHandler<
	{ userId: string },
	{ message: string; data?: object | null; error?: unknown },
	{},
	{}
> = async (req, res) => {
	const { userId } = req.params;
	try {
		const savedPosts = await userService.getAllSavedPosts(userId);
		return res.status(200).json({ message: 'Success', data: savedPosts });
	} catch (error) {
		return res.status(500).json({ message: 'Error', error });
	}
};

export default {
	countUsers,
	getAllUsers,
	getAllUserAddresses,
	getUserById,
	updateUserById,
	deleteUserById,
	getAllCollectedVouchers,
	collectVoucher,
	lovePost,
	unlovePost,
	savePost,
	unsavePost,
	getAllSavedPosts
};
