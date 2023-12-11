import prisma from '../config/prisma.js';

const countUsers = async (query) => {
    const count = await prisma.user.count({
        where: { ...query }
    });
    return count;
};

const getAllUsers = async (skip, take, query) => {
    const users = await prisma.user.findMany({
        where: { ...query }
    });
    return users;
};

const getUserById = async (id) => {
    const user = await prisma.user.findUniqueOrThrow({
        where: { id }
    });
    return user;
};

const updateUserById = async (id, updateData) => {
    const updatedUserId = await prisma.user.update({
        where: { id },
        data: updateData,
        select: { id: true }
    });
    return updatedUserId;
};

const deleteUserById = async (id) => {
    const deletedUserId = await prisma.user.delete({
        where: { id },
        select: { id: true }
    });
    return deletedUserId;
};

const getAddresses = async (userId) => {
    const addresses = await prisma.userAddress.findMany({
        where: { user_id: userId }
    });
    return addresses;
};

const getManagingBusinesses = async (userId) => {
    const managingBusinesses = await prisma.business.findMany({
        where: { managers: { some: { user_id: userId } } }
    });
    return managingBusinesses;
};

const getFollowingBusinesses = async (userId) => {
    const managingBusinesses = await prisma.business.findMany({
        where: { followers: { some: { user_id: userId } } }
    });
    return managingBusinesses;
};

const getCollectedVouchers = async (userId) => {
    const collectedVouchers = await prisma.voucher.findMany({
        where: { collectedBy: { some: { user_id: userId } } }
    });
    return collectedVouchers;
};

const collectVoucher = async (userId, voucherId) => {
    await prisma.voucher.update({
        where: { id: voucherId },
        data: {
            collected_count: { increment: 1 },
            collectedBy: {
                create: {
                    user: { connect: { id: userId } }
                }
            }
        }
    });
};

const discardVoucher = async (userId, voucherId) => {
    await prisma.voucher.update({
        where: { id: voucherId },
        data: {
            collected_count: { decrement: 1 },
            collectedBy: {
                delete: {
                    voucher_id_user_id: { user_id: userId, voucher_id: voucherId }
                }
            }
        }
    });
};

const getUsedVouchers = async (userId) => {
    const usedVouchers = await prisma.voucher.findMany({
        where: { usedBy: { some: { user_id: userId } } }
    });
    return usedVouchers;
};

const getLovedPosts = async (userId) => {
    const savedPosts = await prisma.post.findMany({
        where: { loves: { some: { user_id: userId } } }
    });
    return savedPosts;
};

const lovePost = async (userId, postId) => {
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

const unlovePost = async (userId, postId) => {
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

const getSavedPosts = async (userId) => {
    const savedPosts = await prisma.post.findMany({
        where: { saves: { some: { user_id: userId } } }
    });
    return savedPosts;
};

const savePost = async (userId, postId) => {
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

const unsavePost = async (userId, postId) => {
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

export default {
    countUsers,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    getAddresses,
    getManagingBusinesses,
    getFollowingBusinesses,
    getCollectedVouchers,
    collectVoucher,
    discardVoucher,
    getUsedVouchers,
    getLovedPosts,
    getSavedPosts,
    lovePost,
    unlovePost,
    savePost,
    unsavePost
};
