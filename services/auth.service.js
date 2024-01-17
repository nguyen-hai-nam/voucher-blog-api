import createHttpError from 'http-errors';

import prisma from '../config/prisma.js';
import { comparePasswords, hashPassword } from '../helpers/auth/password.js';
import { saltRounds } from '../constants/auth.constant.js';
import { isEmail, isVietnamPhoneNumber } from '../helpers/validators/index.js';
import { generateAccessToken } from '../helpers/auth/jwt.js';

const registerWithEmail = async (email, password, userData) => {
    if (!isEmail(email)) {
        throw createHttpError(400, 'Invalid email');
    }
    const existingEmail = await prisma.user.findUnique({
        where: { email }
    });
    if (existingEmail) {
        throw createHttpError(400, 'Email already exists');
    }
    const hashedPassword = await hashPassword(password, saltRounds);
    try {
        const newUser = await prisma.user.create({
            data: {
                is_admin: false,
                email,
                password: hashedPassword,
                ...userData
            }
        });
        return generateAccessToken(newUser);
    } catch (error) {
        throw createHttpError(500, 'Fail to register');
    }
};

const registerWithPhoneNumber = async (phoneNumber, password, userData) => {
    if (!isVietnamPhoneNumber(phoneNumber)) {
        throw createHttpError(400, 'Invalid phone number');
    }
    const existingPhoneNumber = await prisma.user.findUnique({
        where: { phone_number: phoneNumber }
    });
    if (existingPhoneNumber) {
        throw createHttpError(400, 'Phone number already exists');
    }
    const hashedPassword = await hashPassword(password, saltRounds);
    try {
        const newUser = await prisma.user.create({
            data: {
                is_admin: false,
                phone_number: phoneNumber,
                password: hashedPassword,
                ...userData
            }
        });
        return generateAccessToken(newUser);
    } catch (error) {
        throw createHttpError(500, 'Fail to register');
    }
};

const loginWithEmail = async (email, password) => {
    if (!isEmail(email)) {
        throw createHttpError(400, 'Invalid email');
    }
    const user = await prisma.user.findUnique({
        where: { email }
    });
    if (!user) {
        throw createHttpError(401, 'Unauthorized');
    }
    const isValid = await comparePasswords(password, user.password);
    if (!isValid) {
        throw createHttpError(401, 'Unauthorized');
    }
    return generateAccessToken(user);
};

const loginWithPhoneNumber = async (phoneNumber, password) => {
    if (!isVietnamPhoneNumber(phoneNumber)) {
        throw createHttpError(400, 'Invalid phone number');
    }
    const user = await prisma.user.findUnique({
        where: { phone_number: phoneNumber }
    });
    if (!user) {
        throw createHttpError(401, 'Unauthorized');
    }
    const isValid = await comparePasswords(password, user.password);
    if (!isValid) {
        throw createHttpError(401, 'Unauthorized');
    }
    return generateAccessToken(user);
};

const changePassword = async (userId, oldPassword, newPassword) => {
    const user = await prisma.user.findUnique({
        where: { id: userId }
    });
    if (!user) {
        throw createHttpError(401, 'Unauthorized');
    }
    const isValid = await comparePasswords(oldPassword, user.password);
    if (!isValid) {
        throw createHttpError(401, 'Unauthorized');
    }
    const hashedPassword = await hashPassword(newPassword, saltRounds);
    await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            password: hashedPassword
        }
    });
    return true;
};

export default {
    registerWithEmail,
    registerWithPhoneNumber,
    loginWithEmail,
    loginWithPhoneNumber,
    changePassword
};
