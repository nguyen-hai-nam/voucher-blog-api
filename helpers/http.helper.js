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
