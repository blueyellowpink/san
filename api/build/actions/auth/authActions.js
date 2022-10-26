"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const isUser_middleware_1 = tslib_1.__importDefault(require("./isUser.middleware/isUser.middleware"));
const login_action_1 = tslib_1.__importDefault(require("./login.action/login.action"));
const register_action_1 = tslib_1.__importDefault(require("./register.action/register.action"));
const twoFactorLogin_action_1 = tslib_1.__importDefault(require("./twoFactorLogin.action/twoFactorLogin.action"));
const authActions = {
    login: login_action_1.default,
    register: register_action_1.default,
    twoFactorLogin: twoFactorLogin_action_1.default,
    isUser: isUser_middleware_1.default,
};
exports.default = authActions;
//# sourceMappingURL=authActions.js.map