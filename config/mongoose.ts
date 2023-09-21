import 'dotenv/config';
import mongoose from 'mongoose';

mongoose.connection.on('connecting', () => {
	console.log('Mongo connecting');
});

mongoose.connection.on('connected', () => {
	console.log('Mongo connected');
});

mongoose.connection.on('disconnecting', () => {
	console.log('Mongo disconnecting');
});

mongoose.connection.on('disconnected', () => {
	console.log('Mongo disconnected');
});

mongoose.connection.on('error', (error) => {
	console.log(`Mongo error: ${error}`);
	process.exitCode = 1;
});

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017';

export const start = () => {
	mongoose.connect(mongoUri).catch((error) => console.log(error));
	return mongoose.connection;
};
