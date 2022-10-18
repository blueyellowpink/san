"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSide = exports.OrderType = exports.KafkaConfig = exports.Influx = exports.Topic = exports.proto = exports.CainanceMongo = exports.CainanceSequel = exports.CainanceConfig = void 0;
const tslib_1 = require("tslib");
// kafka
const kafka_1 = tslib_1.__importDefault(require("./kafka"));
exports.KafkaConfig = kafka_1.default;
// kafka topic
const topics_1 = tslib_1.__importDefault(require("./topics"));
exports.Topic = topics_1.default;
// db
const mysql_1 = tslib_1.__importDefault(require("./db/mysql"));
exports.CainanceSequel = mysql_1.default;
const mongo_1 = tslib_1.__importDefault(require("./db/mongo"));
exports.CainanceMongo = mongo_1.default;
const influx_1 = tslib_1.__importDefault(require("./db/influx"));
exports.Influx = influx_1.default;
// proto
const order_pb_1 = tslib_1.__importDefault(require("./proto/order_pb"));
const trade_pb_1 = tslib_1.__importDefault(require("./proto/trade_pb"));
const request_pb_1 = tslib_1.__importDefault(require("./proto/request_pb"));
const orderbook_pb_1 = tslib_1.__importDefault(require("./proto/orderbook_pb"));
const tick_pb_1 = tslib_1.__importDefault(require("./proto/tick_pb"));
const candlestick_pb_1 = tslib_1.__importDefault(require("./proto/candlestick_pb"));
// config
const config_1 = tslib_1.__importDefault(require("./config"));
exports.CainanceConfig = config_1.default;
// protobuf
const proto = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, order_pb_1.default), trade_pb_1.default), request_pb_1.default), orderbook_pb_1.default), tick_pb_1.default), candlestick_pb_1.default);
exports.proto = proto;
var OrderType;
(function (OrderType) {
    OrderType[OrderType["LIMIT"] = 0] = "LIMIT";
    OrderType[OrderType["MARKET"] = 1] = "MARKET";
    OrderType[OrderType["STOP_LIMIT"] = 2] = "STOP_LIMIT";
    OrderType[OrderType["OCO"] = 3] = "OCO";
})(OrderType = exports.OrderType || (exports.OrderType = {}));
var OrderSide;
(function (OrderSide) {
    OrderSide[OrderSide["ASK"] = 0] = "ASK";
    OrderSide[OrderSide["BID"] = 1] = "BID";
})(OrderSide = exports.OrderSide || (exports.OrderSide = {}));
//# sourceMappingURL=index.js.map