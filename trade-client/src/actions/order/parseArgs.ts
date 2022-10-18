import AppRequest from 'interfaces/AppRequest';
import { OrderSide, OrderType } from 'cainance';
import Joi from 'joi';

function getEnumValues<T extends string | number>(e: any): T[] {
    return typeof e === 'object' ? Object.values(e) : [];
}

const orderTypes = getEnumValues(OrderType);
const orderSides = getEnumValues(OrderSide);

const marginTypes = ['cross', 'isolated'];
const Margin = Joi.string()
    .valid(...marginTypes)
    .required();

const pairs = ['sol-usdt', 'bnb-usdt', 'eth-usdt'];
const Pair = Joi.string()
    .valid(...pairs)
    .required();

const addOrderArgs = Joi.object({
    pair: Pair,
    price: Joi.number().greater(0).required(),
    amount: Joi.number().greater(0).required(),
    orderType: Joi.string()
        .valid(...orderTypes)
        .required(),
});

const cancelOrderArgs = Joi.object({
    pair: Pair,
    orderId: Joi.number().integer().positive().required(),
});

const modifyOrderArgs = Joi.object({
    pair: Pair,
    orderId: Joi.number().integer().positive().required(),
    newPrice: Joi.number().greater(0),
    newAmount: Joi.number().greater(0),
});

const getOrderArgs = Joi.object({
    pair: Pair,
});

const addFutureOrderArgs = Joi.object({
    pair: Pair,
    price: Joi.number().greater(0).required(),
    amount: Joi.number().greater(0).required(),
    orderType: Joi.string()
        .valid(...orderTypes)
        .required(),
    leverage: Joi.number().min(1).max(50).required(),
    margin: Margin,
});

const parseArgs = (req: AppRequest, action: string) => {
    let ret = { value: null, error: null };
    if (action == 'add') {
        ret = addOrderArgs.validate(req.body);
    } else if (action == 'cancel') {
        ret = cancelOrderArgs.validate(req.body);
    } else if (action == 'modify') {
        ret = modifyOrderArgs.validate(req.body);
    } else if (action == 'get') {
        ret = getOrderArgs.validate(req.query);
    } else if (action == 'addFuture') {
        ret = addFutureOrderArgs.validate(req.query);
    } else {
        throw new Error('no action');
    }

    if (ret.error) {
        throw new Error(ret.error.details[0].message);
    }

    return ret.value;
};

export default parseArgs;
