"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cainance_1 = require("cainance");
const joi_1 = tslib_1.__importDefault(require("joi"));
function getEnumValues(e) {
    return typeof e === 'object' ? Object.values(e) : [];
}
const orderTypes = getEnumValues(cainance_1.OrderType);
const orderSides = getEnumValues(cainance_1.OrderSide);
const marginTypes = ['cross', 'isolated'];
const Margin = joi_1.default.string()
    .valid(...marginTypes)
    .required();
const pairs = ['sol-usdt', 'bnb-usdt', 'eth-usdt'];
const Pair = joi_1.default.string()
    .valid(...pairs)
    .required();
const addOrderArgs = joi_1.default.object({
    pair: Pair,
    price: joi_1.default.number().greater(0).required(),
    amount: joi_1.default.number().greater(0).required(),
    orderType: joi_1.default.string()
        .valid(...orderTypes)
        .required(),
});
const cancelOrderArgs = joi_1.default.object({
    pair: Pair,
    orderId: joi_1.default.number().integer().positive().required(),
});
const modifyOrderArgs = joi_1.default.object({
    pair: Pair,
    orderId: joi_1.default.number().integer().positive().required(),
    newPrice: joi_1.default.number().greater(0),
    newAmount: joi_1.default.number().greater(0),
});
const getOrderArgs = joi_1.default.object({
    pair: Pair,
});
const addFutureOrderArgs = joi_1.default.object({
    pair: Pair,
    price: joi_1.default.number().greater(0).required(),
    amount: joi_1.default.number().greater(0).required(),
    orderType: joi_1.default.string()
        .valid(...orderTypes)
        .required(),
    leverage: joi_1.default.number().min(1).max(50).required(),
    margin: Margin,
});
const parseArgs = (req, action) => {
    let ret = { value: null, error: null };
    if (action == 'add') {
        ret = addOrderArgs.validate(req.body);
    }
    else if (action == 'cancel') {
        ret = cancelOrderArgs.validate(req.body);
    }
    else if (action == 'modify') {
        ret = modifyOrderArgs.validate(req.body);
    }
    else if (action == 'get') {
        ret = getOrderArgs.validate(req.query);
    }
    else if (action == 'addFuture') {
        ret = addFutureOrderArgs.validate(req.query);
    }
    else {
        throw new Error('no action');
    }
    if (ret.error) {
        throw new Error(ret.error.details[0].message);
    }
    return ret.value;
};
exports.default = parseArgs;
//# sourceMappingURL=parseArgs.js.map