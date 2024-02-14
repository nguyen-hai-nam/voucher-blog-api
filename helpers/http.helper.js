import _ from 'lodash';
import createHttpError from 'http-errors';

export const parseQuery = (query) => {
    const { skip, take, where, select, include } = query;
    return {
        skip: skip ? parseInt(skip) : undefined,
        take: take ? parseInt(take) : undefined,
        where: where ? JSON.parse(where) : undefined,
        select: select ? JSON.parse(select) : undefined,
        include: include ? JSON.parse(include) : undefined
    };
};

export const rawQueryParser = (rawQuery) => {
    try {
        const parsedQuery = _.mapValues(rawQuery, (value, key) => {
            let parsedValue;
            if (key === 'select') {
                const values = _.fill(Array(JSON.parse(value).length), true);
                parsedValue =  _.zipObject(JSON.parse(value), values);
            } else if (key === 'where') {
                parsedValue = JSON.parse(value);
            } else if (key === 'fromDate' || key === 'toDate') {
                parsedValue = new Date(value);
            }
            return parsedValue;
        });
        return (parsedQuery);
    } catch (e) {
        throw createHttpError(400);
    }   
}

export const selectParser = (select, whitelist) => {
    try {
        if (!select) {
            const defaultSelectObject = _.zipObject(whitelist, _.fill(Array(whitelist.length), true));
            return defaultSelectObject;
        }
        const selectArray = _.split(select, ',');
        const filteredSelectArray = _.intersection(selectArray, whitelist);
        const selectObject = _.zipObject(filteredSelectArray, _.fill(Array(filteredSelectArray.length), true));
        return selectObject;
    } catch (e) {
        throw createHttpError(400);
    }
};

export const includeParser = (include, whitelist) => {
    try {
        if (!include) {
            return {};
        }
        const includeArray = _.split(include, ',');
        const filteredIncludeArray = _.intersection(includeArray, whitelist);
        const includeObject = _.zipObject(filteredIncludeArray, _.fill(Array(filteredIncludeArray.length), true));
        return includeObject;
    } catch (e) {
        throw createHttpError(400);
    }
}