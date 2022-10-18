"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const utils_1 = require("../utils");
const isLoggedIn = (req) => !!req.headers.authorization;
const isAuthenticated = (req, res, next) => {
    if (!isLoggedIn(req)) {
        return next(new Error('you are not logged in'));
    }
    try {
        const { id } = (0, utils_1.verifyJwt)(req.headers.authorization);
        if (id) {
            if (req.user)
                req.user.id = id;
            else
                req.user = { id };
            return next();
        }
        return next(new Error('you are not logged in'));
    }
    catch (err) {
        if (err instanceof jsonwebtoken_1.TokenExpiredError)
            return next(new Error('token expired'));
        else
            throw err;
    }
};
exports.default = isAuthenticated;
//# sourceMappingURL=auth.js.map