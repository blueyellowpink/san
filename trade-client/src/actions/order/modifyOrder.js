"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const parseArgs_1 = tslib_1.__importDefault(require("./parseArgs"));
const cainance_1 = require("cainance");
const protobufHelpers_1 = require("utils/protobufHelpers");
const kafka_1 = require("kafka");
const modify = (req) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        let args = (0, parseArgs_1.default)(req, 'modify');
        const order = yield cainance_1.CainanceSequel.Order.findOne({
            where: {
                id: args.orderId,
                userId: req.user.id,
                active: true,
            },
        });
        if (order) {
            const orderJson = order.toJSON();
            yield order.update({
                price: args.newPrice,
                amount: args.newAmount,
            });
            const request = (0, protobufHelpers_1.serializeModifyRequest)(orderJson, args.newPrice, args.newAmount);
            (0, kafka_1.produceMessage)(`${args.pair}-orders`, request, args.pair);
        }
        return {
            status: 'ok',
        };
    }
    catch (err) {
        throw new Error(err.message);
    }
});
exports.default = modify;
//# sourceMappingURL=modifyOrder.js.map