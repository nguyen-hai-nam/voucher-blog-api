import Joi from "joi";

const updateCurrentBusinessBody = Joi.object({
    category_id: Joi.string().optional(),
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    logo_image_url: Joi.string().optional(),
    status: Joi.string().optional(),
}).unknown(false).required();

export default {
    updateCurrentBusinessBody
}