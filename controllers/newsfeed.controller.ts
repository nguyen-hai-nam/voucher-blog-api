import { RequestHandler } from 'express';

import { Payload } from '../interfaces/payload';
import newsfeedService from '../services/newsfeed.service';

const getNewsfeed: RequestHandler<
	{ user_id: string; address_id: string },
	{ message: string; data?: object; error?: unknown },
	{ payload: Payload },
	{ radius?: string }
> = async (req, res, next) => {
	try {
		const result = await newsfeedService.getNewsfeed(
			req.params.user_id,
			req.params.address_id,
			parseInt(req.query.radius as string)
		);
		return res.status(200).json({ message: 'Success', data: result });
	} catch (error) {
		next(error);
	}
};

const getBusinessSuggestion: RequestHandler<
	{ user_id: string; address_id: string },
	{ message: string; data?: object; error?: unknown },
	{ payload: Payload },
	{ radius?: string }
> = async (req, res, next) => {
	try {
		const result = await newsfeedService.getBusinessSuggestion(
			req.params.user_id,
			req.params.address_id,
			parseInt(req.query.radius as string)
		);
		return res.status(200).json({ message: 'Success', data: result });
	} catch (error) {
		next(error);
	}
};

export default {
	getNewsfeed,
	getBusinessSuggestion
};
