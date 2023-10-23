import { RequestHandler } from 'express';
import { Business, Prisma } from '@prisma/client';

import prisma from '../config/prisma';
import { Payload } from '../interfaces/payload';
import BusinessService from '../services/business.service';

const countBusinesses: RequestHandler<
	{},
	{ message: string; data?: object; error?: unknown },
	{ payload: Payload },
	{ page?: number; perPage?: number }
> = async (req, res, next) => {
	if (!req.body.payload) {
		return res.status(401).json({ message: 'Unauthorized' });
	}
	try {
		const result = await BusinessService.countBusinesses();
		return res.status(200).json({ message: 'Success', data: { count: result } });
	} catch (error) {
		next(error);
	}
};

const getAllBusinesses: RequestHandler<
	{},
	{ message: string; page?: string; perPage?: string; data?: Business[]; error?: unknown },
	{ payload: Payload },
	{ page?: string; perPage?: string }
> = async (req, res) => {
	if (!req.body.payload) {
		return res.status(401).json({ message: 'Unauthorized' });
	}
	const { page = '1', perPage = '100' } = req.query;
	const skip = (parseInt(page, 10) - 1) * parseInt(perPage, 10);
	const take = parseInt(perPage, 10);
	try {
		const businesses = await BusinessService.getAllBusinesses(skip, take);
		return res.status(200).json({ message: 'Success', page, perPage, data: businesses });
	} catch (error) {
		return res.status(500).json({ message: 'Error', error });
	}
};

const createBusiness: RequestHandler<
	{},
	{ message: string; data?: Business; error?: unknown },
	{ payload: Payload; data: Prisma.BusinessCreateInput },
	{ page?: number; perPage?: number }
> = async (req, res, next) => {
	try {
		const business = await BusinessService.createBusiness(req.body.data);
		return res.status(201).json({ message: 'Success', data: business });
	} catch (error) {
		next(error);
	}
};

const createBusinessAddress: RequestHandler<
	{ business_id: string },
	{ message: string; data?: object; error?: unknown },
	{ payload: Payload; data: Prisma.BusinessAddressCreateInput },
	{}
> = async (req, res, next) => {
	if (!req.body.payload) {
		return res.status(401).json({ message: 'Unauthorized' });
	}
	try {
		const result = await BusinessService.createBusinessAddress(req.params.business_id, req.body.data);
		return res.status(201).json({ message: 'Success', data: result });
	} catch (error) {
		next(error);
	}
};

const createBusinessTimetable: RequestHandler<
	{ business_id: string },
	{ message: string; data?: object; error?: unknown },
	{ payload: Payload; data: Prisma.BusinessTimetableCreateInput },
	{}
> = async (req, res, next) => {
	if (!req.body.payload) {
		return res.status(401).json({ message: 'Unauthorized' });
	}
	try {
		const result = await BusinessService.createBusinessTimetable(req.params.business_id, req.body.data);
		return res.status(201).json({ message: 'Success', data: result });
	} catch (error) {
		next(error);
	}
};

const getBusinessById: RequestHandler<
	{ id: string },
	{ message: string; data?: Business; error?: unknown },
	{ payload: Payload },
	{ address: string; timetable: string }
> = async (req, res, next) => {
	if (!req.body.payload) {
		return res.status(401).json({ message: 'Unauthorized' });
	}
	const { id } = req.params;
	const query = {
		address: req.query.address === 'true',
		timetable: req.query.timetable === 'true'
	};
	try {
		const business = await BusinessService.getBusinessById(id, query);
		return res.status(200).json({ message: 'Success', data: business });
	} catch (error) {
		next(error);
	}
};

const updateBusinessById: RequestHandler<
	{ id: string },
	{ message: string; data?: { id: string }; error?: unknown },
	{ payload: Payload; data: Prisma.BusinessUpdateInput },
	{}
> = async (req, res, next) => {
	if (!req.body.payload) {
		return res.status(401).json({ message: 'Unauthorized' });
	}
	const { id } = req.params;
	try {
		const business = await BusinessService.updateBusinessById(id, req.body.data);
		return res.status(200).json({ message: 'Success', data: business });
	} catch (error) {
		next(error);
	}
};

const updateBusinessAddressById: RequestHandler<
	{ business_id: string; address_id: string },
	{ message: string; data?: { id: string }; error?: unknown },
	{ payload: Payload; data: Prisma.BusinessAddressUpdateInput },
	{}
> = async (req, res, next) => {
	if (!req.body.payload) {
		return res.status(401).json({ message: 'Unauthorized' });
	}
	const { business_id, address_id } = req.params;
	try {
		const business = await BusinessService.updateBusinessAddressById(business_id, address_id, req.body.data);
		return res.status(200).json({ message: 'Success', data: business });
	} catch (error) {
		next(error);
	}
};

const updateBusinessTimetableById: RequestHandler<
	{ id: string },
	{ message: string; data?: { id: string }; error?: unknown },
	{ payload: Payload; data: Prisma.BusinessTimetableUpdateInput },
	{}
> = async (req, res, next) => {
	if (!req.body.payload) {
		return res.status(401).json({ message: 'Unauthorized' });
	}
	const { id } = req.params;
	try {
		const business = await BusinessService.updateBusinessTimetableById(id, req.body.data);
		return res.status(200).json({ message: 'Success', data: business });
	} catch (error) {
		next(error);
	}
};

const deleteBusinessById: RequestHandler<
	{ id: string },
	{ message: string; data?: { id: string }; error?: unknown },
	{ payload: Payload },
	{}
> = async (req, res, next) => {
	if (!req.body.payload) {
		return res.status(401).json({ message: 'Unauthorized' });
	}
	const { id } = req.params;
	try {
		const business = await BusinessService.deleteBusinessById(id);
		return res.status(200).json({ message: 'Success', data: business });
	} catch (error) {
		next(error);
	}
};

const followBusinessById: RequestHandler<
	{ id: string },
	{ message: string; data?: Business; error?: unknown },
	{ payload: Payload },
	{}
> = async (req, res) => {
	if (!req.body.payload) {
		return res.status(401).json({ message: 'Unauthorized' });
	}
	const { id } = req.params;
	try {
		const business = await prisma.business.update({
			where: { id },
			data: {
				followers: {
					create: {
						user_id: req.body.payload.id
					}
				},
				follow_count: {
					increment: 1
				}
			}
		});
		return res.status(200).json({ message: 'Success', data: business });
	} catch (error) {
		return res.status(500).json({ message: 'Error', error });
	}
};

const unfollowBusinessById: RequestHandler<
	{ id: string },
	{ message: string; data?: Business; error?: unknown },
	{ payload: Payload },
	{}
> = async (req, res) => {
	if (!req.body.payload) {
		return res.status(401).json({ message: 'Unauthorized' });
	}
	const { id } = req.params;
	try {
		const business = await prisma.business.update({
			where: { id },
			data: {
				followers: {
					delete: {
						business_id_user_id: {
							business_id: id,
							user_id: req.body.payload.id
						}
					}
				},
				follow_count: {
					increment: -1
				}
			}
		});
		return res.status(200).json({ message: 'Success', data: business });
	} catch (error) {
		return res.status(500).json({ message: 'Error', error });
	}
};

export default {
	countBusinesses,
	getAllBusinesses,
	createBusiness,
	createBusinessAddress,
	createBusinessTimetable,
	getBusinessById,
	updateBusinessById,
	updateBusinessAddressById,
	updateBusinessTimetableById,
	deleteBusinessById,
	followBusinessById,
	unfollowBusinessById
};
