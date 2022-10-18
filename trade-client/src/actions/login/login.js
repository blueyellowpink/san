"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const appConfig_1 = tslib_1.__importDefault(require("appConfig"));
const loginParseArgs_1 = tslib_1.__importDefault(require("actions/login/loginParseArgs"));
const cainance_1 = require("cainance");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const createOtp_1 = tslib_1.__importDefault(require("./createOtp"));
const login = (req) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const args = yield (0, loginParseArgs_1.default)(req);
    let user = yield cainance_1.CainanceSequel.Account.findOne({
        attributes: ['id', 'email', 'phone'],
        where: {
            email: args.email,
            phone: args.phoneNumber,
        },
    });
    if (!user)
        throw new Error('Invalid user');
    user = user.toJSON();
    yield (0, createOtp_1.default)(user);
    const token = jsonwebtoken_1.default.sign(user, appConfig_1.default.jwtPrivateKey, { expiresIn: '3d' });
    const response = { user, token };
    return response;
});
exports.default = login;
//# sourceMappingURL=login.js.map