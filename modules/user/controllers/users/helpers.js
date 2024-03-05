const parseVoucherTime = (timeString) => {
    if (!timeString) {
        throw createHttpError(500)
    }
    const parsedTime = new Date();
    parsedTime.setHours(parseInt(timeString.split(":")[0]));
    parsedTime.setMinutes(parseInt(timeString.split(":")[1]));
    return parsedTime;
}

const checkTimeCondition = (voucher) => {
    const currentTime = new Date();
    const beginConditionTime = parseTime(voucher.condition_beginning_hour || "00:00");
    const endConditionTime = parseTime(voucher.condition_ending_hour || "23:59");

    if (currentTime < beginConditionTime || currentTime > endConditionTime) {
        return false;
    }

    return true;
}

const checkMinBillValueCondition = (voucher, billValue) => {
    if (voucher.condition_min_bill_value > billValue) {
        return false;
    }
    return true;
}