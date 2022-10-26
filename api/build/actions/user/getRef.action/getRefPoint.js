"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const db_1 = require("@cainance/db");
const getRefPoint = (userId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const where = { refer: userId };
    return db_1.models.user.countDocuments(where);
});
exports.default = getRefPoint;
//# sourceMappingURL=getRefPoint.js.map