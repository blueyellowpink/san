"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tickCache = void 0;
const cache_1 = require("../cache");
const cainance_1 = require("cainance");
const redis_1 = require("redis");
const tickCache = (socket, pair) => {
    cache_1.redis
        .hGet((0, redis_1.commandOptions)({ returnBuffers: true }), 'ticks', pair)
        .then(data => {
        const ticks = cainance_1.proto.Ticks.deserializeBinary(data).toObject();
        socket.emit('ticks', ticks);
    });
};
exports.tickCache = tickCache;
//# sourceMappingURL=tick.js.map