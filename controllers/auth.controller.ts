import { RequestHandler } from 'express';
import { User } from '@prisma/client';

import { Payload } from '../interfaces/payload';
import AuthService from '../services/auth.service';

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
			token = await AuthService.registerWithEmail(email, password);
		} else if (phoneNumber) {
			token = await AuthService.registerWithPhoneNumber(phoneNumber, password);
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
			token = await AuthService.loginWithEmail(email, password);
		} else if (phoneNumber) {
			token = await AuthService.loginWithPhoneNumber(phoneNumber, password);
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
		await AuthService.changePassword(payload.id, oldPassword, newPassword);
		return res.status(200).json({ message: 'Success' });
	} catch (error) {
		next(error);
	}
};

export default {
	register,
	login,
	changePassword
};
