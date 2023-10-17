import validator from 'validator';

export const isEmail = (email: string): boolean => {
	return validator.isEmail(email);
};

export const isVietnamPhoneNumber = (phoneNumber: string): boolean => {
	return validator.isMobilePhone(phoneNumber, 'vi-VN');
};

export const isURL = (url: string): boolean => {
	return validator.isURL(url);
};

export const isLatLong = (latlng: string): boolean => {
	return validator.isLatLong(latlng);
};
