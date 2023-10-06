import { RequestHandler } from 'express';

import prisma from '../config/prisma';
import { Payload } from '../interfaces/payload';
import { Business, Prisma } from '@prisma/client';

const countBusinesses: RequestHandler<
	{},
	{ message: string; data?: number; error?: unknown },
	{ payload: Payload },
	{ page?: number; perPage?: number }
> = async (req, res) => {
	if (!req.body.payload) {
		return res.status(401).json({ message: 'Unauthorized' });
	}
	try {
		const count = await prisma.business.count();
		return res.status(200).json({ message: 'Success', data: count });
	} catch (error) {
		return res.status(500).json({ message: 'Error', error });
	}
};

const getAllBusinesses: RequestHandler<
	{},
	{ message: string; page?: number; perPage?: number; data?: Business[]; error?: unknown },
	{ payload: Payload },
	{ page?: number; perPage?: number }
> = async (req, res) => {
	if (!req.body.payload) {
		return res.status(401).json({ message: 'Unauthorized' });
	}
	const { page = 1, perPage = 100 } = req.query;
	const skip = (page - 1) * perPage;
	const take = perPage;
	try {
		const businesses = await prisma.business.findMany({
			skip,
			take
		});
		return res.status(200).json({ message: 'Success', page, perPage, data: businesses });
	} catch (error) {
		return res.status(500).json({ message: 'Error', error });
	}
};

const createBusiness: RequestHandler<
	{},
	{ message: string; data?: Business; error?: unknown },
	{
		payload: Payload;
		data: Prisma.BusinessUncheckedCreateInput &
			Prisma.BusinessCreateInput & { category_id?: string } & {
				address: Prisma.BusinessAddressCreateInput;
			} & {
				timetable: Prisma.BusinessTimetableCreateInput;
			} & {
				managers: Prisma.BusinessManagerCreateInput[];
			};
	},
	{ page?: number; perPage?: number }
> = async (req, res) => {
	const {
		category_id,
		name,
		description,
		avatar_image_url,
		email,
		phone_number,
		website,
		address = {},
		timetable = {},
		lowest_price,
		highest_price
	} = req.body.data;
	try {
		const business = await prisma.business.create({
			data: {
				category: {
					connect: {
						id: category_id
					}
				},
				name,
				description,
				avatar_image_url,
				email,
				phone_number,
				website,
				address: {
					create: {
						name: address.name,
						lat: address.lat,
						lng: address.lng
					}
				},
				timetable: {
					create: {
						mon_opens_at: timetable.mon_opens_at,
						mon_closes_at: timetable.mon_closes_at,
						tue_opens_at: timetable.tue_opens_at,
						tue_closes_at: timetable.tue_closes_at,
						wed_opens_at: timetable.wed_opens_at,
						wed_closes_at: timetable.wed_closes_at,
						thu_opens_at: timetable.thu_opens_at,
						thu_closes_at: timetable.thu_closes_at,
						fri_opens_at: timetable.fri_opens_at,
						fri_closes_at: timetable.fri_closes_at,
						sat_opens_at: timetable.sat_opens_at,
						sat_closes_at: timetable.sat_closes_at,
						sun_opens_at: timetable.sat_opens_at,
						sun_closes_at: timetable.sat_closes_at
					}
				},
				lowest_price,
				highest_price,
				managers: {
					create: {
						user_id: req.body.payload.id
					}
				}
			}
		});
		return res.status(201).json({ message: 'Success', data: business });
	} catch (error) {
		return res.status(500).json({ message: 'Error', error });
	}
};

const getBusinessById: RequestHandler<
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
		const business = await prisma.business.findUnique({
			where: { id }
		});
		if (!business) {
			return res.status(404).json({ message: 'Not found' });
		}
		return res.status(200).json({ message: 'Success', data: business });
	} catch (error) {
		return res.status(500).json({ message: 'Error', error });
	}
};

const updateBusinessById: RequestHandler<
	{ id: string },
	{ message: string; data?: Business; error?: unknown },
	{ payload: Payload; data: Prisma.BusinessUpdateInput },
	{}
> = async (req, res) => {
	if (!req.body.payload) {
		return res.status(401).json({ message: 'Unauthorized' });
	}
	const { id } = req.params;
	try {
		const business = await prisma.business.update({
			where: { id },
			data: req.body.data
		});
		return res.status(200).json({ message: 'Success', data: business });
	} catch (error) {
		return res.status(500).json({ message: 'Error', error });
	}
};

const deleteBusinessById: RequestHandler<
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
		const business = await prisma.business.delete({
			where: { id }
		});
		return res.status(200).json({ message: 'Success', data: business });
	} catch (error) {
		return res.status(500).json({ message: 'Error', error });
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
	getBusinessById,
	updateBusinessById,
	deleteBusinessById,
	followBusinessById,
	unfollowBusinessById
};
