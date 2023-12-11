import prisma from '../config/prisma.js';

const countPosts = async (req, res) => {
    try {
        const count = await prisma.post.count();
        return res.status(200).json({ message: 'Success', data: count });
    } catch (error) {
        return res.status(500).json({ message: 'Error', error });
    }
};

const getAllPosts = async (req, res) => {
    const { page = 1, perPage = 10 } = req.query;
    const skip = (page - 1) * perPage;
    const take = perPage;
    try {
        const posts = await prisma.post.findMany({
            skip,
            take
        });
        return res.status(200).json({ message: 'Success', page, perPage, data: posts });
    } catch (error) {
        return res.status(500).json({ message: 'Error', error });
    }
};

const createPost = async (req, res) => {
    try {
        const { business_id, vouchers, ...postData } = req.body.data;
        const post = await prisma.post.create({
            data: {
                ...postData,
                business: {
                    connect: {
                        id: business_id
                    }
                },
                vouchers: {
                    create: vouchers?.map((voucherId, index) => ({
                        voucher: {
                            connect: {
                                id: voucherId
                            }
                        },
                        index
                    }))
                }
            }
        });
        return res.status(201).json({ message: 'Success', data: post });
    } catch (error) {
        return res.status(500).json({ message: 'Error', error });
    }
};

const getPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await prisma.post.findUnique({
            where: { id }
        });
        if (!post) {
            return res.status(404).json({ message: 'Not found', error: 'Not found' });
        }
        return res.status(200).json({ message: 'Success', data: post });
    } catch (error) {
        return res.status(500).json({ message: 'Error', error });
    }
};

const updatePostById = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await prisma.post.update({
            where: { id },
            data: req.body.data
        });
        return res.status(200).json({ message: 'Success', data: post });
    } catch (error) {
        return res.status(500).json({ message: 'Error', error });
    }
};

const deletePostById = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await prisma.post.delete({
            where: { id }
        });
        return res.status(200).json({ message: 'Success', data: post });
    } catch (error) {
        return res.status(500).json({ message: 'Error', error });
    }
};

export default {
    countPosts,
    getAllPosts,
    createPost,
    getPostById,
    updatePostById,
    deletePostById
};
