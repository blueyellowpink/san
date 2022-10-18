import AppRequest from 'interfaces/AppRequest';
import parseArgs from './parseArgs';
import { OrderSide, OrderType } from './orderEnums';
import OrderResponse from './orderResponse';
import { CainanceSequel } from 'cainance';

export const getOpenOrders = async (
    req: AppRequest
): Promise<OrderResponse[] | []> => {
    try {
        let args = parseArgs(req, 'get');

        const pair = await CainanceSequel.Pair.findOne({
            where: { slug: args.pair },
        });

        let orders = await CainanceSequel.Order.findAll({
            where: {
                userId: req.user.id,
                pairId: pair.id,
                active: true,
            },
            attributes: {
                exclude: ['active', 'userId', 'status'],
            },
        });

        if (orders) {
            return orders.map(order => order.toJSON());
        }

        return [];
    } catch (err) {
        throw new Error(err.message);
    }
};

export const getOrderHistory = async (
    req: AppRequest
): Promise<OrderResponse[] | []> => {
    try {
        let args = parseArgs(req, 'get');

        const pair = await CainanceSequel.Pair.findOne({
            where: { slug: args.pair },
        });

        let orders = await CainanceSequel.Order.findAll({
            where: {
                userId: req.user.id,
                pairId: pair.id,
                active: false,
            },
            attributes: {
                exclude: ['active', 'userId'],
            },
        });

        if (orders) {
            return orders.map(order => order.toJSON());
        }

        return [];
    } catch (err) {
        throw new Error(err.message);
    }
};
