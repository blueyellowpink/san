"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const authActions_1 = tslib_1.__importDefault(require("../actions/auth/authActions"));
const authRoutes = [
    {
        path: '/auth/sign-in',
        method: 'post',
        action: authActions_1.default.login,
    },
    {
        path: '/auth/sign-up',
        method: 'post',
        action: authActions_1.default.register,
    },
    {
        path: '/auth/sign-in/2fa',
        method: 'post',
        action: authActions_1.default.twoFactorLogin,
    },
];
exports.default = authRoutes;
//# sourceMappingURL=auth.routes.js.map