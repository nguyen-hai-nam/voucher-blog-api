import { Prisma } from '@prisma/client';

import prisma from '../config/prisma';

const countBusinesses = async (query?: Prisma.BusinessWhereInput) => {
	const count = await prisma.business.count({
		where: { ...query }
	});
	return count;
};

const countProducts = async (business_id: string, query?: Prisma.ProductWhereInput) => {
	const count = await prisma.product.count({
		where: { ...query, business: { id: business_id } }
	});
	return count;
};

const countVouchers = async (business_id: string, query?: Prisma.VoucherWhereInput) => {
	const count = await prisma.voucher.count({
		where: { ...query, business: { id: business_id } }
	});
	return count;
};

const countPosts = async (business_id: string, query?: Prisma.PostWhereInput) => {
	const count = await prisma.post.count({
		where: { ...query, business: { id: business_id } }
	});
	return count;
};

const getAllBusinesses = async (skip: number, take: number, query?: Prisma.BusinessWhereInput) => {
	const businesses = await prisma.business.findMany({
		where: { ...query },
		skip,
		take
	});
	return businesses;
};

const getCategories = async () => {
	const categories = await prisma.businessCategory.findMany();
	return categories;
};

const getAllProducts = async (business_id: string, skip: number, take: number, query?: Prisma.ProductWhereInput) => {
	const products = await prisma.product.findMany({
		where: { ...query, business: { id: business_id } },
		skip,
		take
	});
	return products;
};

const getAllVouchers = async (business_id: string, skip: number, take: number, query?: Prisma.VoucherWhereInput) => {
	const vouchers = await prisma.voucher.findMany({
		where: { ...query, business: { id: business_id } },
		skip,
		take
	});
	return vouchers;
};

const getAllPosts = async (business_id: string, skip: number, take: number, query?: Prisma.PostWhereInput) => {
	const businesses = await prisma.post.findMany({
		where: { ...query, business: { id: business_id } },
		skip,
		take
	});
	return businesses;
};

const createBusiness = async (userId: string, data: Prisma.BusinessCreateInput) => {
	const business = await prisma.business.create({
		data: {
			...data,
			managers: {
				create: {
					user: { connect: { id: userId } }
				}
			}
		}
	});
	return business;
};

const createBusinessAddress = async (business_id: string, data: Prisma.BusinessAddressCreateInput) => {
	const result = await prisma.businessAddress.create({
		data: {
			...data,
			business: {
				connect: { id: business_id }
			}
		}
	});
	return result;
};

const createBusinessTimetable = async (business_id: string, data: Prisma.BusinessTimetableCreateInput) => {
	const result = await prisma.businessTimetable.create({
		data: {
			...data,
			business: {
				connect: { id: business_id }
			}
		}
	});
	return result;
};

const createProduct = async (business_id: string, data: Prisma.ProductCreateInput) => {
	const result = await prisma.product.create({
		data: {
			...data,
			business: {
				connect: { id: business_id }
			}
		}
	});
	return result;
};

const createVoucher = async (business_id: string, data: Prisma.VoucherCreateInput) => {
	const result = await prisma.voucher.create({
		data: {
			...data,
			business: {
				connect: { id: business_id }
			}
		}
	});
	return result;
};

const createPost = async (business_id: string, data: Prisma.PostCreateInput) => {
	const result = await prisma.post.create({
		data: {
			...data,
			business: {
				connect: { id: business_id }
			}
		}
	});
	return result;
};

const getBusinessById = async (id: string, query: { address: boolean; timetable: boolean }) => {
	const business = await prisma.business.findUniqueOrThrow({
		where: { id },
		include: {
			address: query.address,
			timetable: query.timetable
		}
	});
	return business;
};

const getProductById = async (business_id: string, id: string) => {
	const business = await prisma.product.findUniqueOrThrow({
		where: { id, business: { id: business_id } }
	});
	return business;
};

const getVoucherById = async (business_id: string, id: string) => {
	const business = await prisma.voucher.findUniqueOrThrow({
		where: { id, business: { id: business_id } }
	});
	return business;
};

const getPostById = async (business_id: string, id: string) => {
	const business = await prisma.post.findUniqueOrThrow({
		where: { id, business: { id: business_id } }
	});
	return business;
};

const updateBusinessById = async (id: string, updateData: Prisma.BusinessUpdateInput) => {
	const updatedBusinessId = await prisma.business.update({
		where: { id },
		data: updateData,
		select: { id: true }
	});
	return updatedBusinessId;
};

const updateBusinessAddressById = async (
	business_id: string,
	address_id: string,
	updateData: Prisma.BusinessAddressUpdateInput
) => {
	const result = await prisma.businessAddress.update({
		where: {
			id: address_id,
			business: {
				is: { id: business_id }
			}
		},
		data: updateData,
		select: { id: true }
	});
	return result;
};

const updateBusinessTimetableById = async (id: string, updateData: Prisma.BusinessTimetableUpdateInput) => {
	const result = await prisma.businessTimetable.update({
		where: { id },
		data: updateData,
		select: { id: true }
	});
	return result;
};

const updateProductById = async (business_id: string, id: string, updateData: Prisma.ProductUpdateInput) => {
	const result = await prisma.product.update({
		where: {
			id,
			business: {
				id: business_id
			}
		},
		data: updateData,
		select: { id: true }
	});
	return result;
};

const updateVoucherById = async (business_id: string, id: string, updateData: Prisma.VoucherUpdateInput) => {
	const result = await prisma.voucher.update({
		where: {
			id,
			business: {
				id: business_id
			}
		},
		data: updateData,
		select: { id: true }
	});
	return result;
};

const updatePostById = async (business_id: string, id: string, updateData: Prisma.PostUpdateInput) => {
	const result = await prisma.post.update({
		where: {
			id,
			business: {
				id: business_id
			}
		},
		data: updateData,
		select: { id: true }
	});
	return result;
};

const deleteBusinessById = async (id: string) => {
	const result = await prisma.business.delete({
		where: { id },
		select: { id: true }
	});
	return result;
};

const deleteProductById = async (business_id: string, id: string) => {
	const result = await prisma.product.delete({
		where: {
			id,
			business: { id: business_id }
		},
		select: { id: true }
	});
	return result;
};

const deleteVoucherById = async (business_id: string, id: string) => {
	const result = await prisma.voucher.delete({
		where: {
			id,
			business: { id: business_id }
		},
		select: { id: true }
	});
	return result;
};

const deletePostById = async (business_id: string, id: string) => {
	const result = await prisma.post.delete({
		where: {
			id,
			business: { id: business_id }
		},
		select: { id: true }
	});
	return result;
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
	updateProductById,
	updateVoucherById,
	updatePostById,
	updateBusinessAddressById,
	updateBusinessTimetableById,
	deleteBusinessById,
	deleteProductById,
	deleteVoucherById,
	deletePostById
};
