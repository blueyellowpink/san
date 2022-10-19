"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = require("mongoose");
const collectionNames_1 = tslib_1.__importDefault(require("../collections/collectionNames"));
const createModel_1 = tslib_1.__importDefault(require("../tool/createModel"));
const KeypairSchema = new mongoose_1.Schema({
    publicKey: String,
    privateKey: String,
    path: String,
}, { _id: false });
const UserModel = (0, createModel_1.default)({
    collectionName: collectionNames_1.default.user,
    schema: {
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
        keypair: {
            type: Map,
            of: KeypairSchema,
        },
        twoFactorSecret: String,
    },
    index: {
        email: -1,
    },
});
exports.default = UserModel;
//# sourceMappingURL=user.model.js.map