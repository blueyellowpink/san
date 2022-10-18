"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dist_1 = require("../dist");
const order = new dist_1.proto.Order();
console.log({ order: order.toObject() });
console.log(dist_1.proto.OrderSide);
console.log(dist_1.proto.OrderType);
const trade = new dist_1.proto.Trade();
console.log({ trade: trade.toObject() });
const matchedPair = new dist_1.proto.MatchedPair();
console.log({ matchedPair: matchedPair.toObject() });
const matchedOrder = new dist_1.proto.MatchedOrder();
console.log({ matchedOrder: matchedOrder.toObject() });
const book = new dist_1.proto.OrderBook();
console.log({ book: book.toObject() });
const pair = new dist_1.proto.PriceSizePair();
console.log({ pair: pair.toObject() });
const add = new dist_1.proto.Add();
console.log({ add: add.toObject() });
const cancel = new dist_1.proto.Cancel();
console.log({ cancel: cancel.toObject() });
const modify = new dist_1.proto.Modify();
console.log({ modify: modify.toObject() });
const request = new dist_1.proto.Request();
console.log({ request: request.toObject() });
// tick proto
const tick = new dist_1.proto.Tick();
console.log({ tick: tick.toObject() });
const ticks = new dist_1.proto.Ticks();
console.log({ ticks: ticks.toObject() });
// candlestick proto
const candlestick = new dist_1.proto.Candlestick();
console.log({ candlestick: candlestick.toObject() });
const candlesticks = new dist_1.proto.Candlesticks();
console.log({ candlesticks: candlestick.toObject() });
//# sourceMappingURL=proto.js.map