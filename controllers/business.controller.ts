import { RequestHandler } from 'express';
import { Business, Prisma } from '@prisma/client';

import prisma from '../config/prisma';
import { Payload } from '../interfaces/payload';
import businessService from '../services/business.service';

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
		const result = await businessService.countBusinesses();
		return res.status(200).json({ message: 'Success', data: { count: result } });
	} catch (error) {
		next(error);
	}
};

const countProducts: RequestHandler<
	{ business_id: string },
	{ message: string; data?: object; error?: unknown },
	{ payload: Payload },
	{ page?: number; perPage?: number }
> = async (req, res, next) => {
	if (!req.body.payload) {
		return res.status(401).json({ message: 'Unauthorized' });
	}
	try {
		const result = await businessService.countProducts(req.params.business_id);
		return res.status(200).json({ message: 'Success', data: { count: result } });
	} catch (error) {
		next(error);
	}
};

const countVouchers: RequestHandler<
	{ business_id: string },
	{ message: string; data?: object; error?: unknown },
	{ payload: Payload },
	{ page?: number; perPage?: number }
> = async (req, res, next) => {
	if (!req.body.payload) {
		return res.status(401).json({ message: 'Unauthorized' });
	}
	try {
		const result = await businessService.countVouchers(req.params.business_id);
		return res.status(200).json({ message: 'Success', data: { count: result } });
	} catch (error) {
		next(error);
	}
};

const countPosts: RequestHandler<
	{ business_id: string },
	{ message: string; data?: object; error?: unknown },
	{ payload: Payload },
	{ page?: number; perPage?: number }
> = async (req, res, next) => {
	if (!req.body.payload) {
		return res.status(401).json({ message: 'Unauthorized' });
	}
	try {
		const result = await businessService.countPosts(req.params.business_id);
		return res.status(200).json({ message: 'Success', data: { count: result } });
	} catch (error) {
		next(error);
	}
};

const getCategories: RequestHandler = async (req, res, next) => {
	try {
		const categories = await businessService.getCategories();
		return res.status(200).json({ message: 'Success', data: categories });
	} catch (error) {
		next(error);
	}
}

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
		const businesses = await businessService.getAllBusinesses(skip, take);
		return res.status(200).json({ message: 'Success', page, perPage, data: businesses });
	} catch (error) {
		return res.status(500).json({ message: 'Error', error });
	}
};

const getAllProducts: RequestHandler<
	{ business_id: string },
	{ message: string; page?: string; perPage?: string; data?: object; error?: unknown },
	{ payload: Payload },
	{ page?: string; perPage?: string }
> = async (req, res, next) => {
	if (!req.body.payload) {
		return res.status(401).json({ message: 'Unauthorized' });
	}
	const { page = '1', perPage = '100' } = req.query;
	const skip = (parseInt(page, 10) - 1) * parseInt(perPage, 10);
	const take = parseInt(perPage, 10);
	try {
		const products = await businessService.getAllProducts(req.params.business_id, skip, take);
		return res.status(200).json({ message: 'Success', page, perPage, data: products });
	} catch (error) {
		next(error);
	}
};

const getAllVouchers: RequestHandler<
	{ business_id: string },
	{ message: string; page?: string; perPage?: string; data?: object; error?: unknown },
	{ payload: Payload },
	{ page?: string; perPage?: string }
> = async (req, res, next) => {
	if (!req.body.payload) {
		return res.status(401).json({ message: 'Unauthorized' });
	}
	const { page = '1', perPage = '100' } = req.query;
	const skip = (parseInt(page, 10) - 1) * parseInt(perPage, 10);
	const take = parseInt(perPage, 10);
	try {
		const products = await businessService.getAllVouchers(req.params.business_id, skip, take);
		return res.status(200).json({ message: 'Success', page, perPage, data: products });
	} catch (error) {
		next(error);
	}
};

const getAllPosts: RequestHandler<
	{ business_id: string },
	{ message: string; page?: string; perPage?: string; data?: object; error?: unknown },
	{ payload: Payload },
	{ page?: string; perPage?: string }
> = async (req, res, next) => {
	if (!req.body.payload) {
		return res.status(401).json({ message: 'Unauthorized' });
	}
	const { page = '1', perPage = '100' } = req.query;
	const skip = (parseInt(page, 10) - 1) * parseInt(perPage, 10);
	const take = parseInt(perPage, 10);
	try {
		const products = await businessService.getAllPosts(req.params.business_id, skip, take);
		return res.status(200).json({ message: 'Success', page, perPage, data: products });
	} catch (error) {
		next(error);
	}
};

const createBusiness: RequestHandler<
	{},
	{ message: string; data?: Business; error?: unknown },
	{ payload: Payload; data: string },
	{ page?: number; perPage?: number }
> = async (req, res, next) => {
	try {
		const data = JSON.parse(req.body.data);
		const files = req.files as { [fieldname: string]: Express.Multer.File[] };
		for (const file of files.businessAvatarImage) {
			data.avatar_image_url = file.path;
		}
		// for (const file of files.businessFrontImages) {
		// 	req.body.data.front_images.push(file.path);
		// }
		// TODO: Upload middleware (Multer) overrides req.body => req.body.payload not exists
		const business = await businessService.createBusiness(req.body.payload.id, {});
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
		const result = await businessService.createBusinessAddress(req.params.business_id, req.body.data);
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
		const result = await businessService.createBusinessTimetable(req.params.business_id, req.body.data);
		return res.status(201).json({ message: 'Success', data: result });
	} catch (error) {
		next(error);
	}
};

const createProduct: RequestHandler<
	{ business_id: string },
	{ message: string; data?: object; error?: unknown },
	{ payload: Payload; data: Prisma.ProductCreateInput },
	{}
> = async (req, res, next) => {
	try {
		const result = await businessService.createProduct(req.params.business_id, req.body.data);
		return res.status(201).json({ message: 'Success', data: result });
	} catch (error) {
		next(error);
	}
};

const createVoucher: RequestHandler<
	{ business_id: string },
	{ message: string; data?: object; error?: unknown },
	{ payload: Payload; data: Prisma.VoucherCreateInput },
	{}
> = async (req, res, next) => {
	try {
		const result = await businessService.createVoucher(req.params.business_id, req.body.data);
		return res.status(201).json({ message: 'Success', data: result });
	} catch (error) {
		next(error);
	}
};

const createPost: RequestHandler<
	{ business_id: string },
	{ message: string; data?: object; error?: unknown },
	{ payload: Payload; data: Prisma.PostCreateInput },
	{}
> = async (req, res, next) => {
	try {
		const result = await businessService.createPost(req.params.business_id, req.body.data);
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
		const business = await businessService.getBusinessById(id, query);
		return res.status(200).json({ message: 'Success', data: business });
	} catch (error) {
		next(error);
	}
};

const getProductById: RequestHandler<
	{ business_id: string; id: string },
	{ message: string; data?: object; error?: unknown },
	{ payload: Payload },
	{}
> = async (req, res, next) => {
	const { business_id, id } = req.params;
	try {
		const result = await businessService.getProductById(business_id, id);
		return res.status(200).json({ message: 'Success', data: result });
	} catch (error) {
		next(error);
	}
};

const getVoucherById: RequestHandler<
	{ business_id: string; id: string },
	{ message: string; data?: object; error?: unknown },
	{ payload: Payload },
	{}
> = async (req, res, next) => {
	const { business_id, id } = req.params;
	try {
		const result = await businessService.getVoucherById(business_id, id);
		return res.status(200).json({ message: 'Success', data: result });
	} catch (error) {
		next(error);
	}
};

const getPostById: RequestHandler<
	{ business_id: string; id: string },
	{ message: string; data?: object; error?: unknown },
	{ payload: Payload },
	{}
> = async (req, res, next) => {
	const { business_id, id } = req.params;
	try {
		const result = await businessService.getPostById(business_id, id);
		return res.status(200).json({ message: 'Success', data: result });
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
		const business = await businessService.updateBusinessById(id, req.body.data);
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
		const business = await businessService.updateBusinessAddressById(business_id, address_id, req.body.data);
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
		const business = await businessService.updateBusinessTimetableById(id, req.body.data);
		return res.status(200).json({ message: 'Success', data: business });
	} catch (error) {
		next(error);
	}
};

const updateProductById: RequestHandler<
	{ business_id: string; id: string },
	{ message: string; data?: { id: string }; error?: unknown },
	{ payload: Payload; data: Prisma.ProductUpdateInput },
	{}
> = async (req, res, next) => {
	const { business_id, id } = req.params;
	try {
		const result = await businessService.updateProductById(business_id, id, req.body.data);
		return res.status(200).json({ message: 'Success', data: result });
	} catch (error) {
		next(error);
	}
};

const updateVoucherById: RequestHandler<
	{ business_id: string; id: string },
	{ message: string; data?: { id: string }; error?: unknown },
	{ payload: Payload; data: Prisma.VoucherUpdateInput },
	{}
> = async (req, res, next) => {
	const { business_id, id } = req.params;
	try {
		const result = await businessService.updateVoucherById(business_id, id, req.body.data);
		return res.status(200).json({ message: 'Success', data: result });
	} catch (error) {
		next(error);
	}
};

const updatePostById: RequestHandler<
	{ business_id: string; id: string },
	{ message: string; data?: { id: string }; error?: unknown },
	{ payload: Payload; data: Prisma.PostUpdateInput },
	{}
> = async (req, res, next) => {
	const { business_id, id } = req.params;
	try {
		const result = await businessService.updatePostById(business_id, id, req.body.data);
		return res.status(200).json({ message: 'Success', data: result });
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
		const business = await businessService.deleteBusinessById(id);
		return res.status(200).json({ message: 'Success', data: business });
	} catch (error) {
		next(error);
	}
};

const deleteProductById: RequestHandler<
	{ business_id: string; id: string },
	{ message: string; data?: { id: string }; error?: unknown },
	{ payload: Payload },
	{}
> = async (req, res, next) => {
	const { business_id, id } = req.params;
	try {
		const result = await businessService.deleteProductById(business_id, id);
		return res.status(200).json({ message: 'Success', data: result });
	} catch (error) {
		next(error);
	}
};

const deleteVoucherById: RequestHandler<
	{ business_id: string; id: string },
	{ message: string; data?: { id: string }; error?: unknown },
	{ payload: Payload },
	{}
> = async (req, res, next) => {
	const { business_id, id } = req.params;
	try {
		const result = await businessService.deleteVoucherById(business_id, id);
		return res.status(200).json({ message: 'Success', data: result });
	} catch (error) {
		next(error);
	}
};

const deletePostById: RequestHandler<
	{ business_id: string; id: string },
	{ message: string; data?: { id: string }; error?: unknown },
	{ payload: Payload },
	{}
> = async (req, res, next) => {
	const { business_id, id } = req.params;
	try {
		const result = await businessService.deletePostById(business_id, id);
		return res.status(200).json({ message: 'Success', data: result });
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
	countProducts,
	countVouchers,
	countPosts,
	getCategories,
	getAllBusinesses,
	getAllProducts,
	getAllVouchers,
	getAllPosts,
	createBusiness,
	createBusinessAddress,
	createBusinessTimetable,
	createProduct,
	createVoucher,
	createPost,
	getBusinessById,
	getProductById,
	getVoucherById,
	getPostById,
	updateBusinessById,
	updateBusinessAddressById,
	updateBusinessTimetableById,
	updateProductById,
	updateVoucherById,
	updatePostById,
	deleteBusinessById,
	deleteProductById,
	deleteVoucherById,
	deletePostById,
	followBusinessById,
	unfollowBusinessById
};
