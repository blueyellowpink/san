import Joi from 'joi'
import { getEnumValues } from '../../../libs/utils'
import { proto } from '@cainance/protobuf'
import { redis, models } from '@cainance/db'

const orderTypes = getEnumValues(proto.OrderType)
const orderSides = getEnumValues(proto.OrderSide)

const addOrderArgs = Joi.object({
    pair: Joi.string().uppercase().required(),
    price: Joi.number().greater(0).required(),
    amount: Joi.number().greater(0).required(),
    orderType: Joi.number()
        .valid(...orderTypes)
        .required(),
})

export const validateAddOrder = async body => {
    const args = addOrderArgs.validate(body)
    if (args.error) {
        throw new Error(args.error.details[0].message)
    }

    const pair = await redis.HGET('pairs', args.value.pair)
    if (!pair) {
        const found = await models.TradingPair.findOne({
            name: args.value.pair,
        })
            .select('_id')
            .lean()
        if (!found) {
            throw new Error('Trading pair not found')
        }
        redis.HSET('pairs', args.value.pair, 1)
    }

    return args.value
}

const cancelOrderArgs = Joi.object({
    price: Joi.number().greater(0).required(),
    orderId: Joi.number().greater(0).required(),
    orderSide: Joi.number()
        .valid(...orderSides)
        .required(),
})

export const validateCancelOrder = body => {
    const args = cancelOrderArgs.validate(body)
    if (args.error) {
        throw new Error(args.error.details[0].message)
    }
    return args.value
}

const getOrderArgs = Joi.object({
    pair: Joi.string().uppercase().required(),
    active: Joi.boolean().default(true),
    page: Joi.number().greater(0).required(),
    limit: Joi.number().greater(0).default(10).required(),
})

export const validateGetOrder = query => {
    const args = getOrderArgs.validate(query)
    if (args.error) {
        throw new Error(args.error.details[0].message)
    }
    return args.value
}
