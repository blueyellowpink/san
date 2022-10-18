"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("dotenv/config");
const dist_1 = require("../dist");
const ethers_1 = require("ethers");
const web3_js_1 = require("@solana/web3.js");
const createChain = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const eth = new dist_1.CainanceMongo.Chain({
        name: 'ethereum',
        type: 'evm',
    });
    yield eth.save();
    const bsc = new dist_1.CainanceMongo.Chain({
        name: 'bsc',
        type: 'evm',
    });
    yield bsc.save();
    const sol = new dist_1.CainanceMongo.Chain({
        name: 'solana',
        type: 'solana',
    });
    yield sol.save();
});
const createToken = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const chains = yield dist_1.CainanceMongo.Chain.find().lean();
    const all = chains.map(chain => chain._id);
    const evmChain = chains.filter(chain => {
        if (chain.type === 'evm')
            return chain._id;
    });
    const solChain = chains.filter(chain => {
        if (chain.type === 'solana')
            return chain._id;
    });
    // solana
    const sol = new dist_1.CainanceMongo.Token({
        name: 'sol',
        chains: solChain,
    });
    yield sol.save();
    // busd
    const busd = new dist_1.CainanceMongo.Token({
        name: 'busd',
        chains: evmChain,
    });
    yield busd.save();
    // usdt
    const usdt = new dist_1.CainanceMongo.Token({
        name: 'usdt',
        chains: evmChain,
    });
    yield usdt.save();
    // btc
    const btc = new dist_1.CainanceMongo.Token({
        name: 'btc',
        chains: evmChain,
    });
    yield btc.save();
});
const getToken = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const tokens = yield dist_1.CainanceMongo.Token.find()
        .populate({
        path: 'chains',
        select: '-_id name type',
    })
        .lean();
    console.log(tokens);
    tokens.map(token => console.log(token.chains));
});
const genKeypair = (userId, chainType) => {
    if (chainType === 'evm') {
        const keypair = ethers_1.Wallet.fromMnemonic(dist_1.CainanceConfig.EVM_MNEMONIC_PHRASE, `m/44'/60'/0'/0/${userId}`);
        return {
            publicKey: keypair.address,
            privateKey: null,
        };
    }
    if (chainType === 'solana') {
        const keypair = web3_js_1.Keypair.generate();
        return {
            publicKey: keypair.publicKey.toString(),
            privateKey: Buffer.from(keypair.secretKey).toString('base64'),
        };
    }
};
const createKeypair = (accountId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const obj = new dist_1.CainanceMongo.Keypair({
        accountId,
        evm: genKeypair(accountId, 'evm'),
        solana: genKeypair(accountId, 'solana'),
    });
    yield obj.save();
    return obj;
});
const createWallet = (tokens, keypair) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const obj = new dist_1.CainanceMongo.SpotWallet({
        accountId: 2,
        assets: tokens.map(token => ({ token: token._id })),
        keypair: keypair._id,
    });
    yield obj.save();
});
!(() => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        yield dist_1.CainanceMongo.connect(dist_1.CainanceConfig.MONGO_URI);
        console.log('mongodb connected');
    }
    catch (err) {
        console.error(err.message);
    }
    // await createChain()
    // await createToken()
    // await getToken()
    /* const wallet = await CainanceMongo
        .SpotWallet
        .findOne({ accountId: 33 })
        .populate({
            path: 'assets',
            populate: {
                path: 'token',
                model: CainanceMongo.Token,
                select: '-_id name chains',
                populate: {
                    path: 'chains',
                    model: CainanceMongo.Chain,
                    select: '-_id name type',
                }
            },
        })
        .populate({
            path: 'keypair',
            select: '-_id -accountId'
        })
        .select('-_id assets keypair')
        .lean()

    const spotWallets = wallet.assets.map(asset => {
        const publicKey = {}
        asset.token.chains.map(chain => {
            publicKey[chain.name] = wallet.keypair[chain.type].publicKey
        })

        return {
            token: asset.token.name,
            balance: asset.balance.toString(),
            publicKey
        }
    })
    console.log(spotWallets) */
    process.exit(1);
}))();
//# sourceMappingURL=mongo.js.map