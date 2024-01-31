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
        const parsedQuery = _.mapValues(rawQuery, (key) => {
            const keys = JSON.parse(key);
            const values = _.fill(Array(keys.length), true);
            return _.zipObject(keys, values);
        });
        return (parsedQuery);
    } catch (e) {
        throw createHttpError(400);
    }   
}