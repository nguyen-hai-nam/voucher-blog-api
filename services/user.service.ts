import { Prisma } from '@prisma/client';

import prisma from '../config/prisma';

const countUsers = async (query?: Prisma.UserWhereInput) => {
	const count = await prisma.user.count({
		where: { ...query }
	});
	return count;
};

const getAllUsers = async (skip: number, take: number, query?: Prisma.UserWhereInput) => {
	const users = await prisma.user.findMany({
		where: { ...query }
	});
	return users;
};

const getUserById = async (id: string) => {
	const user = await prisma.user.findUniqueOrThrow({
		where: { id }
	});
	return user;
};

const updateUserById = async (id: string, updateData: Prisma.UserUpdateInput) => {
	const updatedUserId = await prisma.user.update({
		where: { id },
		data: updateData,
		select: { id: true }
	});
	return updatedUserId;
};

const deleteUserById = async (id: string) => {
	const deletedUserId = await prisma.user.delete({
		where: { id },
		select: { id: true }
	});
	return deletedUserId;
};

export default {
	countUsers,
	getAllUsers,
	getUserById,
	updateUserById,
	deleteUserById
};
