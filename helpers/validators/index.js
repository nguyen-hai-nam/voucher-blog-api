import validator from 'validator';

export const isEmail = (email) => {
    return validator.isEmail(email);
};

export const isVietnamPhoneNumber = (phoneNumber) => {
    return validator.isMobilePhone(phoneNumber, 'vi-VN');
};

export const isURL = (url) => {
    return validator.isURL(url);
};

export const isLatLong = (latlng) => {
    return validator.isLatLong(latlng);
};
