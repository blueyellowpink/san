"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConsumers = void 0;
const tslib_1 = require("tslib");
const orderbookConsumer_1 = require("./orderbookConsumer");
const cainance_1 = require("cainance");
const createConsumer = (io, pair) => {
    const namespace = io.of('/' + pair);
    (0, orderbookConsumer_1.createOrderbookConsumer)(namespace, pair);
};
const createConsumers = (io) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const pairs = yield cainance_1.CainanceSequel.Pair.findAll();
    pairs.map(pair => createConsumer(io, pair.slug));
});
exports.createConsumers = createConsumers;
//# sourceMappingURL=index.js.map