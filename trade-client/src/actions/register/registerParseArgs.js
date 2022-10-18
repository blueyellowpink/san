"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const regex_1 = require("libs/regex");
const localeKeys_1 = tslib_1.__importDefault(require("locales/localeKeys"));
const cainance_1 = require("cainance");
const md5_1 = tslib_1.__importDefault(require("md5"));
const checkExistedUser = ({ email, phoneNumber }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const existed = yield cainance_1.CainanceSequel.Account.findOne({
        where: {
            email: email,
            phone: phoneNumber,
        },
    });
    return !!existed;
});
const registerParseArgs = (req) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { body, t } = req;
    const email = body.email
        ? (body.email + '').trim().toLowerCase()
        : '';
    const phoneNumber = body.phoneNumber ? body.phoneNumber + '' : '';
    const password = body.password ? (0, md5_1.default)(body.password + '') : '';
    if (!password)
        throw new Error(t(localeKeys_1.default.register.passwordIsNotValid));
    if (!(0, regex_1.isEmail)(email))
        throw new Error(t(localeKeys_1.default.register.emailIsNotValid));
    const args = {
        email: email,
        phoneNumber: phoneNumber,
        password: password,
    };
    const existed = yield checkExistedUser({
        email: args.email,
        phoneNumber: args.phoneNumber,
    });
    if (existed)
        throw new Error(t(localeKeys_1.default.register.existedUser));
    req.args = args;
    return args;
});
exports.default = registerParseArgs;
//# sourceMappingURL=registerParseArgs.js.map