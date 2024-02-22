import multer from 'multer';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

import { uploadDirectory } from '../constants/path.constant.js';

const hashFileName = (file) => {
    const payload = `${path.basename(file.originalname, path.extname(file.originalname))}${Date.now()}`;
    return `${crypto.createHash('md5').update(payload).digest('hex')}${path.extname(file.originalname)}`;
};

export const upload = (subPath = '') => multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const dir = path.join(uploadDirectory, subPath);
            if (!fs.existsSync(dir)) {
                // If not, create directory
                fs.mkdirSync(dir, { recursive: true });
            }
            cb(null, dir);
        },
        filename: function (req, file, cb) {
            cb(null, hashFileName(file));
        }
    }),
    limits: { fileSize: 1024 * 1024 * 5 }
});