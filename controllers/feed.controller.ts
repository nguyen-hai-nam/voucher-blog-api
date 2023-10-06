import { RequestHandler } from 'express';

import prisma from '../config/prisma';
import { Payload } from '../interfaces/payload';
import { VoucherStatus } from '@prisma/client';

interface NearbyBusiness {
	id: string;
	name: string;
	avatar_image_url: string;
	distance: number;
	isFollowed: boolean;
}

interface NewsfeedPost {
	id: string;
	business_id: string;
	content: string;
	vouchers: {
		index: number;
		voucher: {
			id: string;
			image_url: string;
			percent: number | null;
			value: number | null;
			max_value: number | null;
			fixed_price: number | null;
			status: VoucherStatus;
			apply_date: Date;
			expiration_date: Date;
		};
	}[];
	created_at: Date;
	business?: NearbyBusiness;
}

interface BusinessMap {
	[id: string]: NearbyBusiness;
}

const getNewsfeed: RequestHandler<
	{},
	{ message: string; page?: number; perPage?: number; data?: NewsfeedPost[]; error?: unknown },
	{ payload: Payload },
	{ page?: number; perPage?: number; originLng?: number; originLat?: number; radius?: number }
> = async (req, res) => {
	const { page = 1, perPage = 10, originLng = 0, originLat = 0, radius = 2 } = req.query;
	try {
		const nearbyBusinesses = await prisma.$queryRawUnsafe<NearbyBusiness[]>(
			'SELECT b.id, b.name, b.avatar_image_url, ST_Distance_Sphere(point(?, ?), point(ba.lat, ba.lng)) AS distance, EXISTS(SELECT 1 FROM BusinessFollower bf WHERE bf.business_id = b.id AND bf.user_id = ?) AS isFollowed FROM Business b JOIN BusinessAddress ba ON b.address_id = ba.id WHERE ST_Distance_Sphere(point(?, ?), point(ba.lat, ba.lng)) <= ?',
			originLat,
			originLng,
			req.body.payload.id,
			originLat,
			originLng,
			radius
		);

		const idToBusiness: BusinessMap = {};
		for (const business of nearbyBusinesses) {
			if (business.isFollowed) {
				business.isFollowed = true;
			} else {
				business.isFollowed = false;
			}
			idToBusiness[business.id] = business;
		}

		const posts: NewsfeedPost[] = await prisma.post.findMany({
			skip: (page - 1) * perPage,
			take: perPage,
			orderBy: { created_at: 'desc' },
			where: {
				business_id: {
					in: nearbyBusinesses.map((business) => business.id)
				}
			},
			select: {
				id: true,
				business_id: true,
				content: true,
				vouchers: {
					select: {
						index: true,
						voucher: {
							select: {
								id: true,
								image_url: true,
								percent: true,
								value: true,
								max_value: true,
								fixed_price: true,
								status: true,
								apply_date: true,
								expiration_date: true
							}
						}
					}
				},
				created_at: true
			}
		});

		for (let i = 0; i < posts.length; i++) {
			const business = idToBusiness[posts[i].business_id];
			if (business) {
				posts[i].business = business;
			}
		}

		return res.status(200).json({ message: 'Success', page, perPage, data: posts });
	} catch (error) {
		return res.status(500).json({ message: 'Error', error });
	}
};

const getUnfollowedNearbyBusinesses: RequestHandler<
	{},
	{ message: string; count?: number; data?: NearbyBusiness[]; error?: unknown },
	{ payload: Payload },
	{ count?: number; originLng?: number; originLat?: number; radius?: number }
> = async (req, res) => {
	const { count = 10, originLng = 0, originLat = 0, radius = 2 } = req.query;
	try {
		const unfollowedNearbyBusinesses = await prisma.$queryRawUnsafe<NearbyBusiness[]>(
			'SELECT b.id, b.name, b.avatar_image_url, ST_Distance_Sphere(point(?, ?), point(ba.lat, ba.lng)) AS distance FROM Business b JOIN BusinessAddress ba ON b.address_id = ba.id WHERE ST_Distance_Sphere(point(?, ?), point(ba.lat, ba.lng)) <= ? AND NOT EXISTS(SELECT 1 FROM BusinessFollower bf WHERE bf.business_id = b.id AND bf.user_id = ?) LIMIT ?',
			originLat,
			originLng,
			originLat,
			originLng,
			radius,
			req.body.payload.id,
			count
		);

		console.log(unfollowedNearbyBusinesses);

		return res
			.status(200)
			.json({ message: 'Success', count: unfollowedNearbyBusinesses.length, data: unfollowedNearbyBusinesses });
	} catch (error) {
		return res.status(500).json({ message: 'Error', error });
	}
};

export default {
	getNewsfeed,
	getUnfollowedNearbyBusinesses
};
