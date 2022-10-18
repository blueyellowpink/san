import AppRequest from 'interfaces/AppRequest';
import parseArgs from './parseArgs';
import { OrderSide, OrderType } from './orderEnums';
import OrderResponse from './orderResponse';
import { CainanceSequel, CainanceMongo } from 'cainance';
import { serializeAddRequest } from 'utils/protobufHelpers';
import { produceMessage } from 'kafka';

const getToken = async (accountId: number, token: string) => {
    const wallet = await CainanceMongo.SpotWallet.findOne({ accountId })
        .populate({
            path: 'assets',
            populate: {
                path: 'token',
                model: CainanceMongo.Token,
                select: 'name',
            },
        })
        .lean();
    const asset = wallet.assets.filter(asset => asset.token.name === token)[0];
    return {
        id: asset.token._id,
        name: asset.token.name,
        balance: asset.balance,
    };
};

const deductTokenBalance = async (
    accountId: number,
    allowance: number,
    tokenId
): Promise<void> => {
    await CainanceMongo.SpotWallet.updateOne(
        { accountId },
        { $inc: { 'assets.$[elem].balance': allowance * -1 } },
        { arrayFilters: [{ 'elem.token': tokenId }] }
    );
};

const getInitAllowance = (
    token,
    amount: number,
    price: number,
    orderType: string,
    orderSide: OrderSide
) => {
    if (orderType === 'LIMIT') {
        const initAllowance =
            orderSide == OrderSide.ASK ? amount : amount * price;
        if (token.balance < initAllowance)
            throw new Error(`insufficient ${token.name.toUpperCase()}`);
        return initAllowance;
    }

    if (orderType === 'MARKET') {
        return token.balance;
    }
};

const addOrder = async (
    req: AppRequest,
    orderSide: OrderSide
): Promise<OrderResponse> => {
    try {
        let args = parseArgs(req, 'add');

        const [crypto, fiat] = args.pair.split('-');
        const token = await getToken(
            req.user.id,
            orderSide == OrderSide.ASK ? crypto : fiat
        );
        const initAllowance = getInitAllowance(
            token,
            args.amount,
            args.price,
            args.orderType,
            orderSide
        );
        await deductTokenBalance(req.user.id, initAllowance, token.id);

        const pair = await CainanceSequel.Pair.findOne({
            where: { slug: args.pair },
        });

        let order = await CainanceSequel.Order.create({
            userId: req.user.id,
            pairId: pair.id,
            initAllowance,
            allowance: initAllowance,
            price: args.price,
            initAmount: args.amount,
            amount: args.amount,
            orderType: args.orderType,
            orderSide: orderSide == OrderSide.BID ? 'BID' : 'ASK',
        });
        order = order.toJSON();
        order.pair = args.pair;

        const request = serializeAddRequest(order);
        produceMessage(`${args.pair}-orders`, request, args.pair);

        let resp: OrderResponse = {
            id: order.id,
            pair: args.pair,
            price: args.price,
            initAmount: args.amount,
            amount: args.amount,
            orderType: args.orderType,
            orderSide: orderSide == OrderSide.BID ? 'BID' : 'ASK',
            createdAt: order.createdAt,
        };
        return resp;
    } catch (err) {
        throw new Error(err.message);
    }
};

const addFutureOrder = async (
    req: AppRequest,
    orderSide
): Promise<OrderResponse> => {
    try {
        let args = parseArgs(req, 'addFuture');
    } catch (err) {
        throw new Error(err.message);
    }
};

export const buy = async (req: AppRequest): Promise<OrderResponse> => {
    return await addOrder(req, OrderSide.BID);
};

export const sell = async (req: AppRequest): Promise<OrderResponse> => {
    return await addOrder(req, OrderSide.ASK);
};

export const long = async (req: AppRequest): Promise<OrderResponse> => {
    return await addFutureOrder(req, OrderSide.BID);
};

export const short = async (req: AppRequest): Promise<OrderResponse> => {
    return await addFutureOrder(req, OrderSide.ASK);
};
