import 'dotenv/config';
import createHttpError from "http-errors";
import Joi from "joi";
import jwt from "jsonwebtoken";

import prisma from "../../../../config/prisma.js";
import authService from '../../../../services/auth.service.js';

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
    id: Joi.string().required(),
    user_id: Joi.string().required(),
}).required();

const _generateBusinessAccessToken = async (payload) => {
    const { value: validatedPayload, error } = _generateBusinessAccessTokenPayload.validate(payload);
    if (error) {
        throw createHttpError(500);
    }
    const token = jwt.sign(validatedPayload, process.env.JWT_SECRET, { expiresIn: '7d' });
    return token;
}

const register = async (req, res, next) => {
    const { email, phone_number, password, ...rest } = req.body;
    if (!((email || phone_number) && password)) {
        return res.status(400).json({ message: 'Missing credentials' });
    }
    try {
        let token;
        if (email) {
            token = await authService.registerWithEmail(email, password, rest);
        } else if (phone_number) {
            token = await authService.registerWithPhoneNumber(phone_number, password, rest);
        }
        return res.status(201).json({
            message: 'Success',
            token
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    const { email, phone_number, password } = req.body;
    if (!((email || phone_number) && password)) {
        return res.status(400).json({ message: 'Missing credentials' });
    }
    try {
        let token;
        if (email) {
            token = await authService.loginWithEmail(email, password);
        } else if (phone_number) {
            token = await authService.loginWithPhoneNumber(phone_number, password);
        }
        return res.status(200).json({
            message: 'Success',
            token
        });
    } catch (error) {
        console.log(error)
        next(error);
    }
};

// TODO: Revoke old tokens after changing password succcesfully
const changePassword = async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id;
    try {
        await authService.changePassword(userId, oldPassword, newPassword);
        return res.status(200).json({ message: 'Success' });
    } catch (error) {
        next(error);
    }
};

const registerBusiness = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { name, description, category_id, open_hour, close_hour, lowest_price, highest_price, email, phone_number, website, lng, lat, address_name } = req.body;
        await prisma.userManageBusiness.create({
            data: {
                business: {
                    create: {
                        name,
                        description,
                        category_id,
                        avatar_image_url: `https://ui-avatars.com/api/?name=${name}`,
                        open_hour,
                        close_hour,
                        lowest_price,
                        highest_price,
                        email,
                        phone_number,
                        website,
                        lng,
                        lat,
                        address_name,
                    }
                },
                user: {
                    connect: { id: userId },
                },
            }
        });
        res.status(201).json({ success: true });
    } catch (e) {
        next(e);
    }
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
            id: result.business_id,
            user_id: result.user_id,
        });
        res.json({ businessAccessToken });
    } catch (e) {
        console.log(e)
        next(e);
    }
};

const getCurrentUser = async (req, res, next) => {
    const userId = req.user.id;
    try {
        const user = await prisma.user.findUnique({ where: { id: userId }});
        return res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
};

export default {
    register,
    login,
    changePassword,
    registerBusiness,
    loginBusiness,
    getCurrentUser,
};