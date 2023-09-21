import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Payload } from '../interfaces/payload';
import { AuthorizedRequest } from '../interfaces/request';

export const isAuth = (req: Request, res: Response, next: NextFunction): void => {
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
			res.sendStatus(401);
			return;
		}
	} catch (error) {
		res.sendStatus(500);
		return;
	}
	(req as AuthorizedRequest).payload = payload;
	next();
};
