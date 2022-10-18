"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrderbookSubscriber = void 0;
const cainance_1 = require("cainance");
const createOrderbookSubscriber = (subscriber, nsp, pair) => {
    subscriber.subscribe(`${pair}-orderbook`, data => {
        const orderbook = cainance_1.proto.OrderBook.deserializeBinary(data).toObject();
        nsp.emit('orderbook', orderbook);
    }, true);
};
exports.createOrderbookSubscriber = createOrderbookSubscriber;
//# sourceMappingURL=orderbookSubscriber.js.map