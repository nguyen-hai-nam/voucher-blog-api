import searchResultService from "../services/searchResult.service.js"

const getSearchResult = async (req, res, next) => {
    try {
        const { lat, lng, keyword } = req.query

        const currentPosition = { lat, lng };

        if (!currentPosition) {
            createHttpError(400, 'Missing requirement!');
        }

        const result = await searchResultService.getSearchResult(currentPosition, keyword);
        res.json(result);
    } catch (error) {
        next(error);
    }
}

export default {
    getSearchResult
}