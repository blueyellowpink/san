"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processAction = void 0;
const tslib_1 = require("tslib");
const processAction = action => (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield action(req, res);
        const bodyResponse = {
            success: true,
            data: response,
            message: '',
            code: 'OK',
        };
        return res.json(bodyResponse);
    }
    catch (e) {
        const { message } = e;
        console.log(e);
        const bodyResponse = {
            success: false,
            data: null,
            message,
            code: 'ERR',
        };
        return res.json(bodyResponse);
    }
});
exports.processAction = processAction;
//# sourceMappingURL=actionHelpers.js.map