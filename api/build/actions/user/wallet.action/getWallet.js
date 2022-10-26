"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSpotWallet = void 0;
const tslib_1 = require("tslib");
const db_1 = require("@cainance/db");
const getSpotWallet = (req) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const wallets = yield db_1.CainanceSequel.SpotWallet.findAll({
            where: {
                accountId: req.user._id.toString()
            },
            attributes: ['token', 'amount'],
            order: [
                ['amount', 'DESC'],
                ['token']
            ]
        });
        if (wallets) {
            return wallets.map(wallet => wallet.toJSON());
        }
        return [];
    }
    catch (err) {
        throw new Error(err.message);
    }
});
exports.getSpotWallet = getSpotWallet;
//# sourceMappingURL=getWallet.js.map