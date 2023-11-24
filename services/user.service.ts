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

const getAllUserAddresses = async (user_id: string) => {
	const user = await prisma.user.findUniqueOrThrow({
		where: { id: user_id },
		select: {
			addresses: true
		}
	});
	return user;
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

const lovePost = async (userId: string, postId: string) => {
	await prisma.post.update({
		where: { id: postId },
		data: {
			love_count: { increment: 1 },
			loves: {
				create: {
					user: { connect: { id: userId } }
				}
			}
		}
	});
};

const unlovePost = async (userId: string, postId: string) => {
	await prisma.post.update({
		where: { id: postId },
		data: {
			love_count: { decrement: 1 },
			loves: {
				delete: {
					post_id_user_id: { user_id: userId, post_id: postId }
				}
			}
		}
	});
};

const savePost = async (userId: string, postId: string) => {
	await prisma.post.update({
		where: { id: postId },
		data: {
			save_count: { increment: 1 },
			saves: {
				create: {
					user: { connect: { id: userId } }
				}
			}
		}
	});
};

const unsavePost = async (userId: string, postId: string) => {
	await prisma.post.update({
		where: { id: postId },
		data: {
			save_count: { decrement: 1 },
			saves: {
				delete: {
					post_id_user_id: { user_id: userId, post_id: postId }
				}
			}
		}
	});
};

const getAllSavedPosts = async (userId: string) => {
	const savedPosts = await prisma.post.findMany({
		where: { saves: { some: { user_id: userId } } }
	});
	return savedPosts;
};

export default {
	countUsers,
	getAllUsers,
	getAllUserAddresses,
	getUserById,
	updateUserById,
	deleteUserById,
	lovePost,
	unlovePost,
	savePost,
	unsavePost,
	getAllSavedPosts
};
