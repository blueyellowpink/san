"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenSchema = void 0;
const mongoose_1 = require("mongoose");
exports.TokenSchema = new mongoose_1.Schema({
    name: String,
    symbol: String,
    chains: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Chain',
        },
    ],
});
const Token = (0, mongoose_1.model)('Token', exports.TokenSchema, 'tokens');
exports.default = Token;
//# sourceMappingURL=Token.js.map