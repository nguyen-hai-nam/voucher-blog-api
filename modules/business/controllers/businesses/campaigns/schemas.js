import Joi from 'joi';

const createCampaignBody = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    start_date: Joi.date().required(),
    end_date: Joi.date().required(),
    status: Joi.string().valid('ACTIVE', 'EXPIRED').default('ACTIVE'),
    voucherIds: Joi.array().items(Joi.number()).min(1).required(),
}).required();

const updateCampaignBody = Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    start_date: Joi.date().optional(),
    end_date: Joi.date().optional(),
    status: Joi.string().valid('ACTIVE', 'EXPIRED').optional(),
}).required();

export default {
    createCampaignBody,
    updateCampaignBody,
};