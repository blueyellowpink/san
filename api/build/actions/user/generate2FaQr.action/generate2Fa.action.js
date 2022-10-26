"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const db_1 = require("@cainance/db");
const node_2fa_1 = tslib_1.__importDefault(require("node-2fa"));
const globalConfig_1 = tslib_1.__importDefault(require("../../../globalConfig"));
const jwt_1 = require("../../../libs/jwt/jwt");
const getUser = (userId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.models.user.findById(userId);
    if (!user)
        throw new Error('Invalid user');
    if (user.twoFactorSecret)
        throw new Error('2FA generated');
    return user;
});
const generate2FaAction = (req) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { user: { _id: userId }, } = req;
    const user = yield getUser(userId);
    const { secret, qr } = node_2fa_1.default.generateSecret({
        name: globalConfig_1.default.appName,
        account: user.email,
    });
    const secretJwt = (0, jwt_1.signJwtToken)({
        secret,
        userId,
    });
    return { secret, qr, secretJwt };
});
exports.default = generate2FaAction;
//# sourceMappingURL=generate2Fa.action.js.map