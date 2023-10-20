import { Prisma } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';

const errorHandler = (
	error: Error,
	req: Request,
	res: Response,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	next: NextFunction
) => {
	if (error instanceof createHttpError.HttpError) {
		return res.status(error.statusCode).json({ message: error.message });
	} else if (error instanceof Prisma.PrismaClientKnownRequestError) {
		if (error.code === 'P2025') {
			return res.status(404).json({ message: 'Not found' });
		}
		return res.status(500).json({ message: 'Prisma Error' });
	} else {
		return res.status(500).json({ message: 'Unknown Error' });
	}
};

export default errorHandler;
