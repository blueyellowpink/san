"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const db_1 = require("@cainance/db");
const getRefer = ({ refCode }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const where = { refCode };
    const select = `_id refCode`;
    const refer = yield db_1.models.user.findOne(where).select(select);
    if (!refer)
        return null;
    return refer;
});
exports.default = getRefer;
//# sourceMappingURL=getRefer.js.map