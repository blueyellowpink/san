"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCandlestickSubscriber = void 0;
const cainance_1 = require("cainance");
const createCandlestickSubscriber = (subscriber, nsp, pair) => {
    const timeWindows = [
        '1m',
        '3m',
        '5m',
        '15m',
        '30m',
        '1h',
        '2h',
        '4h',
        '6h',
        '8h',
        '12h',
        '1d',
        '3d',
        '1w',
        '1M',
    ];
    for (const timeWindow of timeWindows) {
        subscriber.subscribe(`${pair}-${timeWindow}-candlesticks`, data => {
            const candlesticks = cainance_1.proto.Candlesticks.deserializeBinary(data).toObject();
            nsp.emit(`${timeWindow}-candlesticks`, candlesticks);
        }, true);
    }
};
exports.createCandlestickSubscriber = createCandlestickSubscriber;
//# sourceMappingURL=candlestickSubscriber.js.map