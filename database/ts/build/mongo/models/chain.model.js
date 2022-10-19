"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ChainSchema = new mongoose_1.Schema({
    name: {
        type: String,
        unique: true,
    },
    symbol: String,
    type: {
        type: String,
        enum: ['evm', 'solana', 'near', 'dot'],
        required: true,
    },
    createdAt: {
        type: Number,
        default: Date.now,
    },
    updatedAt: {
        type: Number,
        default: Date.now,
    },
});
const Chain = (0, mongoose_1.model)('Chain', exports.ChainSchema, 'chains');
exports.default = Chain;
//# sourceMappingURL=chain.model.js.map