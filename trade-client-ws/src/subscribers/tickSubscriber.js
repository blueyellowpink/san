"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTickSubscriber = void 0;
const cainance_1 = require("cainance");
const createTickSubscriber = (subscriber, nsp, pair) => {
    subscriber.subscribe(`${pair}-ticks`, data => {
        const ticks = cainance_1.proto.Ticks.deserializeBinary(data).toObject();
        nsp.emit('ticks', ticks);
    }, true);
};
exports.createTickSubscriber = createTickSubscriber;
//# sourceMappingURL=tickSubscriber.js.map