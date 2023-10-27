import prisma from '../config/prisma';
import { BusinessSuggestion, MetaData, NewsfeedItem } from '../interfaces/newsfeed';

const getNewsfeed = async (user_id: string, address_id: string, radius: number) => {
	const userAddress = await prisma.userAddress.findUniqueOrThrow({
		where: { id: address_id, user_id }
	});

	const metaData = await prisma.$queryRawUnsafe<MetaData[]>(
		`
		SELECT
			b.id,
			b.name,
			b.avatar_image_url,
			ba.name AS address_name,
			ST_Distance_Sphere(point(?, ?), point(ba.lat, ba.lng)) AS distance,
			EXISTS(
				SELECT 1
				FROM BusinessFollower bf
				WHERE bf.business_id = b.id AND bf.user_id = ?
			) AS is_followed
		FROM
			Business b
			JOIN BusinessAddress ba ON b.address_id = ba.id
		WHERE
			ST_Distance_Sphere(point(?, ?), point(ba.lat, ba.lng)) <= ?
		`,
		userAddress.lat,
		userAddress.lng,
		user_id,
		userAddress.lat,
		userAddress.lng,
		radius
	);

	const metaDataMap = metaData.reduce((res: { [key: string]: MetaData }, data) => {
		if (data.is_followed) data.is_followed = true;
		else data.is_followed = false;
		res[data.id] = data;
		return res;
	}, {});

	const posts = await prisma.post.findMany({
		orderBy: { created_at: 'desc' },
		where: {
			business_id: {
				in: Object.keys(metaDataMap)
			}
		},
		include: {
			vouchers: {
				select: {
					index: true,
					voucher: true
				}
			}
		}
	});

	const newsfeed: NewsfeedItem[] = posts.map((post) => {
		const { business_id, ...rest } = post;
		return {
			...rest,
			meta: metaDataMap[business_id]
		};
	});

	return newsfeed;
};

const getBusinessSuggestion = async (user_id: string, address_id: string, radius: number) => {
	const userAddress = await prisma.userAddress.findUniqueOrThrow({
		where: { id: address_id, user_id }
	});

	const businessSuggestion = await prisma.$queryRawUnsafe<BusinessSuggestion[]>(
		`
        SELECT
            b.id,
            b.name,
            b.avatar_image_url,
            ba.name AS address_name,
            ST_Distance_Sphere(point(?, ?), point(ba.lat, ba.lng)) AS distance
        FROM
            Business b
            JOIN BusinessAddress ba ON b.address_id = ba.id
        WHERE
            ST_Distance_Sphere(point(?, ?), point(ba.lat, ba.lng)) <= ?
            AND NOT EXISTS (
                SELECT 1
                FROM BusinessFollower bf
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

export default {
	getNewsfeed,
	getBusinessSuggestion
};
