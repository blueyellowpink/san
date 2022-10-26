"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwtToken = exports.signJwtToken = void 0;
const tslib_1 = require("tslib");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const globalConfig_1 = tslib_1.__importDefault(require("../../globalConfig"));
const signJwtToken = data => jsonwebtoken_1.default.sign(data, globalConfig_1.default.jwt.secret);
exports.signJwtToken = signJwtToken;
const verifyJwtToken = token => {
    try {
        return jsonwebtoken_1.default.verify(token, globalConfig_1.default.jwt.secret);
    }
    catch (e) {
        return null;
    }
};
exports.verifyJwtToken = verifyJwtToken;
//# sourceMappingURL=jwt.js.map