"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChainList = void 0;
const tslib_1 = require("tslib");
const db_1 = require("@cainance/db");
const getChainList = (req) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const chains = yield db_1.models.Chain.find()
            .select('-_id name symbol type')
            .lean();
        if (chains) {
            return chains;
        }
        return [];
    }
    catch (err) {
        throw new Error(err.message);
    }
});
exports.getChainList = getChainList;
//# sourceMappingURL=getChain.js.map