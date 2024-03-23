import createHttpError from "http-errors";
import searchService from '../services/search.service.js'

const suggestSearchResult = async (req, res, next) => {
    try {
        const { lat, lng, keyword, maxDistance } = req.query

        const currentPosition = { lat, lng };

        if (!currentPosition) {
            createHttpError(400, 'Missing requirement!');
        }

        const searchingInfomations =
            await searchService.getNearByBussinessesOrProductsWithToKeyword(
                currentPosition,
                maxDistance,
                keyword
            );
        res.json(searchingInfomations);
    } catch (error) {
        next(error);
    }
}

export default {
    suggestSearchResult
}