import prisma from "../../../../config/prisma.js";

const tickCustomer = async (req, res, next) => {
    try {
        const { id: businessId, user_id: representorId } = req.business;
        const { userId } = req.params;
        const queryBatch = [];
        const isCustomer = await prisma.customerInfo.findUnique({
            where: {
                business_id_user_id: {
                    business_id: businessId,
                    user_id: userId,
                },
            },
        });
        if (!isCustomer) {
            queryBatch.push(prisma.customerInfo.create({
                data: {
                    business: {
                        connect: {
                            id: businessId,
                        },
                    },
                    customer: {
                        connect: {
                            id: userId,
                        },
                    },
                },
            }));
        }
        queryBatch.push(prisma.businessTickUser.create({
            data: {
                business: {
                    connect: {
                        id: businessId,
                    },
                },
                target: {
                    connect: {
                        id: userId
                    },
                },
                representor: {
                    connect: {
                        id: representorId,
                    },
                },
            },
        }));
        queryBatch.push(prisma.customerInfo.update({
            where: {
                business_id_user_id: {
                    business_id: businessId,
                    user_id: userId,
                },
            },
            data: {
                ticks_total: {
                    increment: 1,
                },
                ticks_left: {
                    increment: 1,
                }
            },
        }));
        await prisma.$transaction(queryBatch);
        res.json({ success: true });
    } catch (e) {
        console.log(e);
        next(e);
    }
}

export default {
    tickCustomer,
};