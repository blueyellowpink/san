"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const getRef_action_1 = tslib_1.__importDefault(require("./getRef.action/getRef.action"));
const generate2Fa_action_1 = tslib_1.__importDefault(require("./generate2FaQr.action/generate2Fa.action"));
const save2FaQr_action_1 = tslib_1.__importDefault(require("./save2FaQr.action/save2FaQr.action"));
const getWallet_1 = require("./wallet.action/getWallet");
const order_action_1 = require("./order.action");
const userActions = {
    getRef: getRef_action_1.default,
    generate2FaQr: generate2Fa_action_1.default,
    save2FaQr: save2FaQr_action_1.default,
    getSpotWallet: getWallet_1.getSpotWallet,
    buy: order_action_1.buy,
    sell: order_action_1.sell,
    cancel: order_action_1.cancel,
    getOrder: order_action_1.getOrder,
};
exports.default = userActions;
//# sourceMappingURL=userActions.js.map