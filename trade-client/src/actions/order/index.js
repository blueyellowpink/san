"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.short = exports.long = exports.getOrderHistory = exports.getOpenOrders = exports.modify = exports.cancel = exports.sell = exports.buy = void 0;
const tslib_1 = require("tslib");
const addOrder_1 = require("./addOrder");
Object.defineProperty(exports, "buy", { enumerable: true, get: function () { return addOrder_1.buy; } });
Object.defineProperty(exports, "sell", { enumerable: true, get: function () { return addOrder_1.sell; } });
Object.defineProperty(exports, "long", { enumerable: true, get: function () { return addOrder_1.long; } });
Object.defineProperty(exports, "short", { enumerable: true, get: function () { return addOrder_1.short; } });
const cancelOrder_1 = tslib_1.__importDefault(require("./cancelOrder"));
exports.cancel = cancelOrder_1.default;
const modifyOrder_1 = tslib_1.__importDefault(require("./modifyOrder"));
exports.modify = modifyOrder_1.default;
const getOrder_1 = require("./getOrder");
Object.defineProperty(exports, "getOpenOrders", { enumerable: true, get: function () { return getOrder_1.getOpenOrders; } });
Object.defineProperty(exports, "getOrderHistory", { enumerable: true, get: function () { return getOrder_1.getOrderHistory; } });
//# sourceMappingURL=index.js.map