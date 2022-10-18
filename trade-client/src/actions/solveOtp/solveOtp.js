"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cainance_1 = require("cainance");
const appConfig_1 = tslib_1.__importDefault(require("../../appConfig"));
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const solveOtp = (req) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const userId = Number.isNaN(req.body.userId) ? 0 : +req.body.userId;
    const mail = req.body.mail + '';
    const phone = req.body.phone + '';
    const [user, otp] = yield Promise.all([
        cainance_1.CainanceSequel.Account.findOne({
            where: { id: userId },
            attributes: ['id', 'email', 'phone'],
            raw: true,
        }),
        cainance_1.CainanceMongo.Otp.findOne({
            userId,
            type: 'register',
            status: 'created',
        }),
    ]);
    if (!user || !otp)
        throw new Error('Invalid user');
    if (otp.phone !== phone || otp.mail !== mail)
        throw new Error('Invalid OTP');
    const token = jsonwebtoken_1.default.sign(user, appConfig_1.default.jwtPrivateKey, { expiresIn: '3d' });
    return {
        token: token,
    };
});
exports.default = solveOtp;
//# sourceMappingURL=solveOtp.js.map