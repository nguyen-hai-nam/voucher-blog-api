import Joi from 'joi';

const createProductBody = Joi.object({
    category_id: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    status: Joi.string().valid('AVAILABLE', 'UNAVAILABLE').optional()
}).required();

const updateProductBody = Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    price: Joi.number().optional(),
    status: Joi.string().valid('AVAILABLE', 'UNAVAILABLE').optional(),
}).required();

export default {
    createProductBody,
    updateProductBody,
};