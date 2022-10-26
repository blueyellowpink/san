"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jwt_1 = require("../../../libs/jwt/jwt");
const throwUnauthorized = () => {
    const e = new Error('You need to login');
    e.status = 403;
    throw e;
};
const isUserMiddleware = (req) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const token = ((req.headers['Authorization'] || req.headers['authorization']) + '').split(' ')[1];
    if (!token)
        return throwUnauthorized();
    const decoded = (0, jwt_1.verifyJwtToken)(token);
    if (!(decoded === null || decoded === void 0 ? void 0 : decoded._id))
        return throwUnauthorized();
    req.user = decoded;
});
exports.default = isUserMiddleware;
//# sourceMappingURL=isUser.middleware.js.map