import _ from "lodash";
import Joi from "joi";
import createHttpError from "http-errors";

import prisma from "../../../../../config/prisma.js";
import { rawQueryParser } from "../../../../../helpers/http.helper.js";

const _defaultQuery = {
    select: {
        id: true,
        name: true,
        type: true,
        lat: true,
        lng: true,
    }
}

const _defaultResponse = Joi.object({
    id: Joi.string().optional(),
    name: Joi.string().optional(),
    type: Joi.string().optional(),
    lat: Joi.number().optional(),
    lng: Joi.number().optional(),
}).unknown(false).required();

const _getUserAddressesQueryRaw = Joi.object({
    select: Joi.string().optional(),
}).unknown(false).required();

const _getUserAddressesQueryParsed = Joi.object({
    select: Joi.object({
        id: Joi.boolean().optional(),
        name: Joi.boolean().optional(),
        type: Joi.boolean().optional(),
        lat: Joi.boolean().optional(),
        lng: Joi.boolean().optional(),
    }).unknown(false).optional()
}).unknown(false).required();

const _getUserAddressesResponse = Joi.array().items(
    Joi.object({
        id: Joi.string().optional(),
        name: Joi.string().optional(),
        type: Joi.string().optional(),
        lat: Joi.number().optional(),
        lng: Joi.number().optional(),
    }).unknown(false)
).required();

const getUserAddresses = async (req, res, next) => {
    try {
        const { value: rawQuery, error: rawQueryError } = _getUserAddressesQueryRaw.validate(req.query);
        if (rawQueryError) {
            console.log(rawQueryError);
            throw createHttpError(400);
        }
        const { value: parsedQuery, error: parsedQueryError } = _getUserAddressesQueryParsed.validate(rawQueryParser(rawQuery));
        if (parsedQueryError) {
            console.log(parsedQueryError);
            throw createHttpError(400);
        }
        const { id } = req.user;
        const result = await prisma.userAddress.findMany({
            where: { user_id: id },
            select: parsedQuery.select || _defaultQuery.select
        });
        const { value, error } = _getUserAddressesResponse.validate(result);
        if (error) {
            console.log(error);
            throw createHttpError(500);
        }
        res.json(value);
    } catch (e) {
        next(e);
    }
}

const _createUserAddressQueryRaw = Joi.object({
    select: Joi.string().optional()
}).unknown(false).required();

const _createUserAddressQueryParsed = Joi.object({
    select: Joi.object({
        id: Joi.boolean().optional(),
        name: Joi.boolean().optional(),
        type: Joi.boolean().optional(),
        lat: Joi.boolean().optional(),
        lng: Joi.boolean().optional(),
    }).unknown(false).optional()
}).unknown(false).required();

const _createUserAddressBody = Joi.object({
    name: Joi.string().required(),
    type: Joi.string().valid("HOME", "OFFICE", "OTHER").required(),
    lat: Joi.number().required(),
    lng: Joi.number().required(),
}).unknown(false).required();

const _createUserAddressResponse = _defaultResponse;

const createUserAddress = async (req, res, next) => {
    try {
        const { value: rawQuery, error: rawQueryError } = _createUserAddressQueryRaw.validate(req.query);
        if (rawQueryError) {
            console.log(rawQueryError);
            throw createHttpError(400);
        }
        const { value: parsedQuery, error: parsedQueryError } = _createUserAddressQueryParsed.validate(rawQueryParser(rawQuery));
        if (parsedQueryError) {
            console.log(parsedQueryError);
            throw createHttpError(400);
        }
        const { value: body, error: bodyError } = _createUserAddressBody.validate(req.body);
        if (bodyError) {
            throw createHttpError(400);
        }
        const { id } = req.user;
        const result = await prisma.userAddress.create({
            data: {
                user_id: id,
                ...body
            },
            select: parsedQuery.select || _defaultQuery.select
        });
        const { value, error } = _createUserAddressResponse.validate(result);
        if (error) {
            console.log(error);
            throw createHttpError(500);
        }
        res.json(value);
    } catch (e) {
        next(e);
    }
}

const _getUserAddressQueryRaw = Joi.object({
    select: Joi.string().optional(),
}).unknown(false).required();

const _getUserAddressQueryParsed = Joi.object({
    select: Joi.object({
        id: Joi.boolean().optional(),
        name: Joi.boolean().optional(),
        type: Joi.boolean().optional(),
        lat: Joi.boolean().optional(),
        lng: Joi.boolean().optional(),
    }).unknown(false).optional()
}).unknown(false).required();

const _getUserAddressResponse = _defaultResponse;

const getUserAddress = async (req, res, next) => {
    try {
        const { value: rawQuery, error: rawQueryError } = _getUserAddressQueryRaw.validate(req.query);
        if (rawQueryError) {
            console.log(rawQueryError);
            throw createHttpError(400);
        }
        const { value: parsedQuery, error: parsedQueryError } = _getUserAddressQueryParsed.validate(rawQueryParser(rawQuery));
        if (parsedQueryError) {
            console.log(parsedQueryError);
            throw createHttpError(400);
        }
        const { id } = req.user;
        const { userAddressId } = req.params;
        const result = await prisma.userAddress.findUnique({
            where: {
                id: userAddressId,
                user_id: id,
            },
            select: parsedQuery.select || _defaultQuery.select
        });
        const { value, error } = _getUserAddressResponse.validate(result);
        if (error) {
            console.log(error);
            throw createHttpError(500);
        }
        res.json(value);
    } catch (e) {
        next(e);
    }
}

const _updateUserAddressQueryRaw = Joi.object({
    select: Joi.string().optional(),
}).unknown(false).required();

const _updateUserAddressQueryParsed = Joi.object({
    select: Joi.object({
        id: Joi.boolean().optional(),
        name: Joi.boolean().optional(),
        type: Joi.boolean().optional(),
        lat: Joi.boolean().optional(),
        lng: Joi.boolean().optional(),
    }).unknown(false).optional()
}).unknown(false).required();

const _updateUserAddressBody = Joi.object({
    name: Joi.string().optional(),
    type: Joi.string().valid("HOME", "OFFICE", "OTHER").optional(),
    lat: Joi.number().optional(),
    lng: Joi.number().optional(),
}).unknown(false).required();

const _updateUserAddressResponse = _defaultResponse;

const updateUserAddress = async (req, res, next) => {
    try {
        const { value: rawQuery, error: rawQueryError } = _updateUserAddressQueryRaw.validate(req.query);
        if (rawQueryError) {
            console.log(rawQueryError);
            throw createHttpError(400);
        }
        const { value: parsedQuery, error: parsedQueryError } = _updateUserAddressQueryParsed.validate(rawQueryParser(rawQuery));
        if (parsedQueryError) {
            console.log(parsedQueryError);
            throw createHttpError(400);
        }
        const { value: body, error: bodyError } = _updateUserAddressBody.validate(req.body);
        if (bodyError) {
            throw createHttpError(400);
        }
        const { id } = req.user;
        const { userAddressId } = req.params;
        const result = await prisma.userAddress.update({
            where: {
                id: userAddressId,
                user_id: id,
            },
            data: body,
            select: parsedQuery.select || { id: true }
        });
        const { value, error } = _updateUserAddressResponse.validate(result);
        if (error) {
            console.log(error);
            throw createHttpError(500);
        }
        res.json(value);
    } catch (e) {
        next(e);
    }
}

const _deleteUserAddressQueryRaw = Joi.object({
    select: Joi.string().optional(),
}).unknown(false).required();

const _deleteUserAddressQueryParsed = Joi.object({
    select: Joi.object({
        id: Joi.boolean().optional(),
        name: Joi.boolean().optional(),
        type: Joi.boolean().optional(),
        lat: Joi.boolean().optional(),
        lng: Joi.boolean().optional(),
    }).unknown(false).optional()
}).unknown(false).required();

const _deleteUserAddressResponse = _defaultResponse;

const deleteUserAddress = async (req, res, next) => {
    try {
        const { value: rawQuery, error: rawQueryError } = _deleteUserAddressQueryRaw.validate(req.query);
        if (rawQueryError) {
            console.log(rawQueryError);
            throw createHttpError(400);
        }
        const { value: parsedQuery, error: parsedQueryError } = _deleteUserAddressQueryParsed.validate(rawQueryParser(rawQuery));
        if (parsedQueryError) {
            console.log(parsedQueryError);
            throw createHttpError(400);
        }
        const { id } = req.user;
        const { userAddressId } = req.params;
        const result = await prisma.userAddress.delete({
            where: {
                id: userAddressId,
                user_id: id,
            },
            select: parsedQuery.select || { id: true }
        });
        const { value, error } = _deleteUserAddressResponse.validate(result);
        if (error) {
            console.log(error);
            throw createHttpError(500);
        }
        res.json(value);
    } catch (e) {
        next(e);
    }
}

export default {
    getUserAddresses,
    createUserAddress,
    getUserAddress,
    updateUserAddress,
    deleteUserAddress,
};