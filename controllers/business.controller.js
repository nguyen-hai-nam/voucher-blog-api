import prisma from '../config/prisma.js';
import businessService from '../services/business.service.js';

const countBusinesses = async (req, res, next) => {
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

const countProducts = async (req, res, next) => {
    try {
        const result = await businessService.countProducts(req.params.business_id);
        return res.status(200).json({ message: 'Success', data: { count: result } });
    } catch (error) {
        next(error);
    }
};

const countVouchers = async (req, res, next) => {
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

const countCampaigns = async (req, res, next) => {
    if (!req.body.payload) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const result = await businessService.countCampaigns(req.params.business_id);
        return res.status(200).json({ message: 'Success', data: { count: result } });
    } catch (error) {
        next(error);
    }
};

const getCategories = async (req, res, next) => {
    try {
        const categories = await businessService.getCategories();
        return res.status(200).json({ message: 'Success', data: categories });
    } catch (error) {
        next(error);
    }
};

const getAllBusinesses = async (req, res) => {
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

const getAllProducts = async (req, res, next) => {
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

const getAllVouchers = async (req, res, next) => {
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

const getAllCampaigns = async (req, res, next) => {
    if (!req.body.payload) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const { page = '1', perPage = '100' } = req.query;
    const skip = (parseInt(page, 10) - 1) * parseInt(perPage, 10);
    const take = parseInt(perPage, 10);
    try {
        const products = await businessService.getAllCampaigns(req.params.business_id, skip, take);
        return res.status(200).json({ message: 'Success', page, perPage, data: products });
    } catch (error) {
        next(error);
    }
};

const createBusiness = async (req, res, next) => {
    const userId = req.user.id;
    try {
        const data = JSON.parse(req.body.data);
        const files = req.files;
        const serverUrl = `${req.protocol}://${req.get('host')}`;
        for (const key in files) {
            if (key === 'avatarImage') {
                data.avatar_image_url = `${serverUrl}/${files[key][0].path}`;
            } else {
                data[key] = files[key].map((file) => `${serverUrl}/${file.path}`);
            }
        }
        const business = await businessService.createBusiness(userId, data);
        return res.status(201).json({ message: 'Success', data: business });
    } catch (error) {
        next(error);
    }
};

const createProduct = async (req, res, next) => {
    try {
        const data = JSON.parse(req.body.data);
        const { category_id, ...rest } = data;
        const files = req.files;
        const serverUrl = `${req.protocol}://${req.get('host')}`;
        for (const key in files) {
            rest[key] = files[key].map((file) => `${serverUrl}/${file.path}`);
        }
        const result = await businessService.createProduct(req.params.business_id, category_id, rest);
        return res.status(201).json({ message: 'Success', data: result });
    } catch (error) {
        next(error);
    }
};

const createVoucher = async (req, res, next) => {
    try {
        const result = await businessService.createVoucher(req.params.business_id, req.body.data);
        return res.status(201).json({ message: 'Success', data: result });
    } catch (error) {
        next(error);
    }
};

const createCampaign = async (req, res, next) => {
    try {
        const result = await businessService.createCampaign(req.params.business_id, req.body.data);
        return res.status(201).json({ message: 'Success', data: result });
    } catch (error) {
        next(error);
    }
};

const getBusinessById = async (req, res, next) => {
    if (!req.body.payload) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const { id } = req.params;
    try {
        const business = await businessService.getBusinessById(id);
        return res.status(200).json({ message: 'Success', data: business });
    } catch (error) {
        next(error);
    }
};

const getProductById = async (req, res, next) => {
    const { business_id, id } = req.params;
    try {
        const result = await businessService.getProductById(business_id, id);
        return res.status(200).json({ message: 'Success', data: result });
    } catch (error) {
        next(error);
    }
};

const getVoucherById = async (req, res, next) => {
    const { business_id, id } = req.params;
    try {
        const result = await businessService.getVoucherById(business_id, id);
        return res.status(200).json({ message: 'Success', data: result });
    } catch (error) {
        next(error);
    }
};

const getCampaignById = async (req, res, next) => {
    const { business_id, id } = req.params;
    try {
        const result = await businessService.getCampaignById(business_id, id);
        return res.status(200).json({ message: 'Success', data: result });
    } catch (error) {
        next(error);
    }
};

const updateBusinessById = async (req, res, next) => {
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

const updateProductById = async (req, res, next) => {
    const { business_id, id } = req.params;
    try {
        const result = await businessService.updateProductById(business_id, id, req.body.data);
        return res.status(200).json({ message: 'Success', data: result });
    } catch (error) {
        next(error);
    }
};

const updateVoucherById = async (req, res, next) => {
    const { business_id, id } = req.params;
    try {
        const result = await businessService.updateVoucherById(business_id, id, req.body.data);
        return res.status(200).json({ message: 'Success', data: result });
    } catch (error) {
        next(error);
    }
};

const updateCampaignById = async (req, res, next) => {
    const { business_id, id } = req.params;
    try {
        const result = await businessService.updateCampaignById(business_id, id, req.body.data);
        return res.status(200).json({ message: 'Success', data: result });
    } catch (error) {
        next(error);
    }
};

const deleteBusinessById = async (req, res, next) => {
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

const deleteProductById = async (req, res, next) => {
    const { business_id, id } = req.params;
    try {
        const result = await businessService.deleteProductById(business_id, id);
        return res.status(200).json({ message: 'Success', data: result });
    } catch (error) {
        next(error);
    }
};

const deleteVoucherById = async (req, res, next) => {
    const { business_id, id } = req.params;
    try {
        const result = await businessService.deleteVoucherById(business_id, id);
        return res.status(200).json({ message: 'Success', data: result });
    } catch (error) {
        next(error);
    }
};

const deleteCampaignById = async (req, res, next) => {
    const { business_id, id } = req.params;
    try {
        const result = await businessService.deleteCampaignById(business_id, id);
        return res.status(200).json({ message: 'Success', data: result });
    } catch (error) {
        next(error);
    }
};

const followBusinessById = async (req, res) => {
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

const unfollowBusinessById = async (req, res) => {
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
    countCampaigns,
    getCategories,
    getAllBusinesses,
    getAllProducts,
    getAllVouchers,
    getAllCampaigns,
    createBusiness,
    createProduct,
    createVoucher,
    createCampaign,
    getBusinessById,
    getProductById,
    getVoucherById,
    getCampaignById,
    updateBusinessById,
    updateProductById,
    updateVoucherById,
    updateCampaignById,
    deleteBusinessById,
    deleteProductById,
    deleteVoucherById,
    deleteCampaignById,
    followBusinessById,
    unfollowBusinessById
};
