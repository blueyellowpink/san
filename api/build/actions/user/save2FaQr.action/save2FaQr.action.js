"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jwt_1 = require("../../../libs/jwt/jwt");
const db_1 = require("@cainance/db");
const save2FaQrAction = (req) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { user: { _id: userId }, body: { token }, } = req;
    const decodedToken = (0, jwt_1.verifyJwtToken)(token);
    if (!decodedToken)
        throw new Error('Invalid token');
    if ((decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.userId) !== userId)
        throw new Error('Invalid token');
    const user = yield db_1.models.user.findById(userId);
    if (!user)
        throw new Error('Invalid user');
    user.twoFactorSecret = decodedToken.secret;
    yield user.save();
    return true;
});
exports.default = save2FaQrAction;
//# sourceMappingURL=save2FaQr.action.js.map