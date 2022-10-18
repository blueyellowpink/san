"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpSchema = void 0;
const mongoose_1 = require("mongoose");
exports.OtpSchema = new mongoose_1.Schema({
    userId: Number,
    mail: String,
    phone: String,
    twoFa: String,
    updatedAt: Number,
    status: {
        type: String,
        enum: ['created', 'solved', 'failed'],
    },
    type: {
        type: String,
        enum: ['login', 'register'],
    },
});
const Otp = (0, mongoose_1.model)('Otp', exports.OtpSchema, 'otps');
exports.default = Otp;
//# sourceMappingURL=Otp.js.map