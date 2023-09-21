import 'dotenv/config';
import { Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import { TypedBodyRequest } from '../interfaces/request';
import { ChangePasswordBody, LoginBody, RegisterBody } from '../interfaces/request/body';

const generateToken = (user: User) => {
	return jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET || 'secret');
};
const register = async (req: TypedBodyRequest<RegisterBody>, res: Response) => {
	const { email, password } = req.body;
	try {
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: 'Email is already in use' });
		}
		const newUser = new User({
			email
		});
		await newUser.hashPassword(password);
		await newUser.save();
		return res.status(201).json(newUser);
	} catch (error) {
		return res.status(500).json(error);
	}
};

const login = async (req: TypedBodyRequest<LoginBody>, res: Response) => {
	const { email, password } = req.body;
	try {
		if (!(email && password)) {
			return res.status(400).json({ message: 'Missing email or password' });
		}
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		} else if (!user.comparePassword(password)) {
			return res.status(401).json({ message: 'Incorrect email or password' });
		}
		const token = generateToken(user);
		return res.status(200).json({ token });
	} catch (error) {
		return res.status(500).json(error);
	}
};

const changePassword = async (req: TypedBodyRequest<ChangePasswordBody>, res: Response) => {
	const payload = req.payload;
	const { oldPassword, newPassword } = req.body;
	try {
		const user = await User.findById(payload._id);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		if (!user.comparePassword(oldPassword)) {
			return res.status(401).json({ message: 'Incorrect password' });
		}
		user.hashPassword(newPassword);
		await user.save();
		return res.status(200).json({ message: 'Change password successfully' });
	} catch (error) {
		return res.status(500).json(error);
	}
};

export default {
	register,
	login,
	changePassword
};
