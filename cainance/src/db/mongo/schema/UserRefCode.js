"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRefCodeSchema = void 0;
const mongoose_1 = require("mongoose");
exports.UserRefCodeSchema = new mongoose_1.Schema({
    userId: Number,
    refCode: String,
});
const UserRefCode = (0, mongoose_1.model)('UserRefCode', exports.UserRefCodeSchema, 'userRefCodes');
exports.default = UserRefCode;
//# sourceMappingURL=UserRefCode.js.map