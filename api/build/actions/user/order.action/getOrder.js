"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrder = void 0;
const tslib_1 = require("tslib");
const db_1 = require("@cainance/db");
const validate_1 = require("./validate");
const getOrder = (req) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const args = yield (0, validate_1.validateGetOrder)(req.query);
    const { rows, count } = yield db_1.CainanceSequel.Order.findAndCountAll({
        where: {
            accountId: req.user._id.toString(),
            tradingPair: args.pair,
            active: args.active,
        },
        attributes: {
            exclude: ['accountId'],
        },
        limit: args.limit,
        offset: args.limit * (args.page - 1),
    });
    return { rows, count };
});
exports.getOrder = getOrder;
//# sourceMappingURL=getOrder.js.map