import prisma from "../../../config/prisma.js";

const getSearchResult = async (keyword) => {
    try {
        const businesses = await prisma.business.findMany({
            include: {
                images: {
                    where: {
                        type: {
                            in: ['FRONT', 'INSIDE']
                        }
                    }
                }
            }
        })
        return businesses;
    } catch (error) {
        throw error;
    }
}


export default {
    getSearchResult
}