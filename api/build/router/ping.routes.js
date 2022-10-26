"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const pingActions_1 = tslib_1.__importDefault(require("../actions/ping/pingActions"));
const pingRoutes = [
    {
        path: '/',
        method: 'get',
        action: pingActions_1.default.hello,
    },
    {
        path: '*',
        method: 'get',
        action: pingActions_1.default.hello,
    },
];
exports.default = pingRoutes;
//# sourceMappingURL=ping.routes.js.map