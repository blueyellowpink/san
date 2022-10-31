"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateWallet = void 0;
const tslib_1 = require("tslib");
const joi_1 = tslib_1.__importDefault(require("joi"));
const getWalletArgs = joi_1.default.object({
    page: joi_1.default.number().greater(0).required(),
    limit: joi_1.default.number().greater(0).default(10).required(),
});
const validateWallet = query => {
    const args = getWalletArgs.validate(query);
    if (args.error) {
        throw new Error(args.error.details[0].message);
    }
    return args.value;
};
exports.validateWallet = validateWallet;
//# sourceMappingURL=validate.js.map