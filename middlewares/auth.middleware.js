import 'dotenv/config';

import { decodeToken } from '../helpers/auth/jwt.js';

export const isAuth = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized', error: 'Missing Authorization header' });
    }
    const token = authHeader.split(' ')[1];
    let payload;
    try {
        payload = decodeToken(token);
        if (!payload) {
            return res.status(401).json({ message: 'Unauthorized', error: 'Unauthorized' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error', error });
    }
    req.body.payload = payload;
    req.user = payload;
    next();
};

export const isAdmin = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized', error: 'Missing Authorization header' });
    }
    const token = authHeader.split(' ')[1];
    let payload;
    try {
        payload = decodeToken(token);
        if (!payload || !payload.is_admin) {
            return res.status(401).json({ message: 'Unauthorized', error: 'Unauthorized' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error', error });
    }
    req.body.payload = payload;
    next();
};
