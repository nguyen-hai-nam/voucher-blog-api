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

const search = async (req, res, next) => {
    const { keyword } = req.query;
    try {
        const result = await searchService.search(keyword);
        return res.status(200).json({ message: 'Success', data: result });
    } catch (error) {
        next(error);
    }
};

export default {
    suggestSearchResult,
    search
}