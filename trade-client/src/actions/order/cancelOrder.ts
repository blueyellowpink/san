import AppRequest from 'interfaces/AppRequest';
import { OrderSide, OrderType } from './orderEnums';
import parseArgs from './parseArgs';
import { CainanceSequel, CainanceMongo } from 'cainance';
import { serializeCancelRequest } from 'utils/protobufHelpers';
import { produceMessage } from 'kafka';

const returnTokenBalance = async order => {
    const [crypto, fiat] = order.pair.slug.split('-');
    /* TODO: use cache to get token id */
    const token = await CainanceMongo.Token.findOne({
        name: order.orderSide === 'ASK' ? crypto : fiat,
    })
        .select('_id')
        .lean();
    await CainanceMongo.SpotWallet.updateOne(
        { accountId: order.userId },
        { $inc: { 'assets.$[elem].balance': order.allowance } },
        { arrayFilters: [{ 'elem.token': token._id }] }
    );
};

const cancel = async (req: AppRequest): Promise<any> => {
    try {
        let args = parseArgs(req, 'cancel');

        const order = await CainanceSequel.Order.findOne({
            where: {
                id: args.orderId,
                userId: req.user.id,
                active: true,
            },
            include: [
                {
                    model: CainanceSequel.Pair,
                    required: true,
                },
            ],
        });
        if (order) {
            returnTokenBalance(order);

            await order.update({ active: false, status: 'CANCELED' });
            // order.update({ active: false, status: 'CANCELED' })

            const request = serializeCancelRequest(
                order.orderSide,
                order.price,
                order.id
            );
            produceMessage(`${args.pair}-orders`, request, args.pair);
        }

        return { success: true };
    } catch (err) {
        throw new Error(err.message);
    }
};

export default cancel;
