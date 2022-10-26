"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const getRefPoint_1 = tslib_1.__importDefault(require("./getRefPoint"));
const getUser_1 = tslib_1.__importDefault(require("./getUser"));
const getRefAction = (req) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { user: { _id: userId }, } = req;
    const [user, refPoint] = yield Promise.all([
        (0, getUser_1.default)(userId),
        (0, getRefPoint_1.default)(userId),
    ]);
    return {
        user,
        refPoint,
    };
});
exports.default = getRefAction;
//# sourceMappingURL=getRef.action.js.map