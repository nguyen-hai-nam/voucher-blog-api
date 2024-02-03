import 'dotenv/config';

import { decodeToken } from '#root/helpers/auth/jwt.js';

export const isBusiness = (req, res, next) => {
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
    req.business = payload;
    next();
};