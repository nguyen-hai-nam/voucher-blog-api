import prisma from "../../../../config/prisma.js";

const getCategories = async (req, res, next) => {
    try {
        const result = await prisma.category.findMany({
            orderBy: {
                name: 'asc'
            }
        });
        res.json(result);
    } catch (e) {
        next(e);
    }
}

export default {
    getCategories,
}