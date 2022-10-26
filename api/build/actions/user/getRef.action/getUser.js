"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const db_1 = require("@cainance/db");
const getUser = (userId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const select = 'email refCode';
    return db_1.models.user.findById(userId).select(select);
});
exports.default = getUser;
//# sourceMappingURL=getUser.js.map