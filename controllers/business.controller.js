import prisma from '../config/prisma.js';
import businessService from '../services/business.service.js';
import { parseQuery } from '../helpers/http.helper.js';
import { staticPath } from '../constants/path.constant.js';

const countBusinesses = async (req, res, next) => {
    const query = parseQuery(req.query);
    try {
        const result = await businessService.countBusinesses(query);
        return res.status(200).json({ success: true, data: { count: result } });
    } catch (error) {
        next(error);
    }
};

const countProducts = async (req, res, next) => {
    try {
        const result = await businessService.countProducts(req.params.businessId);
        return res.status(200).json({ success: true, data: { count: result } });
    } catch (error) {
        next(error);
    }
};

const countCampaigns = async (req, res, next) => {
    try {
        const result = await businessService.countCampaigns(req.params.businessId);
        return res.status(200).json({ success: true, data: { count: result } });
    } catch (error) {
        next(error);
    }
};

const getCategories = async (req, res, next) => {
    try {
        const categories = await businessService.getCategories();
        return res.status(200).json({ success: true, data: categories });
    } catch (error) {
        next(error);
    }
};

const getAllBusinesses = async (req, res, next) => {
    const query = parseQuery(req.query);
    try {
        const businesses = await businessService.getAllBusinesses(query);
        return res.status(200).json({ success: true, data: businesses });
    } catch (error) {
        next(error);
    }
};

const getAllProducts = async (req, res, next) => {
    const { businessId } = req.params;
    const query = parseQuery(req.query);
    try {
        const products = await businessService.getAllProducts(businessId, query);
        return res.status(200).json({ success: true, data: products });
    } catch (error) {
        next(error);
    }
};

const getAllCampaigns = async (req, res, next) => {
    const { page = '1', perPage = '100' } = req.query;
    const skip = (parseInt(page, 10) - 1) * parseInt(perPage, 10);
    const take = parseInt(perPage, 10);
    try {
        const products = await businessService.getAllCampaigns(req.params.businessId, skip, take);
        return res.status(200).json({ success: true, page, perPage, data: products });
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
                data.avatar_image_url = `${serverUrl}/${staticPath}/${files[key][0].filename}`;
            } else {
                data[key] = files[key].map((file) => `${serverUrl}/${staticPath}/${file.filename}`);
            }
        }
        const business = await businessService.createBusiness(userId, data);
        return res.status(201).json({ success: true, data: business });
    } catch (error) {
        next(error);
    }
};

const createProduct = async (req, res, next) => {
    const { businessId } = req.params;
    const query = parseQuery(req.query);
    try {
        const data = JSON.parse(req.body.data);
        const files = req.files;
        const serverUrl = `${req.protocol}://${req.get('host')}`;
        for (const key in files) {
            data[key] = files[key].map((file) => `${serverUrl}/${staticPath}/${file.filename}`);
        }
        const result = await businessService.createProduct(businessId, data, query);
        return res.status(201).json({ success: true, data: result });
    } catch (error) {
        next(error);
    }
};

const createCampaign = async (req, res, next) => {
    const { businessId } = req.params;
    try {
        const data = JSON.parse(req.body.data);
        data.vouchers.sort((a, b) => a.index - b.index);
        const isAscendingFromZero = data.vouchers.every((voucher, i) => voucher.index === i);
        if (!isAscendingFromZero) {
            return res
                .status(400)
                .json({ message: 'Index properties of vouchers are not an ascending series starting from 0' });
        }
        const products = await prisma.product.findMany({
            where: { business_id: businessId },
            select: {
                id: true
            }
        });
        const availableProductIds = products.map((product) => product.id);
        for (const voucher of data.vouchers) {
            if (!voucher.products) continue;
            for (const productId of voucher.products) {
                if (!availableProductIds.includes(productId))
                    return res.status(400).json({ message: 'Invalid product id' });
            }
        }
        const files = req.files;
        const serverUrl = `${req.protocol}://${req.get('host')}`;
        for (const file of files) {
            const index = parseInt(file.fieldname.split('_')[1]);
            data.vouchers[index].media_url = `${serverUrl}/${staticPath}/${file.filename}`;
        }
        const result = await businessService.createCampaign(businessId, data);
        return res.status(201).json({ success: true, data: result });
    } catch (error) {
        next(error);
    }
};

const getBusinessById = async (req, res, next) => {
    const { id } = req.params;
    const query = parseQuery(req.query);
    try {
        const business = await businessService.getBusinessById(id, query);
        return res.status(200).json({ success: true, data: business });
    } catch (error) {
        next(error);
    }
};

const getProductById = async (req, res, next) => {
    const { businessId, id } = req.params;
    try {
        const result = await businessService.getProductById(businessId, id);
        return res.status(200).json({ success: true, data: result });
    } catch (error) {
        next(error);
    }
};

const getCampaignById = async (req, res, next) => {
    const { businessId, id } = req.params;
    try {
        const result = await businessService.getCampaignById(businessId, id);
        return res.status(200).json({ success: true, data: result });
    } catch (error) {
        next(error);
    }
};

const updateBusinessById = async (req, res, next) => {
    const userId = req.user.id;
    const { id } = req.params;
    const query = parseQuery(req.query);
    try {
        const business = await businessService.updateBusinessById(id, req.body, userId, query);
        return res.status(200).json({ success: true, data: business });
    } catch (error) {
        next(error);
    }
};

const updateProductById = async (req, res, next) => {
    const { businessId, id } = req.params;
    try {
        const result = await businessService.updateProductById(businessId, id, req.body.data);
        return res.status(200).json({ success: true, data: result });
    } catch (error) {
        next(error);
    }
};

const updateCampaignById = async (req, res, next) => {
    const { businessId, id } = req.params;
    try {
        const result = await businessService.updateCampaignById(businessId, id, req.body.data);
        return res.status(200).json({ success: true, data: result });
    } catch (error) {
        next(error);
    }
};

const deleteBusinessById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const business = await businessService.deleteBusinessById(id);
        return res.status(200).json({ success: true, data: business });
    } catch (error) {
        next(error);
    }
};

const deleteProductById = async (req, res, next) => {
    const { businessId, id } = req.params;
    try {
        const result = await businessService.deleteProductById(businessId, id);
        return res.status(200).json({ success: true, data: result });
    } catch (error) {
        next(error);
    }
};

const deleteCampaignById = async (req, res, next) => {
    const { businessId, id } = req.params;
    try {
        const result = await businessService.deleteCampaignById(businessId, id);
        return res.status(200).json({ success: true, data: result });
    } catch (error) {
        next(error);
    }
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
