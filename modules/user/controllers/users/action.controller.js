import createHttpError from 'http-errors';

import prisma from '../../../../config/prisma.js';
import { rawQueryParser } from '../../../../helpers/http.helper.js';
import schemas from './schemas.js';

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
        const result = await prisma.collectedReward.create({
            data: {
                user_id: id,
                reward_id: rewardId,
            },
            select: parsedQuery.select || undefined,
        });
        console.log("here", result);
        const { value, error } = schemas.collectRewardResponse.validate(result);
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
    collectReward,
    redeemReward,
};