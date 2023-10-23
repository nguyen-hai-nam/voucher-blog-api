import { Prisma } from '@prisma/client';

import prisma from '../config/prisma';

const countBusinesses = async (query?: Prisma.BusinessWhereInput) => {
	const count = await prisma.business.count({
		where: { ...query }
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

const createBusiness = async (data: Prisma.BusinessCreateInput) => {
	const business = await prisma.business.create({
		data
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

const deleteBusinessById = async (id: string) => {
	const deletedBusinessId = await prisma.business.delete({
		where: { id },
		select: { id: true }
	});
	return deletedBusinessId;
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
	deleteBusinessById
};
