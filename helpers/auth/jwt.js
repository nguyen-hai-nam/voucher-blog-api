import 'dotenv/config';
import jwt from 'jsonwebtoken';

export const generateAccessToken = (payload) => {
    return jwt.sign({ id: payload.id, is_admin: payload.is_admin }, process.env.TOKEN_SECRET || 'secret');
};

export const decodeToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET || 'secret');
        return decoded;
    } catch (err) {
        return null;
    }
};
