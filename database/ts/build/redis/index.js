"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const redis = (0, redis_1.createClient)({
    url: process.env.NODE_ENV === 'prod'
        ? `redis://default:${process.env.REDIS_PASSWORD}@${process.env.REDIS_MASTER}:6379`
        : 'redis://localhost:6379',
});
redis.on('error', err => {
    console.log(err.message);
});
exports.default = redis;
//# sourceMappingURL=index.js.map