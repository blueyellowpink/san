"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderbookCache = void 0;
const cache_1 = require("../cache");
const cainance_1 = require("cainance");
const redis_1 = require("redis");
const orderbookCache = (socket, pair) => {
    cache_1.redis
        .hGet((0, redis_1.commandOptions)({ returnBuffers: true }), 'orderbook', pair)
        .then(data => {
        const cache = cainance_1.proto.OrderBook.deserializeBinary(data).toObject();
        socket.emit('orderbook', cache);
    });
};
exports.orderbookCache = orderbookCache;
//# sourceMappingURL=orderbook.js.map