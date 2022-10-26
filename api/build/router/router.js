"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const authActions_1 = tslib_1.__importDefault(require("../actions/auth/authActions"));
const processor_1 = require("../libs/processor/processor");
const routes_1 = tslib_1.__importDefault(require("./routes"));
const router = express_1.default.Router();
routes_1.default.forEach(route => {
    const { method, action, path, auth, middlewares } = route;
    const routesMiddlewares = [
        ...(auth ? [(0, processor_1.processMiddleware)(authActions_1.default.isUser)] : []),
        ...(Array.isArray(middlewares)
            ? middlewares.map(processor_1.processMiddleware)
            : []),
    ];
    router[method.toLocaleLowerCase()](path, routesMiddlewares, (0, processor_1.processAction)(action));
});
exports.default = router;
//# sourceMappingURL=router.js.map