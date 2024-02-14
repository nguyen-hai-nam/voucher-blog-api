import Joi from "joi";

const getTickHistoryQueryRaw = Joi.object({
    fromDate: Joi.string().optional(),
    toDate: Joi.string().optional(),
}).required();

const getTickHistoryQueryParsed = Joi.object({
    fromDate: Joi.date().optional(),
    toDate: Joi.date().optional(),
}).required();

const getTickHistoryResponse = Joi.object({
    receivedTicks: Joi.array().items({
        created_at: Joi.date().required(),
    }).required(),
    collectedRewards: Joi.array().items({
        id: Joi.string().guid().required(),
        reward: Joi.object({
            name: Joi.string().required(),
            tick_price: Joi.number().required(),
        }).required(),
        created_at: Joi.date().iso().required(),
    }).required(),
});

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
    getTickHistoryQueryRaw,
    getTickHistoryQueryParsed,
    getTickHistoryResponse,
    collectRewardQueryRaw,
    collectRewardQueryParsed,
    collectRewardResponse,
    redeemRewardQueryRaw,
    redeemRewardQueryParsed,
    redeemRewardResponse,
};