"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const userActions_1 = tslib_1.__importDefault(require("../actions/user/userActions"));
const userRoutes = [
    {
        path: '/user/ref',
        method: 'get',
        action: userActions_1.default.getRef,
        auth: true,
    },
    {
        path: '/user/2fa/generate',
        method: 'get',
        action: userActions_1.default.generate2FaQr,
        auth: true,
    },
    {
        path: '/user/2fa/save',
        method: 'post',
        action: userActions_1.default.save2FaQr,
        auth: true,
    },
    {
        path: '/user/spot_wallet',
        method: 'get',
        action: userActions_1.default.getSpotWallet,
        auth: true,
    },
];
exports.default = userRoutes;
//# sourceMappingURL=user.routes.js.map