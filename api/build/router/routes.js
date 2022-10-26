"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const auth_routes_1 = tslib_1.__importDefault(require("./auth.routes"));
const ping_routes_1 = tslib_1.__importDefault(require("./ping.routes"));
const user_routes_1 = tslib_1.__importDefault(require("./user.routes"));
const chain_routes_1 = tslib_1.__importDefault(require("./chain.routes"));
const pair_routes_1 = tslib_1.__importDefault(require("./pair.routes"));
const routes = [
    ...auth_routes_1.default,
    ...user_routes_1.default,
    ...chain_routes_1.default,
    ...pair_routes_1.default,
    ...ping_routes_1.default,
];
exports.default = routes;
//# sourceMappingURL=routes.js.map