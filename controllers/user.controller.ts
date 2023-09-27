import { Request, Response } from 'express';
import prisma from '../config/prisma';

const getAllUsers = async (req: Request, res: Response) => {
	try {
		const users = await prisma.user.findMany();
		return res.status(200).json(users);
	} catch (error: any) {
		return res.status(500).json({ message: error.message });
	}
};

const getUserById = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const user = await prisma.user.findUnique({
			where: { id }
		});
		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}
		return res.status(200).json(user);
	} catch (error: any) {
		return res.status(500).json({ message: error.message });
	}
};

const updateUserById = async (req: Request, res: Response) => {
	const { id } = req.params;
	const updateData = req.body;
	try {
		const user = await prisma.user.update({
			where: { id },
			data: updateData
		});
		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}
		return res.status(200).json(user);
	} catch (error: any) {
		return res.status(500).json({ message: error.message });
	}
};

export default {
	getAllUsers,
	getUserById,
	updateUserById
};
