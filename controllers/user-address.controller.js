import prisma from '../config/prisma.js';

const getAllUserAddresses = async (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const userAddresses = await prisma.userAddress.findMany({
            where: { user_id: req.user.id }
        });
        return res.status(200).json({ message: 'Success', data: [...userAddresses] });
    } catch (error) {
        next(error);
    }
};

const createUserAddress = async (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const { name, lat, lng, type } = req.body;
        const newUserAddress = await prisma.userAddress.create({
            data: {
                user_id: req.user.id,
                name: name,
                type: type,
                lat: lat,
                lng: lng
            }
        });
        return res.status(200).json({ message: 'Success', data: newUserAddress });
    } catch (error) {
        next(error);
    }
};

const updateUserAddressById = async (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const { name, lat, lng, type } = req.body;
    const { id } = req.params;
    try {
        const existingUserAddress = await prisma.userAddress.findUnique({
            where: { id }
        });
        if (!existingUserAddress) {
            return res.status(404).json({ message: 'Not found' });
        }
        if (existingUserAddress.user_id !== req.user.id) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        const newUserAddress = await prisma.userAddress.update({
            where: { id },
            data: {
                name: name,
                type: type,
                lat: lat,
                lng: lng
            }
        });
        return res.status(200).json({ message: 'Success', data: { newUserAddress } });
    } catch (error) {
        next(error);
    }
};

const deleteUserAddressById = async (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const { id } = req.params;
        const newUserAddress = await prisma.userAddress.delete({
            where: { id }
        });
        return res.status(200).json({ message: 'Success', data: { newUserAddress } });
    } catch (error) {
        next(error);
    }
};

export default {
    getAllUserAddresses,
    createUserAddress,
    updateUserAddressById,
    deleteUserAddressById
};
