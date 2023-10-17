import 'dotenv/config';
import jwt from 'jsonwebtoken';

import { Payload } from '../../interfaces/payload';

export const generateAccessToken = (payload: Payload) => {
	return jwt.sign({ id: payload.id, is_admin: payload.is_admin }, process.env.TOKEN_SECRET || 'secret');
};
