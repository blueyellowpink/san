"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AssetSchema = new mongoose_1.Schema({
    token: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Token',
        required: true,
    },
    balance: {
        type: mongoose_1.Schema.Types.Decimal128,
        default: 0.0,
    },
}, { _id: false });
const SpotWalletSchema = new mongoose_1.Schema({
    accountId: {
        type: Number,
        unique: true,
        required: true,
    },
    assets: {
        type: [AssetSchema],
        required: true,
    },
    keypair: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Keypair',
        required: true,
    },
});
const SpotWallet = (0, mongoose_1.model)('SpotWallet', SpotWalletSchema, 'spot_wallets');
exports.default = SpotWallet;
//# sourceMappingURL=Wallet.js.map