"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ask = exports.buy = void 0;
const tslib_1 = require("tslib");
const protobuf_1 = require("@cainance/protobuf");
const addOrder = (req, orderSide) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    /* try {
        const wallets = await CainanceSequel.SpotWallet.findAll({
            where: {
                accountId: req.user._id.toString()
            },
            attributes: ['token', 'amount'],
            order: [
                ['amount', 'DESC'],
                ['token']
            ]
        })

        if (wallets) {
            return wallets.map(wallet => wallet.toJSON() as Asset)
        }

        return []
    } catch (err) {
        throw new Error(err.message)
    } */
    return {};
});
const buy = (req) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield addOrder(req, protobuf_1.proto.OrderSide.BID);
});
exports.buy = buy;
const ask = (req) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield addOrder(req, protobuf_1.proto.OrderSide.ASK);
});
exports.ask = ask;
//# sourceMappingURL=placeOrder.js.map