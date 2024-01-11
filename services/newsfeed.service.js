import prisma from '../config/prisma.js';

const getNewsfeed = async (user_id, address_id, radius) => {
    const userAddress = await prisma.userAddress.findUniqueOrThrow({
        where: { id: address_id, user_id }
    });

    const metaData = await prisma.$queryRawUnsafe(
        `
		SELECT
			b.id,
			b.name,
			b.avatar_image_url,
			b.address_name,
			ST_Distance_Sphere(point(?, ?), point(b.lat, b.lng)) AS distance,
			EXISTS(
				SELECT 1
				FROM UserFollowBusiness bf
				WHERE bf.business_id = b.id AND bf.user_id = ?
			) AS is_followed
		FROM
			Business b
		WHERE
			ST_Distance_Sphere(point(?, ?), point(b.lat, b.lng)) <= ?
		`,
        userAddress.lat,
        userAddress.lng,
        user_id,
        userAddress.lat,
        userAddress.lng,
        radius
    );

    const metaDataMap = metaData.reduce((res, data) => {
        if (data.is_followed) data.is_followed = true;
        else data.is_followed = false;
        res[data.id] = data;
        return res;
    }, {});

    const campaigns = await prisma.campaign.findMany({
        orderBy: { created_at: 'desc' },
        where: {
            business_id: {
                in: Object.keys(metaDataMap)
            }
        },
        include: {
            vouchers: {
                orderBy: { index: 'asc' }
            },
            saves: {
                select: {
                    user_id: true
                }
            },
            loves: {
                select: {
                    user_id: true
                }
            },
            comments: true
        }
    });

    for (const campaign of campaigns) {
        campaign.isSaved = campaign.saves.some((save) => save.user_id === user_id);
        campaign.isLoved = campaign.loves.some((love) => love.user_id === user_id);
    }

    const newsfeed = campaigns.map((post) => {
        const { business_id, ...rest } = post;
        return {
            ...rest,
            meta: metaDataMap[business_id]
        };
    });

    return newsfeed;
};

const getBusinessSuggestion = async (user_id, address_id, radius) => {
    const userAddress = await prisma.userAddress.findUniqueOrThrow({
        where: { id: address_id, user_id }
    });

    const businessSuggestion = await prisma.$queryRawUnsafe(
        `
        SELECT
            b.id,
            b.name,
            b.avatar_image_url,
            b.address_name,
            ST_Distance_Sphere(point(?, ?), point(b.lat, b.lng)) AS distance
        FROM
            Business b
        WHERE
            ST_Distance_Sphere(point(?, ?), point(b.lat, b.lng)) <= ?
            AND NOT EXISTS (
                SELECT 1
                FROM UserFollowBusiness bf
                WHERE bf.business_id = b.id
                AND bf.user_id = ?
            )
        LIMIT ?;
        `,
        userAddress.lat,
        userAddress.lng,
        userAddress.lat,
        userAddress.lng,
        radius,
        user_id,
        5
    );

    return businessSuggestion;
};

const search = async (keyword) => {
    const businesses = await prisma.business.findMany({
        where: {
            OR: [
                { name: { contains: keyword } },
                { description: { contains: keyword } },
                {
                    category: {
                        name: { contains: keyword }
                    }
                },
                {
                    products: {
                        some: {
                            name: { contains: keyword }
                        }
                    }
                },
                {
                    products: {
                        some: {
                            description: { contains: keyword }
                        }
                    }
                },
                {
                    productCategories: {
                        some: {
                            name: { contains: keyword }
                        }
                    }
                },
                {
                    campaigns: {
                        some: {
                            name: { contains: keyword }
                        }
                    }
                },
                {
                    campaigns: {
                        some: {
                            description: { contains: keyword }
                        }
                    }
                }
            ]
        }
    });

    const campaigns = await prisma.campaign.findMany({
        where: {
            OR: [
                { name: { contains: keyword } },
                { description: { contains: keyword } },
                {
                    vouchers: {
                        some: {
                            description: { contains: keyword }
                        }
                    }
                }
            ]
        },
        include: {
            business: true
        }
    });

    return { businesses, campaigns };
};

export default {
    getNewsfeed,
    getBusinessSuggestion,
    search
};
