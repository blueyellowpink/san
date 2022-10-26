"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const joi_1 = tslib_1.__importDefault(require("joi"));
const registerFormSchema = joi_1.default.object({
    email: joi_1.default.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
    }),
    password: joi_1.default.string().pattern(/^[a-zA-Z0-9]{3,30}$/),
    refCode: joi_1.default.string()
        .pattern(/^[A-Z0-9]{6}$/)
        .optional(),
});
const isRefCodeInvalid = validate => {
    const { details } = validate.error;
    return details.some(error => error.context.key === 'refCode');
};
const validateInput = req => {
    const { body } = req;
    const input = {
        email: body.email ? (body.email + '').trim().toLowerCase() : '',
        password: body.password,
        refCode: body.refCode ? (body.refCode + '').trim().toUpperCase() : '',
    };
    const validate = registerFormSchema.validate(input);
    if (!validate.error)
        return input;
    if (isRefCodeInvalid(validate))
        return Object.assign(Object.assign({}, input), { refCode: '' });
    if (validate.error)
        throw new Error('Invalid input');
};
exports.default = validateInput;
//# sourceMappingURL=validateInput.js.map