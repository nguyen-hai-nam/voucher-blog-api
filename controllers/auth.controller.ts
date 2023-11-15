import { RequestHandler } from 'express';
import { User } from '@prisma/client';

import { Payload } from '../interfaces/payload';
import authService from '../services/auth.service';
import userService from '../services/user.service';

const getCurrentUser: RequestHandler<
	{},
	{ message: string; data?: User | null; error?: unknown },
	{ payload: Payload },
	{}
> = async (req, res, next) => {
	try {
		const user = await userService.getUserById(req.body.payload.id);
		return res.status(200).json({
			message: 'Success',
			data: user
		});
	} catch (error) {
		next(error);
	}
};

const register: RequestHandler<
	{},
	{ message: string; token?: string; data?: User; error?: unknown },
	{ email?: string; phoneNumber?: string; password: string },
	{}
> = async (req, res, next) => {
	const { email, phoneNumber, password } = req.body;
	if (!((email || phoneNumber) && password)) {
		return res.status(400).json({ message: 'Missing credentials' });
	}
	try {
		let token;
		if (email) {
			token = await authService.registerWithEmail(email, password);
		} else if (phoneNumber) {
			token = await authService.registerWithPhoneNumber(phoneNumber, password);
		}
		return res.status(201).json({
			message: 'Success',
			token
		});
	} catch (error) {
		next(error);
	}
};

const login: RequestHandler<
	{},
	{ message: string; token?: string; error?: unknown },
	{ email?: string; phoneNumber?: string; password: string },
	{}
> = async (req, res, next) => {
	const { email, phoneNumber, password } = req.body;
	if (!((email || phoneNumber) && password)) {
		return res.status(400).json({ message: 'Missing credentials' });
	}
	try {
		let token;
		if (email) {
			token = await authService.loginWithEmail(email, password);
		} else if (phoneNumber) {
			token = await authService.loginWithPhoneNumber(phoneNumber, password);
		}
		return res.status(200).json({
			message: 'Success',
			token
		});
	} catch (error) {
		next(error);
	}
};

// TODO: Revoke old tokens after changing password succcesfully
const changePassword: RequestHandler<
	{},
	{ message: string; error?: unknown },
	{ payload: Payload; oldPassword: string; newPassword: string },
	{}
> = async (req, res, next) => {
	const { payload, oldPassword, newPassword } = req.body;
	try {
		await authService.changePassword(payload.id, oldPassword, newPassword);
		return res.status(200).json({ message: 'Success' });
	} catch (error) {
		next(error);
	}
};

export default {
	getCurrentUser,
	register,
	login,
	changePassword
};
