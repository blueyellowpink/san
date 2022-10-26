"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jwt_1 = require("../../../libs/jwt/jwt");
const findAccount_1 = tslib_1.__importDefault(require("./findAccount"));
const validateInput_1 = tslib_1.__importDefault(require("./validateInput"));
const loginAction = (req) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const input = (0, validateInput_1.default)(req);
    const account = yield (0, findAccount_1.default)(input);
    if (account.twoFactorSecret) {
        const twoFactorToken = (0, jwt_1.signJwtToken)({ _id: account._id });
        return { twoFactorToken, twoFactorRequire: true };
    }
    const response = {
        _id: account._id,
        email: account.email,
    };
    const jwt = (0, jwt_1.signJwtToken)(response);
    return { account: response, token: jwt };
});
exports.default = loginAction;
//# sourceMappingURL=login.action.js.map