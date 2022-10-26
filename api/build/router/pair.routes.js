"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getTradingPair_1 = require("../actions/pair/getTradingPair");
const routes = [
    {
        path: '/pair/list',
        method: 'get',
        action: getTradingPair_1.getTradingPairList,
    },
];
exports.default = routes;
//# sourceMappingURL=pair.routes.js.map