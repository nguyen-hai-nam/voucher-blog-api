import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const hashFileName = (file: Express.Multer.File) => {
	const payload = `${path.basename(file.originalname, path.extname(file.originalname))}${Date.now()}`;
	return `${crypto.createHash('md5').update(payload).digest('hex')}${path.extname(file.originalname)}`;
};

export const upload = multer({
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, 'uploads');
		},
		filename: function (req, file, cb) {
			cb(null, hashFileName(file));
		}
	}),
	limits: { fileSize: 1024 * 1024 * 5 }
});
