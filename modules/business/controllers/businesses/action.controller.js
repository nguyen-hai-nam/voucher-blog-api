import prisma from "../../../../config/prisma.js";

const tickCustomer = async (req, res, next) => {
    
    try {
        const { business_id, user_id: representor_id } = req.business;
        const { userId } = req.params;
        await prisma.businessTickUser.create({
            data: {
                business: {
                    connect: {
                        id: business_id,
                    },
                },
                target: {
                    connect: {
                        id: userId,
                    }
                },
                representor: {
                    connect: {
                        id: representor_id,
                    },
                },
            },
        });
        res.json({ success: true });
    } catch (e) {
        next(e);
    }
}

export default {
    tickCustomer,
};