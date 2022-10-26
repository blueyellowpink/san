"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getChain_1 = require("../actions/chain/getChain");
const routes = [
    {
        path: '/chain/list',
        method: 'get',
        action: getChain_1.getChainList,
    },
];
exports.default = routes;
//# sourceMappingURL=chain.routes.js.map