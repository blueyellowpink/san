"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.short = exports.long = exports.sell = exports.buy = void 0;
const tslib_1 = require("tslib");
const parseArgs_1 = tslib_1.__importDefault(require("./parseArgs"));
const orderEnums_1 = require("./orderEnums");
const cainance_1 = require("cainance");
const protobufHelpers_1 = require("utils/protobufHelpers");
const kafka_1 = require("kafka");
const getToken = (accountId, token) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const wallet = yield cainance_1.CainanceMongo.SpotWallet.findOne({ accountId })
        .populate({
        path: 'assets',
        populate: {
            path: 'token',
            model: cainance_1.CainanceMongo.Token,
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
});
const deductTokenBalance = (accountId, allowance, tokenId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    yield cainance_1.CainanceMongo.SpotWallet.updateOne({ accountId }, { $inc: { 'assets.$[elem].balance': allowance * -1 } }, { arrayFilters: [{ 'elem.token': tokenId }] });
});
const getInitAllowance = (token, amount, price, orderType, orderSide) => {
    if (orderType === 'LIMIT') {
        const initAllowance = orderSide == orderEnums_1.OrderSide.ASK ? amount : amount * price;
        if (token.balance < initAllowance)
            throw new Error(`insufficient ${token.name.toUpperCase()}`);
        return initAllowance;
    }
    if (orderType === 'MARKET') {
        return token.balance;
    }
};
const addOrder = (req, orderSide) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        let args = (0, parseArgs_1.default)(req, 'add');
        const [crypto, fiat] = args.pair.split('-');
        const token = yield getToken(req.user.id, orderSide == orderEnums_1.OrderSide.ASK ? crypto : fiat);
        const initAllowance = getInitAllowance(token, args.amount, args.price, args.orderType, orderSide);
        yield deductTokenBalance(req.user.id, initAllowance, token.id);
        const pair = yield cainance_1.CainanceSequel.Pair.findOne({
            where: { slug: args.pair },
        });
        let order = yield cainance_1.CainanceSequel.Order.create({
            userId: req.user.id,
            pairId: pair.id,
            initAllowance,
            allowance: initAllowance,
            price: args.price,
            initAmount: args.amount,
            amount: args.amount,
            orderType: args.orderType,
            orderSide: orderSide == orderEnums_1.OrderSide.BID ? 'BID' : 'ASK',
        });
        order = order.toJSON();
        order.pair = args.pair;
        const request = (0, protobufHelpers_1.serializeAddRequest)(order);
        (0, kafka_1.produceMessage)(`${args.pair}-orders`, request, args.pair);
        let resp = {
            id: order.id,
            pair: args.pair,
            price: args.price,
            initAmount: args.amount,
            amount: args.amount,
            orderType: args.orderType,
            orderSide: orderSide == orderEnums_1.OrderSide.BID ? 'BID' : 'ASK',
            createdAt: order.createdAt,
        };
        return resp;
    }
    catch (err) {
        throw new Error(err.message);
    }
});
const addFutureOrder = (req, orderSide) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        let args = (0, parseArgs_1.default)(req, 'addFuture');
    }
    catch (err) {
        throw new Error(err.message);
    }
});
const buy = (req) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield addOrder(req, orderEnums_1.OrderSide.BID);
});
exports.buy = buy;
const sell = (req) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield addOrder(req, orderEnums_1.OrderSide.ASK);
});
exports.sell = sell;
const long = (req) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield addFutureOrder(req, orderEnums_1.OrderSide.BID);
});
exports.long = long;
const short = (req) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield addFutureOrder(req, orderEnums_1.OrderSide.ASK);
});
exports.short = short;
//# sourceMappingURL=addOrder.js.map