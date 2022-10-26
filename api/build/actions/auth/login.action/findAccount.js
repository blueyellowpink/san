"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const db_1 = require("@cainance/db");
const md5_1 = tslib_1.__importDefault(require("md5"));
const checkStatus = account => {
    // if (account.status === 'created')
    //     throw new Error('Please confirm your account')
    if (account.status === 'restricted')
        throw new Error('Your account has been restricted');
    return account.status === 'confirmed';
};
const checkPassword = (account, password) => {
    const hashedPassword = (0, md5_1.default)(password);
    if (hashedPassword !== account.password)
        throw new Error('Invalid password');
};
const findAccount = ({ email, password }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const where = { email };
    const account = yield db_1.models.user.findOne(where);
    if (!account)
        throw new Error('Account not found');
    checkStatus(account);
    checkPassword(account, password);
    return account;
});
exports.default = findAccount;
//# sourceMappingURL=findAccount.js.map