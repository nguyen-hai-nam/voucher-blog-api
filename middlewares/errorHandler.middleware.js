import { Prisma } from '@prisma/client';
import createHttpError from 'http-errors';

// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
    if (error instanceof createHttpError.HttpError) {
        return res.status(error.statusCode).json({ message: 'Error', error });
    } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
            return res.status(404).json({ message: 'Prisma not found', error });
        }
        return res.status(500).json({ message: 'Prisma error', error });
    } else {
        return res.status(500).json({ message: 'Internal error', error });
    }
};

export default errorHandler;
