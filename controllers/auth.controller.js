import authService from '../services/auth.service.js';
import userService from '../services/user.service.js';
import { parseQuery } from '../helpers/http.helper.js';

const getCurrentUser = async (req, res, next) => {
    const userId = req.user.id;
    const query = parseQuery(req.query);
    try {
        const user = await userService.getUserById(userId, query);
        return res.status(200).json({
            message: 'Success',
            data: user
        });
    } catch (error) {
        next(error);
    }
};

const register = async (req, res, next) => {
    const { email, phoneNumber, password } = req.body;
    if (!((email || phoneNumber) && password)) {
        return res.status(400).json({ message: 'Missing credentials' });
    }
    try {
        let token;
        if (email) {
            token = await authService.registerWithEmail(email, password);
        } else if (phoneNumber) {
            token = await authService.registerWithPhoneNumber(phoneNumber, password);
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
    const { email, phoneNumber, password } = req.body;
    if (!((email || phoneNumber) && password)) {
        return res.status(400).json({ message: 'Missing credentials' });
    }
    try {
        let token;
        if (email) {
            token = await authService.loginWithEmail(email, password);
        } else if (phoneNumber) {
            token = await authService.loginWithPhoneNumber(phoneNumber, password);
        }
        return res.status(200).json({
            message: 'Success',
            token
        });
    } catch (error) {
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

export default {
    getCurrentUser,
    register,
    login,
    changePassword
};
