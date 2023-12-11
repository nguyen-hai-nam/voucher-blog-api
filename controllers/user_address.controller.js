import prisma from '../config/prisma.js';

const getAllUserAddresses = async (req, res) => {
    if (!req.body.payload) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const userAddresses = await prisma.userAddress.findMany({
            where: { user_id: req.body.payload.id }
        });
        return res.status(200).json({ message: 'Success', data: [...userAddresses] });
    } catch (error) {
        return res.status(500).json({ message: 'Error', error });
    }
};

const createUserAddress = async (req, res) => {
    if (!req.body.payload) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const { name, lat, lng, type } = req.body.data;
        const newUserAddress = await prisma.userAddress.create({
            data: {
                user_id: req.body.payload.id,
                name: name,
                type: type,
                lat: lat,
                lng: lng
            }
        });
        return res.status(200).json({ message: 'Success', data: { newUserAddress } });
    } catch (error) {
        return res.status(500).json({ message: 'Error', error });
    }
};

const updateUserAddressById = async (req, res) => {
    if (!req.body.payload) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const { name, lat, lng, type } = req.body.data;
    const { id } = req.params;
    try {
        const existingUserAddress = await prisma.userAddress.findUnique({
            where: { id }
        });
        if (!existingUserAddress) {
            return res.status(404).json({ message: 'Not found' });
        }
        if (existingUserAddress.user_id !== req.body.payload.id) {
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
        return res.status(500).json({ message: 'Error', error });
    }
};

const deleteUserAddressById = async (req, res) => {
    if (!req.body.payload) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const { id } = req.params;
        const newUserAddress = await prisma.userAddress.delete({
            where: { id }
        });
        return res.status(200).json({ message: 'Success', data: { newUserAddress } });
    } catch (error) {
        return res.status(500).json({ message: 'Error', error });
    }
};

export default {
    getAllUserAddresses,
    createUserAddress,
    updateUserAddressById,
    deleteUserAddressById
};
