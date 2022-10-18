"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = void 0;
const tslib_1 = require("tslib");
const appConfig_1 = tslib_1.__importDefault(require("appConfig"));
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const verifyJwt = bearerToken => {
    const token = bearerToken.substring(7);
    return jsonwebtoken_1.default.verify(token, appConfig_1.default.jwtPrivateKey);
};
exports.verifyJwt = verifyJwt;
//# sourceMappingURL=jwt.js.map