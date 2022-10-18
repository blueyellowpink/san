"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const login_1 = tslib_1.__importDefault(require("actions/login/login"));
const ping_1 = tslib_1.__importDefault(require("actions/ping/ping"));
const register_1 = tslib_1.__importDefault(require("actions/register/register"));
const order_1 = require("actions/order");
const pair_1 = require("actions/pair");
const wallet_1 = require("actions/wallet");
const middleware_1 = require("./middleware");
const solveOtp_1 = tslib_1.__importDefault(require("./actions/solveOtp/solveOtp"));
const routes = [
    { path: '/', action: ping_1.default, method: 'get' },
    { path: '/account/register', action: register_1.default, method: 'post' },
    { path: '/account/login/otp', action: solveOtp_1.default, method: 'post' },
    { path: '/account/login', action: login_1.default, method: 'post' },
    { path: '/order/buy', action: order_1.buy, method: 'post', middleware: middleware_1.auth },
    { path: '/order/sell', action: order_1.sell, method: 'post', middleware: middleware_1.auth },
    {
        path: '/order/cancel',
        action: order_1.cancel,
        method: 'delete',
        middleware: middleware_1.auth,
    },
    // { path: '/order/modify', action: modify, method: 'put', middleware: auth },
    {
        path: '/order/get',
        action: order_1.getOpenOrders,
        method: 'get',
        middleware: middleware_1.auth,
    },
    {
        path: '/order/history',
        action: order_1.getOrderHistory,
        method: 'get',
        middleware: middleware_1.auth,
    },
    { path: '/pair/get', action: pair_1.getPairs, method: 'get' },
    { path: '/pair/getFavourite', action: pair_1.getFavouritePairs, method: 'get' },
    {
        path: '/wallet/spot',
        action: wallet_1.getSpotWallet,
        method: 'get',
        middleware: middleware_1.auth,
    },
];
exports.default = routes;
//# sourceMappingURL=routes.js.map