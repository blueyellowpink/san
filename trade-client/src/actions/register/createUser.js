"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cainance_1 = require("cainance");
const utils_1 = require("../../utils");
const createKeypair = (accountId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const keypair = new cainance_1.CainanceMongo.Keypair({
        accountId,
        evm: (0, utils_1.genKeypair)(accountId, 'evm'),
        solana: (0, utils_1.genKeypair)(accountId, 'solana'),
    });
    yield keypair.save();
    return keypair;
});
const createSpotWallet = (accountId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    let tokens = yield cainance_1.CainanceMongo.Token.find().select('_id').lean();
    let keypair = yield createKeypair(accountId);
    try {
        [tokens, keypair] = yield Promise.all([tokens, keypair]);
    }
    catch (err) {
        console.log('error creating keypair');
    }
    const spotWallet = new cainance_1.CainanceMongo.SpotWallet({
        accountId,
        assets: tokens.map(token => ({ token: token._id })),
        keypair: keypair._id,
    });
    yield spotWallet.save();
});
const createUser = (userInfo) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    let account = yield cainance_1.CainanceSequel.Account.create({
        email: userInfo.email,
        phone: userInfo.phoneNumber,
        password: userInfo.password,
    });
    account = account.toJSON();
    yield createSpotWallet(account.id);
    return account;
});
exports.default = createUser;
//# sourceMappingURL=createUser.js.map