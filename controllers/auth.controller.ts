import 'dotenv/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { RequestHandler } from 'express';

import prisma from '../config/prisma';
import { Payload } from '../interfaces/payload';

const generateToken = (payload: Payload) => {
	return jwt.sign({ id: payload.id }, process.env.TOKEN_SECRET || 'secret');
};

const register: RequestHandler<
	{},
	{ message: string; error?: unknown },
	{ email?: string; phoneNumber?: string; password: string },
	{}
> = async (req, res) => {
	const { email, phoneNumber, password } = req.body;
	if (!((email || phoneNumber) && password)) {
		return res.status(400).json({ message: 'Missing information' });
	}
	try {
		let existingEmail;
		let existingPhoneNumber;
		if (email) {
			existingEmail = await prisma.userEmail.findUnique({
				where: { id: email }
			});
			if (existingEmail) {
				return res.status(400).json({ message: 'Email is already in use' });
			}
		}
		if (phoneNumber) {
			existingPhoneNumber = await prisma.userPhoneNumber.findUnique({
				where: { id: phoneNumber }
			});
			if (existingPhoneNumber) {
				return res.status(400).json({ message: 'Phone number is already in use' });
			}
		}
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(password, saltRounds);
		const newUser = await prisma.user.create({
			data: {
				password: hashedPassword
			}
		});
		if (email) {
			await prisma.userEmail.create({
				data: {
					id: email,
					user_id: newUser.id
				}
			});
		}
		if (phoneNumber) {
			await prisma.userPhoneNumber.create({
				data: {
					id: phoneNumber,
					user_id: newUser.id
				}
			});
		}
		return res.status(201).json({ message: 'Register successfully' });
	} catch (error) {
		return res.status(500).json({
			message: 'An error occurred while registering',
			error
		});
	}
};

const login: RequestHandler<
	{},
	{ message: string; token?: string; error?: unknown },
	{ email?: string; phoneNumber?: string; password: string },
	{}
> = async (req, res) => {
	const { email, phoneNumber, password } = req.body;
	if (!((email || phoneNumber) && password)) {
		return res.status(400).json({ message: 'Missing information' });
	}
	try {
		let existingEmail;
		let existingPhoneNumber;
		let user;
		if (email) {
			existingEmail = await prisma.userEmail.findUnique({
				where: { id: email }
			});
		} else if (phoneNumber) {
			existingPhoneNumber = await prisma.userPhoneNumber.findUnique({
				where: { id: phoneNumber }
			});
		}
		if (!(existingEmail || existingPhoneNumber)) {
			return res.status(401).json({ message: 'Incorrect information' });
		}
		if (existingEmail) {
			user = await prisma.user.findUnique({
				where: { id: existingEmail.user_id }
			});
		} else if (existingPhoneNumber) {
			user = await prisma.user.findUnique({
				where: { id: existingPhoneNumber.user_id }
			});
		}
		if (!user) {
			return res.status(401).json({ message: 'Incorrect information' });
		}
		const isValid = await bcrypt.compare(password, user.password);
		if (!isValid) {
			return res.status(401).json({ message: 'Incorrect information' });
		}
		const token = generateToken(user);
		return res.status(200).json({
			message: 'Log in successfully',
			token
		});
	} catch (error) {
		return res.status(500).json({
			message: 'An error occurred while logging in',
			error
		});
	}
};

// TODO: Revoke old tokens after changing password succcesfully
const changePassword: RequestHandler<
	{},
	{ message: string; error?: unknown },
	{ payload: Payload; oldPassword: string; newPassword: string },
	{}
> = async (req, res) => {
	const { payload, oldPassword, newPassword } = req.body;
	try {
		const user = await prisma.user.findUnique({
			where: { id: payload.id }
		});
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		const isValid = await bcrypt.compare(oldPassword, user.password);
		if (!isValid) {
			return res.status(401).json({ message: 'Incorrect password' });
		}
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
		await prisma.user.update({
			where: {
				id: payload.id
			},
			data: {
				password: hashedPassword
			}
		});
		return res.status(200).json({ message: 'Change password successfully' });
	} catch (error) {
		return res.status(500).json({
			message: 'An error occurred while changing password',
			error
		});
	}
};

export default {
	register,
	login,
	changePassword
};
