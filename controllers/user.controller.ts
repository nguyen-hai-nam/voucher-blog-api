import { Request, Response } from 'express';
import User from '../models/user.model';

const getAllUsers = async (req: Request, res: Response) => {
	try {
		const users = await User.find();
		return res.status(200).json(users);
	} catch (error: any) {
		return res.status(500).json({ message: error.message });
	}
};

const getUserById = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const user = await User.findById(id);
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
		const user = await User.findByIdAndUpdate(id, updateData, { new: true });
		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}
		return res.status(200).json(user);
	} catch (error: any) {
		return res.status(500).json({ message: error.message });
	}
};

const deleteUserById = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const user = await User.findByIdAndDelete(id);
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
	updateUserById,
	deleteUserById
};
