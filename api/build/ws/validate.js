"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateStream = void 0;
const tslib_1 = require("tslib");
const joi_1 = tslib_1.__importDefault(require("joi"));
const streamArgs = joi_1.default.object({
    symbol: joi_1.default.string(),
    timeWindow: joi_1.default.string().valid('1m', '3m', '5m', '15m', '30m', '1h', '2h', '4h', '6h', '8h', '12h', '1d', '3d', '1w', '1M'),
});
const validateStream = params => {
    const args = streamArgs.validate(params);
    if (args.error) {
        throw new Error(args.error.details[0].message);
    }
    return args.value;
};
exports.validateStream = validateStream;
//# sourceMappingURL=validate.js.map