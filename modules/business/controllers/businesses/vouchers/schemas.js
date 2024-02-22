import Joi from 'joi';

const createVoucherBody = Joi.object({
    index: Joi.number().optional(),
    type: Joi.string().valid('DISCOUNT', 'GIFT').required(),
    description: Joi.string().required(),
    discount_type: Joi.string().valid('PERCENT', 'VALUE', 'FIXED_PRICE').when('type', {
        is: 'DISCOUNT',
        then: Joi.required(),
        otherwise: Joi.optional()
    }),
    percent: Joi.number().when('discount_type', {
        is: 'PERCENT',
        then: Joi.required(),
        otherwise: Joi.optional()
    }),
    max_value: Joi.number().when('discount_type', {
        is: 'PERCENT',
        then: Joi.required(),
        otherwise: Joi.optional()
    }),
    value: Joi.number().when('discount_type', {
        is: 'VALUE',
        then: Joi.required(),
        otherwise: Joi.optional()
    }),
    fixed_price: Joi.number().when('discount_type', {
        is: 'FIXED_PRICE',
        then: Joi.required(),
        otherwise: Joi.optional()
    }),
    usage: Joi.string().valid('ONE_TIME', 'UNTIL_EXPIRATION').default('ONE_TIME'),
    status: Joi.string().valid('AVAILABLE', 'UNAVAILABLE').default('AVAILABLE'),
    max_use: Joi.number().required(),
    condition_min_bill_value: Joi.number().optional(),
    condition_beginning_hour: Joi.string().pattern(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
    condition_ending_hour: Joi.string().pattern(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
    condition_target: Joi.string().valid('ALL', 'SILVER', 'GOLD', 'DIAMOND').default('ALL'),
    appliedProducts: Joi.array().items(Joi.string()).optional(),
}).required();

const updateVoucherBody = Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    status: Joi.string().valid('AVAILABLE', 'UNAVAILABLE').optional(),
}).required();

export default {
    createVoucherBody,
    updateVoucherBody,
};