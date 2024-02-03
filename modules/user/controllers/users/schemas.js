import Joi from "joi";

const collectRewardQueryRaw = Joi.object({
    select: Joi.string().optional(),
}).required();

const collectRewardQueryParsed = Joi.object({
    select: Joi.object({
        id: Joi.boolean().optional(),
        user_id: Joi.boolean().optional(),
        reward_id: Joi.boolean().optional(),
        status: Joi.boolean().optional(),
        created_at: Joi.boolean().optional(),
    }).optional(),
}).required();

const collectRewardResponse = Joi.object({
    id: Joi.string().optional(),
    user_id: Joi.string().optional(),
    reward_id: Joi.string().optional(),
    status: Joi.string().optional(),
    created_at: Joi.date().optional(),
}).required();;

const redeemRewardQueryRaw = Joi.object({
    select: Joi.string().optional(),
}).required();

const redeemRewardQueryParsed = Joi.object({
    select: Joi.object({
        id: Joi.boolean().optional(),
        user_id: Joi.boolean().optional(),
        reward_id: Joi.boolean().optional(),
        status: Joi.boolean().optional(),
        created_at: Joi.boolean().optional(),
    }).optional(),
}).required();

const redeemRewardResponse = Joi.object({
    id: Joi.string().optional(),
    user_id: Joi.string().optional(),
    reward_id: Joi.string().optional(),
    status: Joi.string().optional(),
    created_at: Joi.date().optional(),
}).required();;

export default {
    collectRewardQueryRaw,
    collectRewardQueryParsed,
    collectRewardResponse,
    redeemRewardQueryRaw,
    redeemRewardQueryParsed,
    redeemRewardResponse,
};