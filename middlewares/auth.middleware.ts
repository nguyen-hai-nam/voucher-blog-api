import 'dotenv/config';
import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { Payload } from '../interfaces/payload';

export const isAuth: RequestHandler = (req, res, next) => {
	const authHeader = req.get('Authorization');
	if (!authHeader) {
		return res.status(401).json({ message: 'Unauthorized', error: 'Missing Authorization header' });
	}
	const token = authHeader.split(' ')[1];
	let payload: Payload;
	try {
		payload = <Payload>jwt.verify(token, process.env.TOKEN_SECRET || 'secret');
		if (!payload) {
			return res.status(401).json({ message: 'Unauthorized', error: 'Unauthorized' });
		}
	} catch (error) {
		return res.status(500).json({ message: 'Error', error });
	}
	req.body.payload = payload;
	next();
};

export const isAdmin: RequestHandler = (req, res, next) => {
	const authHeader = req.get('Authorization');
	if (!authHeader) {
		return res.status(401).json({ message: 'Unauthorized', error: 'Missing Authorization header' });
	}
	const token = authHeader.split(' ')[1];
	let payload: Payload;
	try {
		payload = <Payload>jwt.verify(token, process.env.TOKEN_SECRET || 'secret');
		if (!payload || !payload.is_admin) {
			return res.status(401).json({ message: 'Unauthorized', error: 'Unauthorized' });
		}
	} catch (error) {
		return res.status(500).json({ message: 'Error', error });
	}
	req.body.payload = payload;
	next();
}
