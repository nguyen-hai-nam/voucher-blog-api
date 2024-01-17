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
