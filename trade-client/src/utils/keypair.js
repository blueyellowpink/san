"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genKeypair = void 0;
const ethers_1 = require("ethers");
const web3_js_1 = require("@solana/web3.js");
const cainance_1 = require("cainance");
const genKeypair = (userId, chainType) => {
    if (chainType === 'evm') {
        const keypair = ethers_1.Wallet.fromMnemonic(cainance_1.CainanceConfig.EVM_MNEMONIC_PHRASE, `m/44'/60'/0'/0/${userId}`);
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
exports.genKeypair = genKeypair;
//# sourceMappingURL=keypair.js.map