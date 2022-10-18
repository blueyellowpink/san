"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cainance_1 = require("cainance");
const generateOtp = () => {
    const characters = '0123456789';
    const len = 6;
    return Array.from(new Array(len))
        .map(_ => {
        return Math.floor(Math.random() * characters.length);
    })
        .join('');
};
const createOtp = ({ id, email, phone }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    yield cainance_1.CainanceMongo.Otp.deleteMany({
        userId: id,
    });
    const newOtp = new cainance_1.CainanceMongo.Otp({
        userId: id,
        mail: generateOtp(),
        phone: generateOtp(),
        twoFa: '',
        status: 'created',
        type: 'register',
    });
    yield newOtp.save();
    return true;
});
exports.default = createOtp;
//# sourceMappingURL=createOtp.js.map