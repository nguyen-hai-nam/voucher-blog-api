import 'dotenv/config';
import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { Payload } from '../interfaces/payload';

export const isAuth: RequestHandler = (req, res, next) => {
	const authHeader = req.get('Authorization');
	if (!authHeader) {
		res.sendStatus(401);
		return;
	}
	const token = authHeader.split(' ')[1];
	let payload: Payload;
	try {
		payload = <Payload>jwt.verify(token, process.env.TOKEN_SECRET || 'secret');
		if (!payload) {
			return res.status(401).json({ message: 'Unauthorized' });
		}
	} catch (error) {
		return res.status(500).json({ message: 'An error occurred', error });
	}
	req.body.payload = payload;
	next();
};
