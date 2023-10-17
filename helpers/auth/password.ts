import bcrypt from 'bcrypt';

export const hashPassword = async (password: string, saltRounds: number): Promise<string> => {
	return await bcrypt.hash(password, saltRounds);
};

export const comparePasswords = async (rawPassword: string, hashedPassword: string) => {
	return await bcrypt.compare(rawPassword, hashedPassword);
};
