"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const getRef_action_1 = tslib_1.__importDefault(require("./getRef.action/getRef.action"));
const generate2Fa_action_1 = tslib_1.__importDefault(require("./generate2FaQr.action/generate2Fa.action"));
const save2FaQr_action_1 = tslib_1.__importDefault(require("./save2FaQr.action/save2FaQr.action"));
const getWallet_1 = require("./wallet.action/getWallet");
const userActions = {
    getRef: getRef_action_1.default,
    generate2FaQr: generate2Fa_action_1.default,
    save2FaQr: save2FaQr_action_1.default,
    getSpotWallet: getWallet_1.getSpotWallet,
};
exports.default = userActions;
//# sourceMappingURL=userActions.js.map