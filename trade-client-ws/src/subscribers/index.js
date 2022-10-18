"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSubscribers = exports.subscriber = void 0;
const tslib_1 = require("tslib");
const cainance_1 = require("cainance");
const cache_1 = require("../cache");
const tickSubscriber_1 = require("./tickSubscriber");
const candlestickSubscriber_1 = require("./candlestickSubscriber");
const orderbookSubscriber_1 = require("./orderbookSubscriber");
exports.subscriber = cache_1.redis.duplicate();
const createSubscriber = (io, pair) => {
    const namespace = io.of('/' + pair);
    (0, tickSubscriber_1.createTickSubscriber)(exports.subscriber, namespace, pair);
    (0, candlestickSubscriber_1.createCandlestickSubscriber)(exports.subscriber, namespace, pair);
    (0, orderbookSubscriber_1.createOrderbookSubscriber)(exports.subscriber, namespace, pair);
};
const createSubscribers = (io) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const pairs = yield cainance_1.CainanceSequel.Pair.findAll();
    pairs.map(pair => createSubscriber(io, pair.slug));
});
exports.createSubscribers = createSubscribers;
//# sourceMappingURL=index.js.map