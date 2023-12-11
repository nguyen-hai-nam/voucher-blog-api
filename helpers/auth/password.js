import bcrypt from 'bcrypt';

export const hashPassword = async (password, saltRounds) => {
    return await bcrypt.hash(password, saltRounds);
};

export const comparePasswords = async (rawPassword, hashedPassword) => {
    return await bcrypt.compare(rawPassword, hashedPassword);
};
