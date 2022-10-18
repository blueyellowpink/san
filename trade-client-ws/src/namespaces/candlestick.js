"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.candlestickCache = void 0;
const tslib_1 = require("tslib");
const cache_1 = require("../cache");
const cainance_1 = require("cainance");
const redis_1 = require("redis");
const candlestickCache = (socket, pair, timeWindow) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const key = `${timeWindow}-candlesticks`;
    const data = yield cache_1.redis.hGet((0, redis_1.commandOptions)({ returnBuffers: true }), key, pair);
    const candlesticks = cainance_1.proto.Candlesticks.deserializeBinary(data).toObject();
    // socket.emit(key, candlesticks)
    return candlesticks;
});
exports.candlestickCache = candlestickCache;
//# sourceMappingURL=candlestick.js.map