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

const countCampaigns = async (business_id, query) => {
    const count = await prisma.campaign.count({
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
    const categories = await prisma.category.findMany();
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

const getAllCampaigns = async (business_id, skip, take, query) => {
    const businesses = await prisma.campaign.findMany({
        where: { ...query, business: { id: business_id } },
        skip,
        take
    });
    return businesses;
};

const createBusiness = async (userId, data) => {
    const { licenseImages, frontImages, insideImages, menuImages, ...rest } = data;
    const business = await prisma.business.create({
        data: {
            ...rest,
            managers: {
                create: {
                    user: { connect: { id: userId } }
                }
            }
        }
    });

    const images = [];
    images.push(
        licenseImages?.map((imageUrl) => ({
            type: 'LICENSE',
            url: imageUrl,
            business_id: business.id
        }))
    );
    images.push(
        frontImages?.map((imageUrl) => ({
            type: 'FRONT',
            url: imageUrl,
            business_id: business.id
        }))
    );
    images.push(
        insideImages?.map((imageUrl) => ({
            type: 'INSIDE',
            url: imageUrl,
            business_id: business.id
        }))
    );
    images.push(
        menuImages?.map((imageUrl) => ({
            type: 'MENU',
            url: imageUrl,
            business_id: business.id
        }))
    );
    const processedImages = images.flat().filter((image) => image);
    await prisma.businessImage.createMany({
        data: processedImages
    });

    return business;
};

const createProduct = async (businessId, categoryId, data) => {
    const { productImages, ...rest } = data;
    const result = await prisma.product.create({
        data: {
            ...rest,
            business: {
                connect: { id: businessId }
            },
            category: {
                connect: { id: categoryId }
            }
        }
    });
    const images = [];
    images.push(
        productImages?.map((imageUrl) => ({
            product_id: result.id,
            url: imageUrl
        }))
    );
    const processedImages = images.flat().filter((image) => image);
    await prisma.productImage.createMany({
        data: processedImages
    });
    return result;
};

const createCampaign = async (business_id, data) => {
    const { vouchers, ...rest } = data;
    const products = [];
    for (const voucher of vouchers) {
        products[voucher.index] = voucher.products;
    }
    const result = await prisma.campaign.create({
        data: {
            ...rest,
            business: {
                connect: { id: business_id }
            },
            vouchers: {
                createMany: {
                    data: vouchers.map((voucher) => {
                        // eslint-disable-next-line no-unused-vars
                        const { products, ...rest } = voucher;
                        return { ...rest };
                    })
                }
            }
        },
        include: {
            vouchers: true
        }
    });
    for (const voucher of result.vouchers) {
        if (!products[voucher.index]) continue;
        await prisma.voucherApplyProduct.createMany({
            data: products[voucher.index].map((productId) => ({ voucher_id: voucher.id, product_id: productId }))
        });
    }
    return result;
};

const getBusinessById = async (id) => {
    const business = await prisma.business.findUniqueOrThrow({
        where: { id }
    });
    return business;
};

const getProductById = async (business_id, id) => {
    const business = await prisma.product.findUniqueOrThrow({
        where: { id, business: { id: business_id } },
        include: {
            images: true
        }
    });
    return business;
};

const getCampaignById = async (business_id, id) => {
    const business = await prisma.campaign.findUniqueOrThrow({
        where: { id, business: { id: business_id } },
        include: { vouchers: true }
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

const updateCampaignById = async (business_id, id, updateData) => {
    const result = await prisma.campaign.update({
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

const deleteCampaignById = async (business_id, id) => {
    const result = await prisma.campaign.delete({
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
    countCampaigns,
    getCategories,
    getAllBusinesses,
    getAllProducts,
    getAllCampaigns,
    createBusiness,
    createProduct,
    createCampaign,
    getBusinessById,
    getProductById,
    getCampaignById,
    updateBusinessById,
    updateProductById,
    updateCampaignById,
    deleteBusinessById,
    deleteProductById,
    deleteCampaignById
};
