import _ from "lodash";
import Joi from "joi";
import createHttpError from "http-errors";

import prisma from "../../../../config/prisma.js";
import { rawQueryParser } from "../../../../helpers/http.helper.js";

const _getCurrentUserQueryRaw = Joi.object({
    select: Joi.string().optional(),
}).unknown(false).required();

const _getCurrentUserQueryParsed = Joi.object({
    select: Joi.object({
        id: Joi.boolean().optional(),
        email: Joi.boolean().optional(),
        phone_number: Joi.boolean().optional(),
        name: Joi.boolean().optional(),
        gender: Joi.boolean().optional(),
        birthday: Joi.boolean().optional(),
        avatar_image_url: Joi.boolean().optional(),
        status: Joi.boolean().optional(),
    }).unknown(false).optional(),
}).unknown(false).required();

const _getCurrentUserResponse = Joi.object({
    id: Joi.string().optional(),
    email: Joi.string().allow(null).optional(),
    phone_number: Joi.string().allow(null).optional(),
    name: Joi.string().allow(null).optional(),
    gender: Joi.string().allow(null).optional(),
    birthday: Joi.date().allow(null).optional(),
    avatar_image_url: Joi.string().allow(null).optional(),
    status: Joi.string().optional(),
}).unknown(false).required();

const getCurrentUser = async (req, res, next) => {
    try {
        const { value: rawQuery, error: rawQueryError } = _getCurrentUserQueryRaw.validate(req.query);
        if (rawQueryError) {
            throw createHttpError(400);
        }
        const { value: parsedQuery, error: parsedQueryError } = _getCurrentUserQueryParsed.validate(rawQueryParser(rawQuery));
        if (parsedQueryError) {
            throw createHttpError(400);
        }
        const { id } = req.user;
        const result = await prisma.user.findUnique({
            where: { id },
            ...parsedQuery
        });
        const { value, error } = _getCurrentUserResponse.validate(result);
        if (error) {
            throw createHttpError(500);
        }
        res.json(value);
    } catch (e) {
        next(e);
    }
}

const getManagingBusinesses = async (req, res, next) => {
    try {
        const { id } = req.user;
        const result = await prisma.business.findMany({
            where: {
                managers: {
                    some: {
                        user_id: id
                    }
                }
            }
        });
        res.json(result);
    } catch (e) {
        next(e);
    }
}

const getFollowingBusinesses = async (req, res, next) => {
    try {
        const { id } = req.user;
        const result = await prisma.business.findMany({
            where: {
                followers: {
                    some: {
                        user_id: id
                    }
                }
            }
        });
        res.json(result);
    } catch (e) {
        next(e);
    }
}

const _updateCurrentUserQueryRaw = Joi.object({
    select: Joi.string().optional(),
}).unknown(false).required();

const _updateCurrentUserQueryParsed = Joi.object({
    select: Joi.object({
        id: Joi.boolean().optional(),
        email: Joi.boolean().optional(),
        phone_number: Joi.boolean().optional(),
        name: Joi.boolean().optional(),
        gender: Joi.boolean().optional(),
        birthday: Joi.boolean().optional(),
        avatar_image_url: Joi.boolean().optional(),
        status: Joi.boolean().optional(),
    }).unknown(false).optional(),
}).unknown(false).required();

const _updateCurrentUserBody = Joi.object({
    name: Joi.string().optional(),
    gender: Joi.string().valid("MALE", "FEMALE", "OTHER").optional(),
    birthday: Joi.string().isoDate().optional(),
    avatar_image_url: Joi.string().optional(),
}).unknown(false).required();

const _updateCurrentUserResponse = Joi.object({
    id: Joi.string().optional(),
    email: Joi.string().allow(null).optional(),
    phone_number: Joi.string().allow(null).optional(),
    name: Joi.string().allow(null).optional(),
    gender: Joi.string().allow(null).optional(),
    birthday: Joi.date().allow(null).optional(),
    avatar_image_url: Joi.string().allow(null).optional(),
    status: Joi.string().optional(),
}).unknown(false).required();

const updateCurrentUser = async (req, res, next) => {
    try {
        const { value: rawQuery, error: rawQueryError } = _updateCurrentUserQueryRaw.validate(req.query);
        if (rawQueryError) {
            throw createHttpError(400);
        }
        const { value: parsedQuery, error: parsedQueryError } = _updateCurrentUserQueryParsed.validate(rawQueryParser(rawQuery));
        if (parsedQueryError) {
            console.log(parsedQueryError);
            throw createHttpError(400);
        }
        const { value: body, error: bodyError } = _updateCurrentUserBody.validate(req.body);
        if (bodyError) {
            throw createHttpError(400);
        }
        const { id } = req.user;
        const result = await prisma.user.update({
            where: { id },
            data: body,
            select: parsedQuery.select ? parsedQuery.select : { id: true }
        })
        const { value, error } = _updateCurrentUserResponse.validate(result);
        if (error) {
            throw createHttpError(500);
        }
        
        res.json(value);
    } catch (e) {
        next(e);
    }
}

export default {
    getCurrentUser,
    getManagingBusinesses,
    getFollowingBusinesses,
    updateCurrentUser
};