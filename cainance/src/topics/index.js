"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toTradeTopic = (pair) => {
    return `${pair}-trades`;
};
const toOrderbookTopic = (pair) => {
    return `${pair}-orderbook-data`;
};
exports.default = { toTradeTopic, toOrderbookTopic };
//# sourceMappingURL=index.js.map