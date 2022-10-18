"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = void 0;
const redis_1 = require("redis");
const cainance_1 = require("cainance");
exports.redis = (0, redis_1.createClient)({
    url: process.env.NODE_ENV === 'prod'
        ? `redis://default:${cainance_1.CainanceConfig.REDIS_PASSWORD}@${cainance_1.CainanceConfig.REDIS_MASTER}:6379`
        : 'redis://default:redispassword@127.0.0.1:6379',
});
exports.redis.on('error', err => {
    console.log(err.message);
});
//# sourceMappingURL=index.js.map