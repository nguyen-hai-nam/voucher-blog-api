import createHttpError from 'http-errors';

import prisma from '../../../../config/prisma.js';
import { rawQueryParser } from '../../../../helpers/http.helper.js';
import schemas from './schemas.js';

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
        const result = await prisma.user.findUnique({
            where: {
                id
            },
            select: {
                receivedTicks: {
                    where: {
                        created_at: {
                            gte: parsedQuery.fromDate,
                            lte: parsedQuery.toDate,
                        }
                    },
                    select: {
                        business_id: true,
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
            throw createHttpError(500);
        }
        res.json(value);
    } catch (e) {
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
        const { value: rawQuery, error: rawQueryError } = schemas.collectRewardQueryRaw.validate(req.query);
        if (rawQueryError) {
            throw createHttpError(400);
        }
        const { value: parsedQuery, error: parsedQueryError } = schemas.collectRewardQueryParsed.validate(rawQueryParser(rawQuery));
        if (parsedQueryError) {
            throw createHttpError(400);
        }
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
            select: parsedQuery.select || undefined,
        }));
        const result = await prisma.$transaction(queryBatch);
        const { value, error } = schemas.collectRewardResponse.validate(result[1]);
        if (error) {
            throw createHttpError(500);
        }
        res.json(value);
    } catch (e) {
        console.log(e)
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


export default {
    getTickHistory,
    getCustomerInfos,
    collectReward,
    redeemReward,
};