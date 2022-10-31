"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const db_1 = require("@cainance/db");
const createSpotWallet = (accountId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokens = yield db_1.models.Token.find().select('symbol').lean();
        if (!tokens || tokens.length == 0) {
            throw new Error('createSpotWallet failed: no tokens');
        }
        const wallets = tokens.map(token => {
            return {
                accountId,
                token: token.symbol,
            };
        });
        yield db_1.CainanceSequel.SpotWallet.bulkCreate(wallets);
    }
    catch (error) {
        throw new Error('createSpotWallet failed: ' + error.message);
    }
});
exports.default = createSpotWallet;
//# sourceMappingURL=createSpotWallet.js.map