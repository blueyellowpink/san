"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmail = void 0;
const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const isEmail = inp => {
    return emailRegex.test(inp);
};
exports.isEmail = isEmail;
//# sourceMappingURL=regex.js.map