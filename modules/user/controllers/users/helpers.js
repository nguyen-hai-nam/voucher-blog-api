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
    console.log(voucher)
    if (voucher.condition_beginning_hour && voucher.condition_ending_hour) {
        const currentTime = new Date();
        const beginConditionTime = parseVoucherTime(voucher.condition_beginning_hour || "00:00");
        const endConditionTime = parseVoucherTime(voucher.condition_ending_hour || "23:59");
        console.log(currentTime, beginConditionTime, endConditionTime)
        if (currentTime < beginConditionTime || currentTime > endConditionTime) {
            return false;
        }
    }
    return true;
}

const checkMinBillValueCondition = (voucher, billValue) => {
    if (billValue && voucher.condition_min_bill_value > billValue) {
        return false;
    }
    return true;
}

export {
    checkTimeCondition,
    checkMinBillValueCondition
}