import Joi from 'joi';

const createRewardBody = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().optional(),
    tick_price: Joi.number().required(),
    image: Joi.binary()
}).required();

const updateRewardBody = Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    price: Joi.number().optional(),
}).required();

export default {
    createRewardBody,
    updateRewardBody,
};