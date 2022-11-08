"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFundingWallet = exports.getSpotWallet = void 0;
const tslib_1 = require("tslib");
const db_1 = require("@cainance/db");
const validate_1 = require("./validate");
const getSpotWallet = (req) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const args = (0, validate_1.validateWallet)(req.query);
    const { count, rows } = yield db_1.CainanceSequel.SpotWallet.findAndCountAll({
        where: {
            accountId: req.user._id.toString(),
        },
        attributes: ['token', 'amount', 'availableAmount', 'inOrderAmount'],
        order: [['amount', 'DESC'], ['token']],
        limit: args.limit,
        offset: args.limit * (args.page - 1),
    });
    return { count, rows };
});
exports.getSpotWallet = getSpotWallet;
const getFundingWallet = (req) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const args = (0, validate_1.validateWallet)(req.query);
    const { count, rows } = yield db_1.CainanceSequel.FundingWallet.findAndCountAll({
        where: {
            accountId: req.user._id.toString(),
        },
        attributes: ['token', 'amount'],
        order: [['amount', 'DESC'], ['token']],
        limit: args.limit,
        offset: args.limit * (args.page - 1),
    });
    return { count, rows };
});
exports.getFundingWallet = getFundingWallet;
//# sourceMappingURL=getWallet.js.map