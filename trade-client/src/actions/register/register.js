"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const appConfig_1 = tslib_1.__importDefault(require("appConfig"));
const createUser_1 = tslib_1.__importDefault(require("actions/register/createUser"));
const registerParseArgs_1 = tslib_1.__importDefault(require("actions/register/registerParseArgs"));
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const register = (req) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const args = yield (0, registerParseArgs_1.default)(req);
    const userInfo = {
        email: args === null || args === void 0 ? void 0 : args.email,
        phoneNumber: args === null || args === void 0 ? void 0 : args.phoneNumber,
        password: args === null || args === void 0 ? void 0 : args.password,
    };
    const user = yield (0, createUser_1.default)(userInfo);
    const userPublicInfo = {
        id: user.id,
        email: user.email,
        password: user.password,
    };
    const token = jsonwebtoken_1.default.sign(userPublicInfo, appConfig_1.default.jwtPrivateKey);
    const response = {
        token: token,
        user: userPublicInfo,
    };
    return response;
});
exports.default = register;
//# sourceMappingURL=register.js.map