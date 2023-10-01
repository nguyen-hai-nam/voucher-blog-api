import { RequestHandler } from 'express';

import prisma from '../config/prisma';
import { Payload } from '../interfaces/payload';

const countUsers: RequestHandler<
	{},
	{ message: string; data?: object; error?: unknown },
	{ payload: Payload },
	{ is_admin?: string }
> = async (req, res) => {
	if (!req.body.payload || !req.body.payload.is_admin) {
		return res.status(401).json({ message: 'Unauthorized' });
	}
	try {
		const query = req.query;
		const count = await prisma.user.count({
			where: {
				...query,
				is_admin: query.is_admin === 'true' ? true : false
			}
		});
		return res.status(200).json({ message: 'Success', data: { count } });
	} catch (error) {
		return res.status(500).json({ message: 'Error', error });
	}
};

const getAllUsers: RequestHandler<
	{},
	{ message: string; page?: number; perPage?: number; data?: object; error?: unknown },
	{ payload: Payload },
	{ page?: number; perPage?: number }
> = async (req, res) => {
	const { page = 1, perPage = 10 } = req.query;
	const skip = (page - 1) * perPage;
	const take = perPage;
	try {
		const users = await prisma.user.findMany({
			skip,
			take
		});
		return res.status(200).json({ message: 'Success', page, perPage, data: users });
	} catch (error) {
		return res.status(500).json({ message: 'Error', error });
	}
};

const getUserById: RequestHandler<
	{ id: string },
	{ message: string; data?: object; error?: unknown },
	{ payload: Payload },
	{}
> = async (req, res) => {
	const { id } = req.params;
	if (id !== req.body.payload.id && !req.body.payload.is_admin) {
		return res.status(401).json({ message: 'Unauthorized' });
	}
	try {
		const user = await prisma.user.findUnique({
			where: { id }
		});
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		return res.status(200).json({ message: 'Success', data: user });
	} catch (error) {
		return res.status(500).json({ message: 'Error', error });
	}
};

const updateUserById: RequestHandler<
	{ id: string },
	{ message: string; data?: object; error?: unknown },
	{ payload: Payload; data: object },
	{}
> = async (req, res) => {
	const { id } = req.params;
	const updateData = req.body.data;
	if (!updateData) {
		return res.status(400).json({ message: 'Bad request' });
	} else if (id !== req.body.payload.id && !req.body.payload.is_admin) {
		return res.status(401).json({ message: 'Unauthorized' });
	}
	try {
		const user = await prisma.user.update({
			where: { id },
			data: updateData
		});
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		return res.status(200).json({ message: 'Success', data: { user } });
	} catch (error) {
		return res.status(500).json({ message: 'Error', error });
	}
};

const deleteUserById: RequestHandler<
	{ id: string },
	{ message: string; data?: object; error?: unknown },
	{ payload: Payload },
	{}
> = async (req, res) => {
	const { id } = req.params;
	if (!req.body.payload) {
		return res.status(401).json({ message: 'Unauthorized' });
	}
	try {
		const user = await prisma.user.delete({
			where: { id }
		});
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		return res.status(200).json({ message: 'Success', data: user });
	} catch (error) {
		return res.status(500).json({ message: 'Error', error });
	}
};

export default {
	countUsers,
	getAllUsers,
	getUserById,
	updateUserById,
	deleteUserById
};
