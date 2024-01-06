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

const getUserById = async (id, query = {}) => {
    const user = await prisma.user.findUniqueOrThrow({
        where: { id },
        select: query.select,
        include: query.include
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

export const getDistance = async (userAddressId, businessId) => {
    console.log(userAddressId, businessId);
    const res = await prisma.$queryRawUnsafe(
        `
            SELECT
                ST_Distance_Sphere(
                        point(business_lng, business_lat),
                        point(user_address_lng, user_address_lat)
                ) as distance
            FROM 
                (SELECT lng business_lng, lat business_lat FROM Business WHERE id = ?) as b,
                (SELECT lng user_address_lng, lat user_address_lat FROM UserAddress WHERE id = ?) as ua
        `,
        businessId,
        userAddressId
    );
    console.log(res[0].distance);
    return res[0].distance;
};

const followBusiness = async (userId, businessId) => {
    await prisma.$transaction([
        prisma.user.update({
            where: { id: userId },
            data: {
                following_businesses_count: { increment: 1 },
                followingBusinesses: {
                    create: {
                        business: { connect: { id: businessId } }
                    }
                }
            }
        }),
        prisma.business.update({
            where: { id: businessId },
            data: {
                followers_count: { increment: 1 }
            }
        })
    ]);
};

const unfollowBusiness = async (userId, businessId) => {
    await prisma.$transaction([
        prisma.user.update({
            where: { id: userId },
            data: {
                following_businesses_count: { decrement: 1 },
                followingBusinesses: {
                    delete: {
                        business_id_user_id: { user_id: userId, business_id: businessId }
                    }
                }
            }
        }),
        prisma.business.update({
            where: { id: businessId },
            data: {
                followers_count: { decrement: 1 }
            }
        })
    ]);
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
    unsavePost,
    getDistance,
    followBusiness,
    unfollowBusiness
};
