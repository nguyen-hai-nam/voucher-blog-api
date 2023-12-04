import { RequestHandler } from 'express';

import userService from '../services/user.service';
import { Payload } from '../interfaces/payload';

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

const getAddresses: RequestHandler<
	{ id: string },
	{ message: string; page?: number; perPage?: number; data?: object; error?: unknown },
	{ payload: Payload },
	{}
> = async (req, res, next) => {
	try {
		const addresses = await userService.getAddresses(req.params.id);
		return res.status(200).json({ message: 'Success', data: addresses });
	} catch (error) {
		next(error);
	}
};

const getManagingBusinesses: RequestHandler<
	{ id: string },
	{ message: string; page?: number; perPage?: number; data?: object; error?: unknown },
	{ payload: Payload },
	{}
> = async (req, res, next) => {
	try {
		const managingBusinesses = await userService.getManagingBusinesses(req.params.id);
		return res.status(200).json({ message: 'Success', data: managingBusinesses });
	} catch (error) {
		next(error);
	}
};

const getFollowingBusinesses: RequestHandler<
	{ id: string },
	{ message: string; page?: number; perPage?: number; data?: object; error?: unknown },
	{ payload: Payload },
	{}
> = async (req, res, next) => {
	try {
		const followingBusinesses = await userService.getFollowingBusinesses(req.params.id);
		return res.status(200).json({ message: 'Success', data: followingBusinesses });
	} catch (error) {
		next(error);
	}
};

const getVouchers: RequestHandler<
	{ id: string },
	{ message: string; data?: object | null; error?: unknown },
	{},
	{ type: string }
> = async (req, res, next) => {
	try {
		switch (req.query.type) {
			case 'collected': {
				const collectedVouchers = await userService.getCollectedVouchers(req.params.id);
				return res.status(200).json({ message: 'Success', data: collectedVouchers });
			}
			case 'used': {
				const usedVouchers = await userService.getUsedVouchers(req.params.id);
				return res.status(200).json({ message: 'Success', data: usedVouchers });
			}
			default:
				return res.status(400).json({ message: 'Invalid type' });
		}
	} catch (error) {
		next(error);
	}
};

const collectVoucher: RequestHandler<
	{ id: string; voucherId: string },
	{ message: string; data?: string; error?: unknown },
	{},
	{}
> = async (req, res, next) => {
	const { id, voucherId } = req.params;
	try {
		await userService.collectVoucher(id, voucherId);
		return res.status(200).json({ message: 'Success' });
	} catch (error) {
		next(error);
	}
};

const discardVoucher: RequestHandler<
	{ id: string; voucherId: string },
	{ message: string; data?: string; error?: unknown },
	{},
	{}
> = async (req, res, next) => {
	const { id, voucherId } = req.params;
	try {
		await userService.discardVoucher(id, voucherId);
		return res.status(200).json({ message: 'Success' });
	} catch (error) {
		next(error);
	}
};

const getPosts: RequestHandler<
	{ id: string },
	{ message: string; data?: object | null; error?: unknown },
	{},
	{ type: string }
> = async (req, res, next) => {
	const { id } = req.params;
	try {
		switch (req.query.type) {
			case 'loved': {
				const lovedPosts = await userService.getLovedPosts(id);
				return res.status(200).json({ message: 'Success', data: lovedPosts });
			}
			case 'saved': {
				const savedPosts = await userService.getSavedPosts(id);
				return res.status(200).json({ message: 'Success', data: savedPosts });
			}
			default:
				return res.status(400).json({ message: 'Invalid type' });
		}
	} catch (error) {
		next(error);
	}
};

const lovePost: RequestHandler<{ id: string; postId: string }, { message: string; error?: unknown }, {}, {}> = async (
	req,
	res,
	next
) => {
	const { id, postId } = req.params;
	try {
		await userService.lovePost(id, postId);
		return res.status(200).json({ message: 'Success' });
	} catch (error) {
		next(error);
	}
};

const unlovePost: RequestHandler<{ id: string; postId: string }, { message: string; error?: unknown }, {}, {}> = async (
	req,
	res,
	next
) => {
	const { id, postId } = req.params;
	try {
		await userService.unlovePost(id, postId);
		return res.status(200).json({ message: 'Success' });
	} catch (error) {
		next(error);
	}
};

const savePost: RequestHandler<{ id: string; postId: string }, { message: string; error?: unknown }, {}, {}> = async (
	req,
	res,
	next
) => {
	const { id, postId } = req.params;
	try {
		await userService.savePost(id, postId);
		return res.status(200).json({ message: 'Success' });
	} catch (error) {
		next(error);
	}
};

const unsavePost: RequestHandler<{ id: string; postId: string }, { message: string; error?: unknown }, {}, {}> = async (
	req,
	res,
	next
) => {
	const { id, postId } = req.params;
	try {
		await userService.unsavePost(id, postId);
		return res.status(200).json({ message: 'Success' });
	} catch (error) {
		next(error);
	}
};

export default {
	countUsers,
	getAllUsers,
	getUserById,
	getAddresses,
	getManagingBusinesses,
	getFollowingBusinesses,
	updateUserById,
	deleteUserById,
	getVouchers,
	collectVoucher,
	discardVoucher,
	getPosts,
	lovePost,
	unlovePost,
	savePost,
	unsavePost
};
