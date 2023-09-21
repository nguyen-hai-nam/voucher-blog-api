import { Model, Schema, Types, model } from 'mongoose';
import bcrypt from 'bcrypt';

interface User {
	_id: Types.ObjectId;
	email: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
}

interface UserMethods {
	fullName(): string;
	hashPassword(rawPassword: string): void;
	comparePassword(plainTextPassword: string): Promise<boolean>;
}

type UserModel = Model<User, {}, UserMethods>;

const schema = new Schema<User, UserModel, UserMethods>(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			validate: {
				validator: (email: string) => {
					// Regular expression for a valid email address
					const emailRegex = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
					return emailRegex.test(email);
				},
				message: 'Please fill a valid email address'
			}
		},
		password: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true
	}
);

schema.method('hashPassword', async function hashPassword(rawPassword: string) {
	const saltRounds = 10;
	this.password = await bcrypt.hash(rawPassword, saltRounds);
});

schema.method('comparePassword', function comparePassword(plainTextPassword: string) {
	return bcrypt.compare(plainTextPassword, this.password);
});

const User = model<User, UserModel>('User', schema);

export default User;
