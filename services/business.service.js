import prisma from '../config/prisma.js';

const countBusinesses = async (query) => {
    const count = await prisma.business.count({
        where: { ...query }
    });
    return count;
};

const countProducts = async (business_id, query) => {
    const count = await prisma.product.count({
        where: { ...query, business: { id: business_id } }
    });
    return count;
};

const countVouchers = async (business_id, query) => {
    const count = await prisma.voucher.count({
        where: { ...query, business: { id: business_id } }
    });
    return count;
};

const countPosts = async (business_id, query) => {
    const count = await prisma.post.count({
        where: { ...query, business: { id: business_id } }
    });
    return count;
};

const getAllBusinesses = async (skip, take, query) => {
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

const getAllProducts = async (business_id, skip, take, query) => {
    const products = await prisma.product.findMany({
        where: { ...query, business: { id: business_id } },
        skip,
        take
    });
    return products;
};

const getAllVouchers = async (business_id, skip, take, query) => {
    const vouchers = await prisma.voucher.findMany({
        where: { ...query, business: { id: business_id } },
        skip,
        take
    });
    return vouchers;
};

const getAllPosts = async (business_id, skip, take, query) => {
    const businesses = await prisma.post.findMany({
        where: { ...query, business: { id: business_id } },
        skip,
        take
    });
    return businesses;
};

const createBusiness = async (userId, data) => {
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

const createBusinessAddress = async (business_id, data) => {
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

const createBusinessTimetable = async (business_id, data) => {
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

const createProduct = async (business_id, data) => {
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

const createVoucher = async (business_id, data) => {
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

const createPost = async (business_id, data) => {
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

const getBusinessById = async (id, query) => {
    const business = await prisma.business.findUniqueOrThrow({
        where: { id },
        include: {
            address: query.address,
            timetable: query.timetable
        }
    });
    return business;
};

const getProductById = async (business_id, id) => {
    const business = await prisma.product.findUniqueOrThrow({
        where: { id, business: { id: business_id } }
    });
    return business;
};

const getVoucherById = async (business_id, id) => {
    const business = await prisma.voucher.findUniqueOrThrow({
        where: { id, business: { id: business_id } }
    });
    return business;
};

const getPostById = async (business_id, id) => {
    const business = await prisma.post.findUniqueOrThrow({
        where: { id, business: { id: business_id } }
    });
    return business;
};

const updateBusinessById = async (id, updateData) => {
    const updatedBusinessId = await prisma.business.update({
        where: { id },
        data: updateData,
        select: { id: true }
    });
    return updatedBusinessId;
};

const updateBusinessAddressById = async (business_id, address_id, updateData) => {
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

const updateBusinessTimetableById = async (id, updateData) => {
    const result = await prisma.businessTimetable.update({
        where: { id },
        data: updateData,
        select: { id: true }
    });
    return result;
};

const updateProductById = async (business_id, id, updateData) => {
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

const updateVoucherById = async (business_id, id, updateData) => {
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

const updatePostById = async (business_id, id, updateData) => {
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

const deleteBusinessById = async (id) => {
    const result = await prisma.business.delete({
        where: { id },
        select: { id: true }
    });
    return result;
};

const deleteProductById = async (business_id, id) => {
    const result = await prisma.product.delete({
        where: {
            id,
            business: { id: business_id }
        },
        select: { id: true }
    });
    return result;
};

const deleteVoucherById = async (business_id, id) => {
    const result = await prisma.voucher.delete({
        where: {
            id,
            business: { id: business_id }
        },
        select: { id: true }
    });
    return result;
};

const deletePostById = async (business_id, id) => {
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
