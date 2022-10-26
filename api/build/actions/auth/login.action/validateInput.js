"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const joi_1 = tslib_1.__importDefault(require("joi"));
const loginFormSchema = joi_1.default.object({
    email: joi_1.default.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
    }),
    password: joi_1.default.string().pattern(/^[a-zA-Z0-9]{3,30}$/),
});
const validateInput = req => {
    const { body } = req;
    const input = {
        email: body.email ? (body.email + '').trim().toLowerCase() : '',
        password: body.password,
    };
    const validate = loginFormSchema.validate(input);
    if (validate.error)
        throw new Error('Invalid input');
    return input;
};
exports.default = validateInput;
//# sourceMappingURL=validateInput.js.map