"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTradingPairList = void 0;
const tslib_1 = require("tslib");
const db_1 = require("@cainance/db");
const getTradingPairList = (req) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const pairs = yield db_1.models.TradingPair.find()
            .sort({ marketCap: -1 })
            .select('-_id -token -createdAt -updatedAt -__v')
            .lean();
        if (pairs) {
            return pairs;
        }
        return [];
    }
    catch (err) {
        throw new Error(err.message);
    }
});
exports.getTradingPairList = getTradingPairList;
/* export const getFavouritePairs = async (req): Promise<string[] | []> => {
    try {
        let pairs = await CainanceSequel.Pair.findAll({
            where: {
                isFavourite: true,
            }
        });

        if (pairs) {
            return pairs.map(pair => pair.toJSON());
        }

        return [];
    } catch (err) {
        throw new Error(err.message);
    }
}; */
//# sourceMappingURL=getTradingPair.js.map