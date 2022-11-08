"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const db_1 = require("@cainance/db");
const md5_1 = tslib_1.__importDefault(require("md5"));
const createRandomString_1 = tslib_1.__importDefault(require("../../../libs/random/createRandomString"));
const ethers_1 = require("ethers");
const web3_js_1 = require("@solana/web3.js");
const globalConfig_1 = tslib_1.__importDefault(require("../../../globalConfig"));
const createSpotAndFundingWallet = (accountId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
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
        const transaction = yield db_1.CainanceSequel.sequelize.transaction((t) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            yield db_1.CainanceSequel.SpotWallet.bulkCreate(wallets);
            yield db_1.CainanceSequel.FundingWallet.bulkCreate(wallets);
        }));
    }
    catch (error) {
        throw new Error('createSpotWallet failed: ' + error.message);
    }
});
const generateKeypair = (chainType) => {
    if (chainType === 'evm') {
        const keypair = ethers_1.Wallet.fromMnemonic(globalConfig_1.default.evmMnemonic, `m/44'/60'/0'/0/1`);
        return {
            publicKey: keypair.address,
            privateKey: keypair.privateKey,
            chainType,
        };
    }
    if (chainType === 'solana') {
        const keypair = web3_js_1.Keypair.generate();
        return {
            publicKey: keypair.publicKey.toString(),
            privateKey: Buffer.from(keypair.secretKey).toString('base64'),
            chainType,
        };
    }
};
const createRefCode = (generatedCodes) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    let code = (0, createRandomString_1.default)().toUpperCase();
    while (generatedCodes.includes(code)) {
        code = (0, createRandomString_1.default)().toUpperCase();
    }
    const refCode = code;
    const sameRefCodeAccount = yield db_1.models.user
        .findOne({ refCode: refCode })
        .select('_id');
    if (sameRefCodeAccount)
        return createRefCode([...generatedCodes, refCode]);
    return refCode;
});
const createAccount = ({ email, password }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const refCode = yield createRefCode([]);
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const newAccount = yield db_1.models.user.create([
            {
                email: email,
                password: (0, md5_1.default)(password),
                refCode: refCode,
                keypair: [generateKeypair('evm'), generateKeypair('solana')],
            },
        ], { session: session });
        yield createSpotAndFundingWallet(newAccount[0]._id.toString());
        yield session.commitTransaction();
        yield session.endSession();
        return newAccount[0];
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error('createAccount failed: ' + err.message);
    }
});
exports.default = createAccount;
//# sourceMappingURL=createAccount.js.map