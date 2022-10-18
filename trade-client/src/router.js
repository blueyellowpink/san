"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const actionHelpers_1 = require("libs/actionHelpers");
const routes_1 = tslib_1.__importDefault(require("routes"));
const router = (0, express_1.Router)();
const routeRegister = route => {
    const { path, action, method, middleware } = route;
    if (middleware) {
        router[method](path, middleware, (0, actionHelpers_1.processAction)(action));
    }
    else {
        router[method](path, (0, actionHelpers_1.processAction)(action));
    }
};
routes_1.default.map(routeRegister);
exports.default = router;
//# sourceMappingURL=router.js.map