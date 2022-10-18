"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const parseArgs_1 = tslib_1.__importDefault(require("./parseArgs"));
const cainance_1 = require("cainance");
const protobufHelpers_1 = require("utils/protobufHelpers");
const kafka_1 = require("kafka");
const returnTokenBalance = (order) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const [crypto, fiat] = order.pair.slug.split('-');
    /* TODO: use cache to get token id */
    const token = yield cainance_1.CainanceMongo.Token.findOne({
        name: order.orderSide === 'ASK' ? crypto : fiat,
    })
        .select('_id')
        .lean();
    yield cainance_1.CainanceMongo.SpotWallet.updateOne({ accountId: order.userId }, { $inc: { 'assets.$[elem].balance': order.allowance } }, { arrayFilters: [{ 'elem.token': token._id }] });
});
const cancel = (req) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        let args = (0, parseArgs_1.default)(req, 'cancel');
        const order = yield cainance_1.CainanceSequel.Order.findOne({
            where: {
                id: args.orderId,
                userId: req.user.id,
                active: true,
            },
            include: [
                {
                    model: cainance_1.CainanceSequel.Pair,
                    required: true,
                },
            ],
        });
        if (order) {
            returnTokenBalance(order);
            yield order.update({ active: false, status: 'CANCELED' });
            // order.update({ active: false, status: 'CANCELED' })
            const request = (0, protobufHelpers_1.serializeCancelRequest)(order.orderSide, order.price, order.id);
            (0, kafka_1.produceMessage)(`${args.pair}-orders`, request, args.pair);
        }
        return { success: true };
    }
    catch (err) {
        throw new Error(err.message);
    }
});
exports.default = cancel;
//# sourceMappingURL=cancelOrder.js.map