import userService from '../services/user.service.js';
import { parseQuery } from '../helpers/http.helper.js';

const countUsers = async (req, res, next) => {
    if (!req.user || !req.user.is_admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const result = await userService.countUsers();
        return res.status(200).json({ message: 'Success', data: { count: result } });
    } catch (error) {
        next(error);
    }
};

const getAllUsers = async (req, res, next) => {
    const { page = 1, perPage = 10 } = req.query;
    const skip = (page - 1) * perPage;
    const take = perPage;
    try {
        const users = await userService.getAllUsers(skip, take);
        return res.status(200).json({ message: 'Success', page, perPage, data: users });
    } catch (error) {
        next(error);
    }
};

const getUserById = async (req, res, next) => {
    const { id } = req.params;
    const query = parseQuery(req.query);
    if (id !== req.user.id && !req.user.is_admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const user = await userService.getUserById(id, query);
        return res.status(200).json({ message: 'Success', data: user });
    } catch (error) {
        next(error);
    }
};

const updateUserById = async (req, res, next) => {
    const { id } = req.params;
    const updateData = req.body;
    if (!updateData) {
        return res.status(400).json({ message: 'Bad request' });
    } else if (id !== req.user.id && !req.user.is_admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const result = await userService.updateUserById(id, updateData);
        return res.status(200).json({ message: 'Success', data: result });
    } catch (error) {
        next(error);
    }
};

const deleteUserById = async (req, res, next) => {
    const { id } = req.params;
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const result = await userService.deleteUserById(id);
        return res.status(200).json({ message: 'Success', data: result });
    } catch (error) {
        next(error);
    }
};

const getAddresses = async (req, res, next) => {
    try {
        const addresses = await userService.getAddresses(req.params.id);
        return res.status(200).json({ message: 'Success', data: addresses });
    } catch (error) {
        next(error);
    }
};

const getManagingBusinesses = async (req, res, next) => {
    try {
        const managingBusinesses = await userService.getManagingBusinesses(req.params.id);
        return res.status(200).json({ message: 'Success', data: managingBusinesses });
    } catch (error) {
        next(error);
    }
};

const getFollowingBusinesses = async (req, res, next) => {
    try {
        const followingBusinesses = await userService.getFollowingBusinesses(req.params.id);
        return res.status(200).json({ message: 'Success', data: followingBusinesses });
    } catch (error) {
        next(error);
    }
};

const getVouchers = async (req, res, next) => {
    try {
        switch (req.query.type) {
            case 'collected': {
                const collectedVouchers = await userService.getCollectedVouchers(req.params.id);
                return res.status(200).json({ message: 'Success', data: collectedVouchers });
            }
            case 'used': {
                const usedVouchers = await userService.getUsedVouchers(req.params.id);
                return res.status(200).json({ message: 'Success', data: usedVouchers });
            }
            default:
                return res.status(400).json({ message: 'Invalid type' });
        }
    } catch (error) {
        next(error);
    }
};

const collectVoucher = async (req, res, next) => {
    const { id, voucherId } = req.params;
    try {
        await userService.collectVoucher(id, voucherId);
        return res.status(200).json({ message: 'Success' });
    } catch (error) {
        next(error);
    }
};

const discardVoucher = async (req, res, next) => {
    const { id, voucherId } = req.params;
    try {
        await userService.discardVoucher(id, voucherId);
        return res.status(200).json({ message: 'Success' });
    } catch (error) {
        next(error);
    }
};

const loveCampagin = async (req, res, next) => {
    const { id, campaignId } = req.params;
    try {
        await userService.loveCampagin(id, campaignId);
        return res.status(200).json({ message: 'Success' });
    } catch (error) {
        next(error);
    }
};

const unloveCampaign = async (req, res, next) => {
    const { id, campaignId } = req.params;
    try {
        await userService.unloveCampaign(id, campaignId);
        return res.status(200).json({ message: 'Success' });
    } catch (error) {
        next(error);
    }
};

const saveCampaign = async (req, res, next) => {
    const { id, campaignId } = req.params;
    try {
        await userService.saveCampaign(id, campaignId);
        return res.status(200).json({ message: 'Success' });
    } catch (error) {
        next(error);
    }
};

const unsaveCampaign = async (req, res, next) => {
    const { id, campaignId } = req.params;
    try {
        await userService.unsaveCampaign(id, campaignId);
        return res.status(200).json({ message: 'Success' });
    } catch (error) {
        next(error);
    }
};

const getDistance = async (req, res, next) => {
    const { userAddressId, businessId } = req.params;
    try {
        const distance = await userService.getDistance(userAddressId, businessId);
        return res.status(200).json({ message: 'Success', data: distance });
    } catch (error) {
        next(error);
    }
};

const followBusiness = async (req, res, next) => {
    const userId = req.user.id;
    const { businessId } = req.params;
    try {
        await userService.followBusiness(userId, businessId);
        return res.status(200).json({ message: 'Success' });
    } catch (error) {
        next(error);
    }
};

const unfollowBusiness = async (req, res, next) => {
    const userId = req.user.id;
    const { businessId } = req.params;
    try {
        await userService.unfollowBusiness(userId, businessId);
        return res.status(200).json({ message: 'Success' });
    } catch (error) {
        next(error);
    }
};

export default {
    countUsers,
    getAllUsers,
    getUserById,
    getAddresses,
    getManagingBusinesses,
    getFollowingBusinesses,
    updateUserById,
    deleteUserById,
    getVouchers,
    collectVoucher,
    discardVoucher,
    loveCampagin,
    unloveCampaign,
    saveCampaign,
    unsaveCampaign,
    getDistance,
    followBusiness,
    unfollowBusiness
};
