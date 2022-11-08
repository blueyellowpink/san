"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancel = exports.sell = exports.buy = void 0;
const tslib_1 = require("tslib");
const db_1 = require("@cainance/db");
const protobuf_1 = require("@cainance/protobuf");
const validate_1 = require("./validate");
const kafka_1 = require("../../../libs/kafka");
const getInitAllowance = (base, currentAmount, amount, price, orderType, orderSide) => {
    if (orderType === protobuf_1.proto.OrderType.LIMIT) {
        const initAllowance = orderSide === protobuf_1.proto.OrderSide.ASK ? amount : amount * price;
        if (currentAmount < initAllowance)
            throw new Error(`insufficient ${base}`);
        return initAllowance;
    }
    if (orderType === protobuf_1.proto.OrderType.MARKET) {
        return currentAmount;
    }
};
const addOrder = (req, orderSide) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const args = yield (0, validate_1.validateAddOrder)(req.body);
    const [base, quote] = args.pair.split('/');
    try {
        const transaction = yield db_1.CainanceSequel.sequelize.transaction((t) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const wallet = yield db_1.CainanceSequel.SpotWallet.findOne({
                where: {
                    accountId: req.user._id,
                    token: orderSide == protobuf_1.proto.OrderSide.ASK ? base : quote,
                },
                attributes: ['amount'],
            });
            if (!wallet) {
                throw new Error('Error place order');
            }
            const initAllowance = getInitAllowance(base, parseFloat(wallet.amount), args.amount, args.price, args.orderType, orderSide);
            const order = yield db_1.CainanceSequel.Order.create({
                tradingPair: args.pair,
                accountId: req.user._id,
                initAllowance: initAllowance,
                allowance: initAllowance,
                price: args.price,
                initAmount: args.amount,
                amount: args.amount,
                orderSide,
                orderType: args.orderType,
            }, {
                transaction: t,
            });
            const orderPb = new protobuf_1.proto.Order();
            orderPb.setOrderId(order.id);
            orderPb.setAccountId(req.user._id);
            orderPb.setAllowance(order.initAllowance);
            orderPb.setPair(order.tradingPair);
            orderPb.setPrice(order.price);
            orderPb.setAmount(order.amount);
            orderPb.setSide(order.orderSide);
            orderPb.setType(order.orderType);
            const bytes = orderPb.serializeBinary();
            yield kafka_1.producer.send({
                topic: `${args.pair
                    .toLowerCase()
                    .replace('/', '-')}-orders`,
                messages: [
                    {
                        key: args.pair,
                        value: Buffer.from(bytes),
                    },
                ],
            });
            return order;
        }));
        return transaction;
    }
    catch (err) {
        throw new Error(err.message);
    }
});
const buy = (req) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield addOrder(req, protobuf_1.proto.OrderSide.BID);
});
exports.buy = buy;
const sell = (req) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield addOrder(req, protobuf_1.proto.OrderSide.ASK);
});
exports.sell = sell;
const cancel = (req, orderSide) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const args = yield (0, validate_1.validateCancelOrder)(req.body);
    return {};
});
exports.cancel = cancel;
//# sourceMappingURL=placeOrder.js.map