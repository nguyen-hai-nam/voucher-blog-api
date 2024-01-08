import prisma from '../config/prisma.js';

const countUsers = async (query) => {
    const count = await prisma.user.count({
        where: { ...query.where }
    });
    return count;
};

const getAllUsers = async (query) => {
    const users = await prisma.user.findMany({
        where: { ...query.where },
        skip: query.skip,
        take: query.take,
        select: query.select,
        include: query.include
    });
    return users;
};

const getUserById = async (id, query) => {
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

const loveCampaign = async (userId, campaignId) => {
    await prisma.campaign.update({
        where: { id: campaignId },
        data: {
            loves_count: { increment: 1 },
            loves: {
                create: {
                    user: { connect: { id: userId } }
                }
            }
        }
    });
};

const unloveCampaign = async (userId, campaignId) => {
    await prisma.campaign.update({
        where: { id: campaignId },
        data: {
            loves_count: { decrement: 1 },
            loves: {
                delete: {
                    campaign_id_user_id: { user_id: userId, campaign_id: campaignId }
                }
            }
        }
    });
};

const saveCampaign = async (userId, campaignId) => {
    await prisma.campaign.update({
        where: { id: campaignId },
        data: {
            saves_count: { increment: 1 },
            saves: {
                create: {
                    user: { connect: { id: userId } }
                }
            }
        }
    });
};

const unsaveCampaign = async (userId, campaignId) => {
    await prisma.campaign.update({
        where: { id: campaignId },
        data: {
            saves_count: { decrement: 1 },
            saves: {
                delete: {
                    campaign_id_user_id: { user_id: userId, campaign_id: campaignId }
                }
            }
        }
    });
};

export const getDistance = async (userAddressId, businessId) => {
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
    collectVoucher,
    discardVoucher,
    loveCampaign,
    unloveCampaign,
    saveCampaign,
    unsaveCampaign,
    getDistance,
    followBusiness,
    unfollowBusiness
};
