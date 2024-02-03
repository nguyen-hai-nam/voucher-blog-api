import Joi from "joi";

const defaultResponse = Joi.object({
    id: Joi.string().optional(),
    user_id: Joi.string().optional(),
    reward_id: Joi.string().optional(),
    status: Joi.string().optional(),
    created_at: Joi.date().optional(),
}).required();

const getCollectedRewardsQueryRaw = Joi.object({
    select: Joi.string().optional(),
    where: Joi.string().optional(),
}).required();

const getCollectedRewardsQueryParsed = Joi.object({
    select: Joi.object({
        id: Joi.boolean().optional(),
        user_id: Joi.boolean().optional(),
        reward_id: Joi.boolean().optional(),
        status: Joi.boolean().optional(),
        created_at: Joi.boolean().optional(),
    }).optional(),
    where: Joi.object({
        status: Joi.string().valid("COLLECTED", "REDEEMED", "EXPIRED").optional(),
    }).optional(),
}).required();

const getCollectedRewardsResponse = Joi.array().items(
    defaultResponse.optional()
).required();

const getCollectedRewardQueryRaw = Joi.object({
    select: Joi.string().optional()
}).required(); 

const getCollectedRewardQueryParsed = Joi.object({
    select: Joi.object({
        id: Joi.boolean().optional(),
        user_id: Joi.boolean().optional(),
        reward_id: Joi.boolean().optional(),
        status: Joi.boolean().optional(),
        created_at: Joi.boolean().optional(),
    }).optional(),
}).required();

const getCollectedRewardResponse = defaultResponse;

const deleteCollectedRewardQueryRaw = Joi.object({
    select: Joi.string().optional(),
}).required();

const deleteCollectedRewardQueryParsed = Joi.object({
    select: Joi.object({
        id: Joi.boolean().optional(),
        user_id: Joi.boolean().optional(),
        reward_id: Joi.boolean().optional(),
        status: Joi.boolean().optional(),
        created_at: Joi.boolean().optional(),
    }).optional(),
}).required();

const deleteCollectedRewardResponse = defaultResponse;

export default {
    getCollectedRewardsQueryRaw,
    getCollectedRewardsQueryParsed,
    getCollectedRewardsResponse,
    getCollectedRewardQueryRaw,
    getCollectedRewardQueryParsed,
    getCollectedRewardResponse,
    deleteCollectedRewardQueryRaw,
    deleteCollectedRewardQueryParsed,
    deleteCollectedRewardResponse,
};
