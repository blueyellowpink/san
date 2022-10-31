import { CainanceSequel, models } from '@cainance/db'
import { proto } from '@cainance/protobuf'
import { Request } from 'express'
import { validateGetOrder } from './validate'

type Row = {
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

type Order = {
    count: number
    rows: Array<Row>
}

export const getOrder = async (req: Request): Promise<Order> => {
    const args = await validateGetOrder(req.query)

    const { rows, count } = await CainanceSequel.Order.findAndCountAll({
        where: {
            accountId: req.user._id.toString(),
            tradingPair: args.pair,
            active: args.active,
        },
        attributes: {
            exclude: ['accountId'],
        },
        limit: args.limit,
        offset: args.limit * (args.page - 1),
    })

    return { rows, count } as Order
}
