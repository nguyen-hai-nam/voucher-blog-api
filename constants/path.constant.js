export const uploadDir = process.env.FILE_STORAGE_PATH;
if (!uploadDir) {
    throw new Error('FILE_STOREAGE_PATH not found in .env file');
}

export const staticPath = 'files';
