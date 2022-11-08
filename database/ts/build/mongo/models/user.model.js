"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importStar(require("mongoose"));
const collectionNames_1 = tslib_1.__importDefault(require("../collections/collectionNames"));
const KeypairSchema = new mongoose_1.Schema({
    publicKey: String,
    privateKey: String,
    chainType: String,
}, { _id: false });
const UserSchema = new mongoose_1.default.Schema({
    email: String,
    password: String,
    refCode: String,
    status: {
        type: String,
        enum: ['created', 'confirmed', 'restricted'],
        default: 'created',
    },
    refer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: collectionNames_1.default.user,
    },
    confirmedAt: { type: Number, default: 0 },
    keypair: [KeypairSchema],
    twoFactorSecret: String,
    createdAt: {
        type: Number,
        default: Date.now,
    },
    updatedAt: {
        type: Number,
        default: Date.now,
    },
});
UserSchema.index({ email: 1 });
UserSchema.index({ 'keypair.publicKey': 1 });
UserSchema.index({ 'keypair.chainType': 1 });
const UserModel = mongoose_1.default.model(collectionNames_1.default.user, UserSchema);
exports.default = UserModel;
//# sourceMappingURL=user.model.js.map