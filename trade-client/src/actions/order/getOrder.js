"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderHistory = exports.getOpenOrders = void 0;
const tslib_1 = require("tslib");
const parseArgs_1 = tslib_1.__importDefault(require("./parseArgs"));
const cainance_1 = require("cainance");
const getOpenOrders = (req) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        let args = (0, parseArgs_1.default)(req, 'get');
        const pair = yield cainance_1.CainanceSequel.Pair.findOne({
            where: { slug: args.pair },
        });
        let orders = yield cainance_1.CainanceSequel.Order.findAll({
            where: {
                userId: req.user.id,
                pairId: pair.id,
                active: true,
            },
            attributes: {
                exclude: ['active', 'userId', 'status'],
            },
        });
        if (orders) {
            return orders.map(order => order.toJSON());
        }
        return [];
    }
    catch (err) {
        throw new Error(err.message);
    }
});
exports.getOpenOrders = getOpenOrders;
const getOrderHistory = (req) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        let args = (0, parseArgs_1.default)(req, 'get');
        const pair = yield cainance_1.CainanceSequel.Pair.findOne({
            where: { slug: args.pair },
        });
        let orders = yield cainance_1.CainanceSequel.Order.findAll({
            where: {
                userId: req.user.id,
                pairId: pair.id,
                active: false,
            },
            attributes: {
                exclude: ['active', 'userId'],
            },
        });
        if (orders) {
            return orders.map(order => order.toJSON());
        }
        return [];
    }
    catch (err) {
        throw new Error(err.message);
    }
});
exports.getOrderHistory = getOrderHistory;
//# sourceMappingURL=getOrder.js.map