"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const joi_1 = tslib_1.__importDefault(require("joi"));
const login2FaFormSchema = joi_1.default.object({
    loginToken: joi_1.default.string().not(''),
    twoFactorToken: joi_1.default.string().not(''),
});
const validateInput = req => {
    const { body } = req;
    const input = {
        loginToken: body.loginToken ? (body.loginToken + '').trim() : '',
        twoFactorToken: body.twoFactorToken
            ? (body.twoFactorToken + '').trim()
            : '',
    };
    const validate = login2FaFormSchema.validate(input);
    if (validate.error)
        throw new Error('Invalid input');
    return input;
};
exports.default = validateInput;
//# sourceMappingURL=validateInput.js.map