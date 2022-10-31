"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.proto = void 0;
const tslib_1 = require("tslib");
// protobuf
const order_pb_1 = tslib_1.__importDefault(require("./proto/order_pb"));
const trade_pb_1 = tslib_1.__importDefault(require("./proto/trade_pb"));
const request_pb_1 = tslib_1.__importDefault(require("./proto/request_pb"));
const orderbook_pb_1 = tslib_1.__importDefault(require("./proto/orderbook_pb"));
const tick_pb_1 = tslib_1.__importDefault(require("./proto/tick_pb"));
const candlestick_pb_1 = tslib_1.__importDefault(require("./proto/candlestick_pb"));
const proto = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, order_pb_1.default), trade_pb_1.default), request_pb_1.default), orderbook_pb_1.default), tick_pb_1.default), candlestick_pb_1.default);
exports.proto = proto;
//# sourceMappingURL=index.js.map