"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const loginParseArgs = (req) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const args = {
        email: '',
        phoneNumber: '',
        password: '',
    };
    const { body } = req;
    const email = body.email ? (body.email + '').trim() : '';
    const phoneNumber = body.phoneNumber ? (body.phoneNumber + '').trim() : '';
    const password = body.password ? body.password + '' : '';
    if (!email || !phoneNumber || !password)
        throw new Error('Invalid args');
    args.email = email;
    args.phoneNumber = phoneNumber;
    args.password = password;
    return args;
});
exports.default = loginParseArgs;
//# sourceMappingURL=loginParseArgs.js.map