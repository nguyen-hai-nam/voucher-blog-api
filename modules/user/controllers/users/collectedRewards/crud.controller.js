
import createHttpError from "http-errors";

import prisma from "../../../../../config/prisma.js";
import { rawQueryParser } from "../../../../../helpers/http.helper.js";
import schemas from "./schemas.js";

const getCollectedRewards = async (req, res, next) => {
    try {
        const { value: rawQuery, error: rawQueryError } = schemas.getCollectedRewardsQueryRaw.validate(req.query);
        if (rawQueryError) {
            throw createHttpError(400);
        }
        const { value: parsedQuery, error: parsedQueryError } = schemas.getCollectedRewardsQueryParsed.validate(rawQueryParser(rawQuery));
        if (parsedQueryError) {
            throw createHttpError(400);
        }
        const { id } = req.user;
        const result = await prisma.collectedReward.findMany({
            where: {
                user_id: id,
                ...parsedQuery.where
            },
            select: parsedQuery.select || undefined,
        });
        const { value, error } = schemas.getCollectedRewardsResponse.validate(result);
        if (error) {
            throw createHttpError(500);
        }
        res.json(value);
    } catch (e) {
        next(e);
    }
}

const getCollectedReward = async (req, res, next) => {
    try {
        const { value: rawQuery, error: rawQueryError } = schemas.getCollectedRewardQueryRaw.validate(req.query);
        if (rawQueryError) {
            throw createHttpError(400);
        }
        const { value: parsedQuery, error: parsedQueryError } = schemas.getCollectedRewardQueryParsed.validate(rawQueryParser(rawQuery));
        if (parsedQueryError) {
            throw createHttpError(400);
        }
        const { id } = req.user;
        const { collectedRewardId } = req.params;
        const isOwner = await prisma.collectedReward.findFirst({
            where: {
                id: collectedRewardId,
                user_id: id
            }
        });
        if (!isOwner) {
            throw createHttpError(401);
        }
        const result = await prisma.collectedReward.findFirst({
            where: {
                user_id: id,
            },
            select: parsedQuery.select || undefined,
        });
        const { value, error } = schemas.getCollectedRewardResponse.validate(result);
        if (error) {
            throw createHttpError(500);
        }
        res.json(value);
    } catch (e) {
        next(e);
    }
}

const deleteCollectedReward = async (req, res, next) => {
    try {
        const { value: rawQuery, error: rawQueryError } = schemas.deleteCollectedRewardQueryRaw.validate(req.query);
        if (rawQueryError) {
            throw createHttpError(400);
        }
        const { value: parsedQuery, error: parsedQueryError } = schemas.deleteCollectedRewardQueryParsed.validate(rawQueryParser(rawQuery));
        if (parsedQueryError) {
            throw createHttpError(400);
        }
        const { id } = req.user;
        const { collectedRewardId } = req.params;
        const isOwner = await prisma.collectedReward.findFirst({
            where: {
                id: collectedRewardId,
                user_id: id
            }
        });
        if (!isOwner) {
            throw createHttpError(401);
        }
        const result = await prisma.collectedReward.delete({
            where: {
                user_id: id,
            },
            select: parsedQuery.select || { id: true },
        });
        const { value, error } = schemas.deleteCollectedRewardResponse.validate(result);
        if (error) {
            throw createHttpError(500);
        }
        res.json(value);
    } catch (e) {
        next(e);
    }
}

export default {
    getCollectedRewards,
    getCollectedReward,
    deleteCollectedReward
};