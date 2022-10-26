"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const validateInput_1 = tslib_1.__importDefault(require("./validateInput"));
const jwt_1 = require("../../../libs/jwt/jwt");
const db_1 = require("@cainance/db");
const node_2fa_1 = tslib_1.__importDefault(require("node-2fa"));
const getUser = (userId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.models.user.findById(userId);
    if (!user)
        throw new Error('Invalid user');
    if (!user.twoFactorSecret)
        throw new Error('Invalid user');
    return user;
});
const verifyToken = (user, token) => {
    const result = node_2fa_1.default.verifyToken(user.twoFactorSecret, token);
    if (!(result === null || result === void 0 ? void 0 : result.delta))
        throw new Error('Invalid token');
};
const twoFactorLoginAction = (req) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const input = (0, validateInput_1.default)(req);
    const decoded = (0, jwt_1.verifyJwtToken)(input.loginToken);
    if (!decoded)
        throw new Error('Invalid user');
    const user = yield getUser(decoded._id);
    verifyToken(user, input.twoFactorToken);
    const response = {
        _id: user._id,
        email: user.email,
    };
    const jwt = (0, jwt_1.signJwtToken)(response);
    return { account: response, token: jwt };
});
exports.default = twoFactorLoginAction;
//# sourceMappingURL=twoFactorLogin.action.js.map