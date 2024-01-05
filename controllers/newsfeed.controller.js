import newsfeedService from '../services/newsfeed.service.js';

const getNewsfeed = async (req, res, next) => {
    try {
        const result = await newsfeedService.getNewsfeed(
            req.params.user_id,
            req.params.address_id,
            parseInt(req.query.radius)
        );
        return res.status(200).json({ message: 'Success', data: result });
    } catch (error) {
        next(error);
    }
};

const getBusinessSuggestion = async (req, res, next) => {
    try {
        const result = await newsfeedService.getBusinessSuggestion(
            req.params.user_id,
            req.params.address_id,
            parseInt(req.query.radius)
        );
        return res.status(200).json({ message: 'Success', data: result });
    } catch (error) {
        next(error);
    }
};

const search = async (req, res, next) => {
    const { keyword } = req.query;
    try {
        const result = await newsfeedService.search(keyword);
        return res.status(200).json({ message: 'Success', data: result });
    } catch (error) {
        next(error);
    }
};

export default {
    getNewsfeed,
    getBusinessSuggestion,
    search
};
