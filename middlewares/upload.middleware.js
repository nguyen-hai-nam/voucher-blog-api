import multer from 'multer';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

import { uploadDirectory } from '../constants/path.constant.js';

const hashFileName = (file) => {
    const payload = `${path.basename(file.originalname, path.extname(file.originalname))}${Date.now()}`;
    return `${crypto.createHash('md5').update(payload).digest('hex')}${path.extname(file.originalname)}`;
};

export const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            if (!fs.existsSync(uploadDir)) {
                // If not, create directory
                fs.mkdirSync(uploadDirectory, { recursive: true });
            }
            cb(null, uploadDirectory);
        },
        filename: function (req, file, cb) {
            cb(null, hashFileName(file));
        }
    }),
    limits: { fileSize: 1024 * 1024 * 5 }
});
