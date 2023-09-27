import 'dotenv/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { RequestHandler } from 'express';

import prisma from '../config/prisma';
import { Payload } from '../interfaces/payload';

const generateToken = (user: Prisma.UserCreateInput) => {
	return jwt.sign({ id: user.id }, process.env.TOKEN_SECRET || 'secret');
};

const register: RequestHandler<
	{},
	{ message: string; error?: unknown },
	{ email: string; password: string },
	{}
> = async (req, res) => {
	const { email, password } = req.body;
	try {
		const existingUser = await prisma.user.findUnique({
			where: { email }
		});
		if (existingUser) {
			return res.status(400).json({ message: 'Email is already in use' });
		}
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(password, saltRounds);
		await prisma.user.create({
			data: {
				email,
				password: hashedPassword
			}
		});
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
	{ email: string; password: string },
	{}
> = async (req, res) => {
	const { email, password } = req.body;
	try {
		if (!(email && password)) {
			return res.status(400).json({ message: 'Missing email or password' });
		}
		const user = await prisma.user.findUnique({
			where: { email }
		});
		if (!user) {
			return res.status(404).json({ message: 'Incorrect email or password' });
		}
		const isValid = await bcrypt.compare(password, user.password);
		if (!isValid) {
			return res.status(401).json({ message: 'Incorrect email or password' });
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
	const payload = req.body.payload;
	const { oldPassword, newPassword } = req.body;
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
