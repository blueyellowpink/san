"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSpotWallet = void 0;
const tslib_1 = require("tslib");
const cainance_1 = require("cainance");
const getSpotWallet = (req) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const wallet = yield cainance_1.CainanceMongo.SpotWallet.findOne({
        accountId: req.user.id,
    })
        .populate({
        path: 'assets',
        populate: {
            path: 'token',
            model: cainance_1.CainanceMongo.Token,
            select: '-_id name chains',
            populate: {
                path: 'chains',
                model: cainance_1.CainanceMongo.Chain,
                select: '-_id name type',
            },
        },
    })
        .populate({
        path: 'keypair',
        select: '-_id -accountId',
    })
        .select('-_id assets keypair')
        .lean();
    if (wallet) {
        const spotWallets = wallet.assets.map(asset => {
            const publicKey = {};
            asset.token.chains.map(chain => {
                publicKey[chain.name] = wallet.keypair[chain.type].publicKey;
            });
            return {
                token: asset.token.name,
                balance: asset.balance.toString(),
                publicKey,
            };
        });
        return spotWallets;
    }
    return [];
});
exports.getSpotWallet = getSpotWallet;
//# sourceMappingURL=index.js.map