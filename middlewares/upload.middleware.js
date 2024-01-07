import multer from 'multer';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uploadDir = path.join(__dirname, 'uploads');

const hashFileName = (file) => {
    const payload = `${path.basename(file.originalname, path.extname(file.originalname))}${Date.now()}`;
    return `${crypto.createHash('md5').update(payload).digest('hex')}${path.extname(file.originalname)}`;
};

export const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            if (!fs.existsSync(uploadDir)) {
                // If not, create directory
                fs.mkdirSync(uploadDir, { recursive: true });
            }
            cb(null, uploadDir);
        },
        filename: function (req, file, cb) {
            cb(null, hashFileName(file));
        }
    }),
    limits: { fileSize: 1024 * 1024 * 5 }
});
