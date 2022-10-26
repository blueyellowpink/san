"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processAction = exports.processMiddleware = void 0;
const tslib_1 = require("tslib");
const processMiddleware = middleware => (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        yield middleware(req, res);
        next();
    }
    catch (e) {
        console.error(e);
        const response = {
            success: false,
            data: null,
            message: (e === null || e === void 0 ? void 0 : e.message) || e || 'Something went wrong',
        };
        const status = e.status || 200;
        res.status(status).json(response);
    }
});
exports.processMiddleware = processMiddleware;
const processAction = action => (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield action(req, res);
        const response = {
            success: true,
            data: data !== undefined ? data : null,
            message: '',
        };
        res.json(response);
    }
    catch (e) {
        console.error(e);
        const status = e.status || 200;
        const response = {
            success: false,
            data: null,
            message: (e === null || e === void 0 ? void 0 : e.message) || e || 'Something went wrong',
        };
        res.status(status).json(response);
    }
});
exports.processAction = processAction;
//# sourceMappingURL=processor.js.map