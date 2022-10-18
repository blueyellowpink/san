"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFavouritePairs = exports.getPairs = void 0;
const tslib_1 = require("tslib");
const cainance_1 = require("cainance");
const getPairs = (req) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        let pairs = yield cainance_1.CainanceSequel.Pair.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        });
        if (pairs) {
            return pairs.map(pair => pair.toJSON());
        }
        return [];
    }
    catch (err) {
        throw new Error(err.message);
    }
});
exports.getPairs = getPairs;
const getFavouritePairs = (req) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        let pairs = yield cainance_1.CainanceSequel.Pair.findAll({
            where: {
                isFavourite: true,
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        });
        if (pairs) {
            return pairs.map(pair => pair.toJSON());
        }
        return [];
    }
    catch (err) {
        throw new Error(err.message);
    }
});
exports.getFavouritePairs = getFavouritePairs;
//# sourceMappingURL=get.js.map