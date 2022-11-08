import { CainanceSequel, models } from '@cainance/db'
import { proto } from '@cainance/protobuf'
import { Request } from 'express'
import { validateAddOrder, validateCancelOrder } from './validate'
import { producer } from '../../../libs/kafka'

type AddOrderResponse = {
    id: number
    tradingPair: string
    price: number
    initAmount: number
    amount: number
    orderSide: number
    orderType: number
    status: string
    createdAt?: any
    updatedAt?: any
}

type CancelOrderResponse = object

const getInitAllowance = (
    base: string,
    currentAmount: number,
    amount: number,
    price: number,
    orderType: number,
    orderSide: number
): number => {
    if (orderType === proto.OrderType.LIMIT) {
        const initAllowance =
            orderSide === proto.OrderSide.ASK ? amount : amount * price
        if (currentAmount < initAllowance)
            throw new Error(`insufficient ${base}`)
        return initAllowance
    }

    if (orderType === proto.OrderType.MARKET) {
        return currentAmount
    }
}

const addOrder = async (req: Request, orderSide): Promise<AddOrderResponse> => {
    const args = await validateAddOrder(req.body)
    const [base, quote] = args.pair.split('/')

    try {
        const transaction = await CainanceSequel.sequelize.transaction(
            async t => {
                const wallet = await CainanceSequel.SpotWallet.findOne({
                    where: {
                        accountId: req.user._id,
                        token: orderSide == proto.OrderSide.ASK ? base : quote,
                    },
                    attributes: ['amount'],
                })
                if (!wallet) {
                    throw new Error('Error place order')
                }

                const initAllowance = getInitAllowance(
                    base,
                    parseFloat(wallet.amount),
                    args.amount,
                    args.price,
                    args.orderType,
                    orderSide
                )

                const order = await CainanceSequel.Order.create(
                    {
                        tradingPair: args.pair,
                        accountId: req.user._id,
                        initAllowance: initAllowance,
                        allowance: initAllowance,
                        price: args.price,
                        initAmount: args.amount,
                        amount: args.amount,
                        orderSide,
                        orderType: args.orderType,
                    },
                    {
                        transaction: t,
                    }
                )

                const orderPb = new proto.Order()
                orderPb.setOrderId(order.id)
                orderPb.setAccountId(req.user._id)
                orderPb.setAllowance(order.initAllowance)
                orderPb.setPair(order.tradingPair)
                orderPb.setPrice(order.price)
                orderPb.setAmount(order.amount)
                orderPb.setSide(order.orderSide)
                orderPb.setType(order.orderType)
                const bytes: Uint8Array = orderPb.serializeBinary()

                await producer.send({
                    topic: `${args.pair
                        .toLowerCase()
                        .replace('/', '-')}-orders`,
                    messages: [
                        {
                            key: args.pair,
                            value: Buffer.from(bytes),
                        },
                    ],
                })

                return order
            }
        )
        return transaction as AddOrderResponse
    } catch (err) {
        throw new Error(err.message)
    }
}

export const buy = async (req: Request): Promise<AddOrderResponse> => {
    return await addOrder(req, proto.OrderSide.BID)
}

export const sell = async (req: Request): Promise<AddOrderResponse> => {
    return await addOrder(req, proto.OrderSide.ASK)
}

export const cancel = async (
    req: Request,
    orderSide
): Promise<CancelOrderResponse> => {
    const args = await validateCancelOrder(req.body)
    return {} as CancelOrderResponse
}
