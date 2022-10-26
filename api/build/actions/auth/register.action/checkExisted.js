"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const db_1 = require("@cainance/db");
const checkExsited = ({ email }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const where = { email };
    const select = `_id email`;
    const found = yield db_1.models.user.findOne(where).select(select);
    if (!found)
        return;
    throw new Error('Existed account');
});
exports.default = checkExsited;
//# sourceMappingURL=checkExisted.js.map