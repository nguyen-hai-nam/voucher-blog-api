import prisma from "../../../config/prisma.js";
import { calculateDistance } from "../utils/sphereDistance.util.js";


const getNearByProductsWithKeyword = async (currentPosition, maxDistance, keyword) => {
    try {
        const productsRelateToKeyWord =
            await prisma.product.findMany({
                where: {
                    name: {
                        contains: keyword
                    }
                },
                include: {
                    business: true
                }
            })
        const nearByProductsRelateToKeyword =
            productsRelateToKeyWord.filter(({ business }) => {
                return maxDistance >= calculateDistance(currentPosition, business);
            });

        return nearByProductsRelateToKeyword;

    } catch (error) {
        throw error;
    }
}

const getNearByBusinessesWithKeyword = async (currentPosition, maxDistance, keyword) => {
    try {
        const businessesRelateToKeyWord =
            await prisma.business.findMany({
                where: {
                    name: {
                        contains: keyword
                    }
                }
            });
        const nearByBusinessesRelateToKeyWord =
            businessesRelateToKeyWord.filter(({ lng, lat }) => {
                return maxDistance >= calculateDistance(currentPosition, { lng, lat });
            })
        return nearByBusinessesRelateToKeyWord;
    } catch (error) {
        throw error;
    }
}

const getNearByBussinessesOrProductsWithToKeyword = async (currentPosition, maxDistance, keyword) => {
    try {
        const businessesPromise = getNearByBusinessesWithKeyword(currentPosition, maxDistance, keyword);
        const productsPromise = getNearByProductsWithKeyword(currentPosition, maxDistance, keyword);
        // Execute both async functions concurrently
        const [businesses, products] = await Promise.all([businessesPromise, productsPromise]);
        // await Promise.all([businesses, products]);
        return { businesses, products };
    } catch (error) {
        throw error;
    }
}


export default {
    getNearByBussinessesOrProductsWithToKeyword
}