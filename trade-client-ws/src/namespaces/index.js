"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNamespaces = void 0;
const tslib_1 = require("tslib");
const cainance_1 = require("cainance");
const orderbook_1 = require("./orderbook");
const tick_1 = require("./tick");
const candlestick_1 = require("./candlestick");
const createNamespace = (io, pair) => {
    const nsp = io.of('/' + pair);
    nsp.on('connection', socket => {
        console.log(`${socket.nsp.name} connected`);
        (0, orderbook_1.orderbookCache)(socket, pair);
        (0, tick_1.tickCache)(socket, pair);
        socket.on('candlesticks', (message, ack) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const candlesticks = yield (0, candlestick_1.candlestickCache)(socket, pair, message.timeWindow);
            ack(candlesticks);
        }));
        socket.on('disconnect', () => {
            console.log('disconnected');
        });
    });
    /* nsp.use((socket, next) => {
        next()
    }) */
};
const createNamespaces = (io) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const pairs = yield cainance_1.CainanceSequel.Pair.findAll();
    // console.log(pairs)
    pairs.map(pair => createNamespace(io, pair.slug));
});
exports.createNamespaces = createNamespaces;
//# sourceMappingURL=index.js.map