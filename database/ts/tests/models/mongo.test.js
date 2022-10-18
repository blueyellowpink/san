"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const src_1 = tslib_1.__importDefault(require("../../src"));
test('create a user', () => {
    const user = new src_1.default.user({
        email: 'email',
        password: '123',
        refCode: 'qwe123',
        twoFactorSecret: '2fa'
    });
    expect(user.email).toBe('email');
});
//# sourceMappingURL=mongo.test.js.map