import Joi from 'joi';

export const productCategorySchema = Joi.object({
    id: Joi.string().required(),
    business_id: Joi.string().required(),
    name: Joi.string().required(),
    created_at: Joi.date().required(),
    updated_at: Joi.date().required()
});

export const productCategoryCreateSchema = Joi.object({
    name: Joi.string().required()
});

export const productCategoryUpdateSchema = Joi.object({
    name: Joi.string().optional()
});
