import 'dotenv/config';
import createHttpError from "http-errors";
import Joi from "joi";
import jwt from "jsonwebtoken";

import prisma from "../../../../config/prisma.js";

const _generateUserAccessTokenPayload = Joi.object({
    id: Joi.string().required(),
    is_admin: Joi.boolean().required(),
}).required();

const _generateUserAccessToken = async (payload) => {
    const { value: validatedPayload, error } = _generateUserAccessTokenPayload.validate(payload);
    if (error) {
        throw createHttpError(500);
    }
    const token = jwt.sign(validatedPayload, process.env.JWT_SECRET, { expiresIn: '7d' });
    return token;
}

const _generateBusinessAccessTokenPayload = Joi.object({
    user_id: Joi.string().required(),
    business_id: Joi.string().required(),
}).required();

const _generateBusinessAccessToken = async (payload) => {
    const { value: validatedPayload, error } = _generateBusinessAccessTokenPayload.validate(payload);
    if (error) {
        throw createHttpError(500);
    }
    const token = jwt.sign(validatedPayload, process.env.JWT_SECRET, { expiresIn: '7d' });
    return token;
}

const loginBusiness = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { businessId } = req.params;
        const result = await prisma.userManageBusiness.findUnique({
            where: { business_id_user_id: { business_id: businessId, user_id: userId } }
        });
        if (!result) {
            throw createHttpError(401);
        }
        const businessAccessToken = await _generateBusinessAccessToken({
            user_id: result.user_id,
            business_id: result.business_id
        });
        res.json({ businessAccessToken });
    } catch (e) {
        console.log(e)
        next(e);
    }
};

export default {
    loginBusiness,
};