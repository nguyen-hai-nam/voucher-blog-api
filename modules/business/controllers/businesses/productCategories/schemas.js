import Joi from "joi";

const createProductCategoryBody = Joi.object({
    name: Joi.string().required(),
}).required();

const updateProductCategoryBody = Joi.object({
    name: Joi.string().required(),
}).required();

export default {
    createProductCategoryBody,
    updateProductCategoryBody,
};