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
            const jsonValue = JSON.parse(value);
            let parsedValue;
            if (key === 'select') {
                const values = _.fill(Array(jsonValue.length), true);
                parsedValue =  _.zipObject(jsonValue, values);
            } else if (key === 'where') {
                parsedValue = jsonValue;
            }
            return parsedValue;
        });
        return (parsedQuery);
    } catch (e) {
        throw createHttpError(400);
    }   
}