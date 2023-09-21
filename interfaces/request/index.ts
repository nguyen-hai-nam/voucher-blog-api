import { Request } from 'express';
import { Payload } from '../payload';

export interface AuthorizedRequest extends Request {
	payload: Payload;
}

export interface TypedBodyRequest<T> extends AuthorizedRequest {
	body: T;
}
