import { RequestHandler } from 'express';

import { Payload } from '../interfaces/payload';
import NewsfeedService from '../services/newsfeed.service';

const getNewsfeed: RequestHandler<
	{ user_id: string; address_id: string },
	{ message: string; data?: object; error?: unknown },
	{ payload: Payload },
	{ radius?: string }
> = async (req, res, next) => {
	try {
		const result = await NewsfeedService.getNewsfeed(
			req.params.user_id,
			req.params.address_id,
			parseInt(req.query.radius as string)
		);
		return res.status(200).json({ message: 'Success', data: result });
	} catch (error) {
		next(error);
	}
};

// const getUnfollowedNearbyBusinesses: RequestHandler<
// 	{},
// 	{ message: string; count?: number; data?: NearbyBusiness[]; error?: unknown },
// 	{ payload: Payload },
// 	{ count?: number; originLng?: number; originLat?: number; radius?: number }
// > = async (req, res) => {
// 	const { count = 10, originLng = 0, originLat = 0, radius = 2 } = req.query;
// 	try {
// 		const unfollowedNearbyBusinesses = await prisma.$queryRawUnsafe<NearbyBusiness[]>(
// 			'SELECT b.id, b.name, b.avatar_image_url, ST_Distance_Sphere(point(?, ?), point(ba.lat, ba.lng)) AS distance FROM Business b JOIN BusinessAddress ba ON b.address_id = ba.id WHERE ST_Distance_Sphere(point(?, ?), point(ba.lat, ba.lng)) <= ? AND NOT EXISTS(SELECT 1 FROM BusinessFollower bf WHERE bf.business_id = b.id AND bf.user_id = ?) LIMIT ?',
// 			originLat,
// 			originLng,
// 			originLat,
// 			originLng,
// 			radius,
// 			req.body.payload.id,
// 			count
// 		);
// 		return res
// 			.status(200)
// 			.json({ message: 'Success', count: unfollowedNearbyBusinesses.length, data: unfollowedNearbyBusinesses });
// 	} catch (error) {
// 		return res.status(500).json({ message: 'Error', error });
// 	}
// };

export default {
	getNewsfeed
	// getUnfollowedNearbyBusinesses
};
