import { Request } from 'express';
import { Payload } from '../payload';

export interface AuthRequest extends Request {
	payload: Payload;
}
