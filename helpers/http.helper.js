import _ from 'lodash';

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