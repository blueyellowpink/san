"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TokenSchema = new mongoose_1.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    symbol: {
        type: String,
        unique: true,
        required: true,
    },
    chains: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'chains',
            required: true,
        },
    ],
    icon: {
        type: String,
        default: '',
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
const Token = (0, mongoose_1.model)('Token', TokenSchema, 'tokens');
exports.default = Token;
//# sourceMappingURL=token.model.js.map