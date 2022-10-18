import AppRequest from 'interfaces/AppRequest';
import { OrderSide, OrderType } from './orderEnums';
import OrderResponse from './orderResponse';
import parseArgs from './parseArgs';
import { CainanceSequel } from 'cainance';
import { serializeModifyRequest } from 'utils/protobufHelpers';
import { produceMessage } from 'kafka';

const modify = async (req: AppRequest): Promise<object> => {
    try {
        let args = parseArgs(req, 'modify');

        const order = await CainanceSequel.Order.findOne({
            where: {
                id: args.orderId,
                userId: req.user.id,
                active: true,
            },
        });

        if (order) {
            const orderJson = order.toJSON();
            await order.update({
                price: args.newPrice,
                amount: args.newAmount,
            });

            const request = serializeModifyRequest(
                orderJson,
                args.newPrice,
                args.newAmount
            );
            produceMessage(`${args.pair}-orders`, request, args.pair);
        }

        return {
            status: 'ok',
        };
    } catch (err) {
        throw new Error(err.message);
    }
};

export default modify;
