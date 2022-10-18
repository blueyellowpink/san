"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeypairSchema = void 0;
const mongoose_1 = require("mongoose");
const PairSchema = new mongoose_1.Schema({
    publicKey: {
        type: String,
        unique: true,
        required: true,
    },
    privateKey: {
        type: String,
    },
}, { _id: false });
exports.KeypairSchema = new mongoose_1.Schema({
    accountId: {
        type: Number,
        unique: true,
    },
    evm: PairSchema,
    solana: PairSchema,
});
const Keypair = (0, mongoose_1.model)('Keypair', exports.KeypairSchema, 'keypairs');
exports.default = Keypair;
//# sourceMappingURL=Keypair.js.map