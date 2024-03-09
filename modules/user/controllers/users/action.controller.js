import createHttpError from 'http-errors';

import prisma from '../../../../config/prisma.js';
import { rawQueryParser } from '../../../../helpers/http.helper.js';
import schemas from './schemas.js';
import { checkTimeCondition, checkMinBillValueCondition } from './helpers.js';

const getTickHistory = async (req, res, next) => {
    try {
        const { value: rawQuery, error: rawQueryError } = schemas.getTickHistoryQueryRaw.validate(req.query);
        if (rawQueryError) {
            throw createHttpError(400);
        }
        const { value: parsedQuery, error: parsedQueryError } = schemas.getTickHistoryQueryParsed.validate(rawQueryParser(rawQuery));
        if (parsedQueryError) {
            throw createHttpError(400);
        }
        const { id } = req.user;
        const { businessId } = req.params;
        const result = await prisma.user.findUnique({
            where: {
                id
            },
            select: {
                receivedTicks: {
                    where: {
                        business: {
                            id: businessId
                        },
                        created_at: {
                            gte: parsedQuery.fromDate,
                            lte: parsedQuery.toDate,
                        }
                    },
                    select: {
                        created_at: true,
                    }
                },
                collectedRewards: {
                    where: {
                        
                        created_at: {
                            gte: parsedQuery.fromDate,
                            lte: parsedQuery.toDate,
                        }
                    },
                    select: {
                        id: true,
                        reward: {
                            select: {
                                name: true,
                                tick_price: true,
                            }
                        },
                        created_at: true,
                    }
                }
            }
        });
        const { value, error } = schemas.getTickHistoryResponse.validate(result);
        if (error) {
            console.log(error)
            throw createHttpError(500);
        }
        res.json(value);
    } catch (e) {
        console.log(e)
        next(e);
    }
}

const getCustomerInfos = async (req, res, next) => {
   try {
        const { id } = req.user;
        const result = await prisma.customerInfo.findMany({
            where: {
                user_id: id
            },
            select: {
                business_id: true,
                ticks_total: true,
                ticks_left: true,
            }
        });
        res.json(result);
   } catch (e) {
        next(e);
   }
}

const collectReward = async (req, res, next) => {
    try {
        const { id } = req.user;
        const { rewardId } = req.params;
        const reward = await prisma.reward.findUnique({
            where: {
                id: rewardId
            }
        });
        const customerInfo = await prisma.customerInfo.findUnique({
            where: {
                business_id_user_id: {
                    business_id: reward.business_id,
                    user_id: id
                }
            }
        });
        if (!customerInfo || customerInfo.ticks_left < reward.tick_price || !reward) {
            throw createHttpError(400);
        }
        const queryBatch = [];
        queryBatch.push(prisma.customerInfo.update({
            where: {
                business_id_user_id: {
                    business_id: reward.business_id,
                    user_id: id
                }
            },
            data: {
                ticks_left: {
                    decrement: reward.tick_price
                }
            }
        }));
        queryBatch.push(prisma.collectedReward.create({
            data: {
                user_id: id,
                reward_id: rewardId,
            },
            include : {
                reward: true
            }
        }));
        const result = await prisma.$transaction(queryBatch);
        res.json(result[1]);
    } catch (e) {
        next(e);
    }
}

const redeemReward = async (req, res, next) => {
    try {
        const { value: rawQuery, error: rawQueryError } = schemas.redeemRewardQueryRaw.validate(req.query);
        if (rawQueryError) {
            throw createHttpError(400);
        }
        const { value: parsedQuery, error: parsedQueryError } = schemas.redeemRewardQueryParsed.validate(rawQueryParser(rawQuery));
        if (parsedQueryError) {
            throw createHttpError(400);
        }
        const { id } = req.user;
        const { collectedRewardId } = req.params;
        const currentReward = await prisma.collectedReward.findUnique({
            where: {
                id: collectedRewardId,
                user_id: id
            },
            select: {
                status: true
            }
        });
        if (currentReward && currentReward.status === "REDEEMED") {
            throw createHttpError(400, "Reward was already redeemed");
        }
        const result = await prisma.collectedReward.update({
            where: {
                id: collectedRewardId,
                user_id: id
            },
            data: {
                status: "REDEEMED"
            },
            select: parsedQuery.select || { id: true },
        });
        const { value, error } = schemas.redeemRewardResponse.validate(result);
        if (error) {
            throw createHttpError(500);
        }
        res.json(value);
    } catch (e) {
        next(e);
    }
}

const collectVoucher = async (req, res, next) => {
    try {
        const user = req.user;
        const { voucherId } = req.params;

        const voucher = await prisma.voucher.findUnique({
            where: {
                id: voucherId
            }
        });

        if (!user || !voucher) {
            throw createHttpError(400);
        }

        const checkVoucherCollected = await prisma.collectedVoucher.findMany({
            where: {
                user_id: user.id,
                voucher_id: voucher.id,
                status: "COLLECTED"
            }
        })

        if (checkVoucherCollected.length > 0) {
            return res.status(400).json({ message: "Voucher has already been collected." });
        }

        const collectedVoucher = await prisma.collectedVoucher.create({
            data: {
                user_id: user.id,
                voucher_id: voucherId,
            }
        });

        res.json(collectedVoucher);
    } catch (e) {
        next(e);
    }
}

const redeemVoucher = async (req, res, next) => {
    try {
        const { id: userId } = req.user;
        const { collectedVoucherId } = req.params;
        const collectedVoucher = await prisma.collectedVoucher.findUnique({
            where: {
                id: collectedVoucherId,
                user_id: userId,
                status: "COLLECTED"
            },
            select: {
                voucher: true
            }
        });

        if (!collectedVoucher) {
            throw createHttpError(400, "This voucher is unavailable");
        }

        const { voucher } = collectedVoucher;
        const useCount = await prisma.collectedVoucher.count({
            where: {
                voucher_id: voucher.id,
                status: "REDEEMED"
            }
        });

        if (useCount >= voucher.max_use_count) {
            throw createHttpError(400, "This voucher has been fully redeemed");
        }

        if(!checkTimeCondition(voucher) || !checkMinBillValueCondition(voucher, body.billValue)) {
            throw createHttpError(400, "Conditions are not met");
        }

        const result = await prisma.collectedVoucher.update({
            where: {
                id: collectedVoucherId
            },
            data: {
                status: "REDEEMED"
            }
        });

        res.json(result);
    } catch (e) {
        next(e);
    }
}

export default {
    getTickHistory,
    getCustomerInfos,
    collectReward,
    redeemReward,
    collectVoucher,
    redeemVoucher
};