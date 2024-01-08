import userService from '../services/user.service.js';
import { parseQuery } from '../helpers/http.helper.js';

const countUsers = async (req, res, next) => {
    const query = parseQuery(req.query);
    try {
        const result = await userService.countUsers(query);
        return res.status(200).json({ success: true, data: result });
    } catch (error) {
        next(error);
    }
};

const getAllUsers = async (req, res, next) => {
    const query = parseQuery(req.query);
    try {
        const users = await userService.getAllUsers(query);
        return res.status(200).json({ success: true, data: users });
    } catch (error) {
        next(error);
    }
};

const getUserById = async (req, res, next) => {
    const { id } = req.params;
    if (id !== req.user.id && !req.user.is_admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const query = parseQuery(req.query);
    try {
        const user = await userService.getUserById(id, query);
        return res.status(200).json({ success: true, data: user });
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
        return res.status(200).json({ success: true, data: result });
    } catch (error) {
        next(error);
    }
};

const deleteUserById = async (req, res, next) => {
    const { id } = req.params;
    if (id !== req.user.id && !req.user.is_admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const result = await userService.deleteUserById(id);
        return res.status(200).json({ success: true, data: result });
    } catch (error) {
        next(error);
    }
};

const collectVoucher = async (req, res, next) => {
    const userId = req.user.id;
    const { voucherId } = req.params;
    try {
        await userService.collectVoucher(userId, voucherId);
        return res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
};

const discardVoucher = async (req, res, next) => {
    const userId = req.user.id;
    const { voucherId } = req.params;
    try {
        await userService.discardVoucher(userId, voucherId);
        return res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
};

const loveCampagin = async (req, res, next) => {
    const userId = req.user.id;
    const { campaignId } = req.params;
    try {
        await userService.loveCampagin(userId, campaignId);
        return res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
};

const unloveCampaign = async (req, res, next) => {
    const userId = req.user.id;
    const { campaignId } = req.params;
    try {
        await userService.unloveCampaign(userId, campaignId);
        return res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
};

const saveCampaign = async (req, res, next) => {
    const userId = req.user.id;
    const { campaignId } = req.params;
    try {
        await userService.saveCampaign(userId, campaignId);
        return res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
};

const unsaveCampaign = async (req, res, next) => {
    const userId = req.user.id;
    const { campaignId } = req.params;
    try {
        await userService.unsaveCampaign(userId, campaignId);
        return res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
};

const getDistance = async (req, res, next) => {
    const { userAddressId, businessId } = req.params;
    try {
        const distance = await userService.getDistance(userAddressId, businessId);
        return res.status(200).json({ success: true, data: distance });
    } catch (error) {
        next(error);
    }
};

const followBusiness = async (req, res, next) => {
    const userId = req.user.id;
    const { businessId } = req.params;
    try {
        await userService.followBusiness(userId, businessId);
        return res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
};

const unfollowBusiness = async (req, res, next) => {
    const userId = req.user.id;
    const { businessId } = req.params;
    try {
        await userService.unfollowBusiness(userId, businessId);
        return res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
};

export default {
    countUsers,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
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
