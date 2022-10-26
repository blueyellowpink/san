"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const db_1 = require("@cainance/db");
const md5_1 = tslib_1.__importDefault(require("md5"));
const createRandomString_1 = tslib_1.__importDefault(require("../../../libs/random/createRandomString"));
const createRefCode = (generatedCodes) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    let code = (0, createRandomString_1.default)().toUpperCase();
    while (generatedCodes.includes(code)) {
        code = (0, createRandomString_1.default)().toUpperCase();
    }
    const refCode = code;
    const sameRefCodeAccount = yield db_1.models.user
        .findOne({ refCode: refCode })
        .select('_id');
    if (sameRefCodeAccount)
        return createRefCode([...generatedCodes, refCode]);
    return refCode;
});
const createAccount = ({ email, password }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const refCode = yield createRefCode([]);
    const newAccount = new db_1.models.user({
        email: email,
        password: (0, md5_1.default)(password),
        refCode: refCode,
    });
    yield newAccount.save();
    return newAccount;
});
exports.default = createAccount;
//# sourceMappingURL=createAccount.js.map