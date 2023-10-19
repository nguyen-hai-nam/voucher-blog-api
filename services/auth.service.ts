import createHttpError from 'http-errors';

import prisma from '../config/prisma';
import { comparePasswords, hashPassword } from '../helpers/auth/password';
import { saltRounds } from '../constants/auth.constant';
import { isEmail, isVietnamPhoneNumber } from '../helpers/validators';
import { generateAccessToken } from '../helpers/auth/jwt';

const registerWithEmail = async (email: string, password: string) => {
	const existingEmail = await prisma.userEmail.findUnique({
		where: { id: email }
	});
	if (existingEmail) {
		throw createHttpError(400, 'Email already exists');
	}
	const hashedPassword = await hashPassword(password, saltRounds);
	const newUser = await prisma.user.create({
		data: {
			password: hashedPassword
		}
	});
	return newUser;
};

const registerWithPhoneNumber = async (phoneNumber: string, password: string) => {
	const existingPhoneNumber = await prisma.userPhoneNumber.findUnique({
		where: { id: phoneNumber }
	});
	if (existingPhoneNumber) {
		throw createHttpError(400, 'Phone number already exists');
	}
	const hashedPassword = await hashPassword(password, saltRounds);
	const newUser = await prisma.user.create({
		data: {
			password: hashedPassword
		}
	});
	return newUser;
};

const loginWithEmail = async (email: string, password: string) => {
	if (!isEmail(email)) {
		throw createHttpError(400, 'Invalid email');
	}
	const existingEmail = await prisma.userEmail.findUnique({
		where: { id: email }
	});
	if (!existingEmail) {
		throw createHttpError(401, 'Unauthorized');
	}
	const user = await prisma.user.findUnique({
		where: { id: existingEmail.user_id }
	});
	if (!user) {
		throw createHttpError(401, 'Unauthorized');
	}
	const isValid = await comparePasswords(password, user.password);
	if (!isValid) {
		throw createHttpError(401, 'Unauthorized');
	}
	return generateAccessToken(user);
};

const loginWithPhoneNumber = async (phoneNumber: string, password: string) => {
	if (!isVietnamPhoneNumber(phoneNumber)) {
		throw createHttpError(400, 'Invalid phone number');
	}
	const existingPhoneNumber = await prisma.userPhoneNumber.findUnique({
		where: { id: phoneNumber }
	});
	if (!existingPhoneNumber) {
		throw createHttpError(401, 'Unauthorized');
	}
	const user = await prisma.user.findUnique({
		where: { id: existingPhoneNumber.user_id }
	});
	if (!user) {
		throw createHttpError(401, 'Unauthorized');
	}
	const isValid = await comparePasswords(password, user.password);
	if (!isValid) {
		throw createHttpError(401, 'Unauthorized');
	}
	return generateAccessToken(user);
};

const changePassword = async (userId: string, oldPassword: string, newPassword: string) => {
	const user = await prisma.user.findUnique({
		where: { id: userId }
	});
	if (!user) {
		throw createHttpError(401, 'Unauthorized');
	}
	const isValid = await comparePasswords(oldPassword, user.password);
	if (!isValid) {
		throw createHttpError(401, 'Unauthorized');
	}
	const hashedPassword = await hashPassword(newPassword, saltRounds);
	await prisma.user.update({
		where: {
			id: userId
		},
		data: {
			password: hashedPassword
		}
	});
	return true;
};

export default {
	registerWithEmail,
	registerWithPhoneNumber,
	loginWithEmail,
	loginWithPhoneNumber,
	changePassword
};
