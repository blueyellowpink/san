import { Wallet as EvmKeypair } from 'ethers';
import { Keypair as SolanaKeypair } from '@solana/web3.js';
import { CainanceConfig } from 'cainance';

export const genKeypair = (userId: number, chainType: string) => {
    if (chainType === 'evm') {
        const keypair = EvmKeypair.fromMnemonic(
            CainanceConfig.EVM_MNEMONIC_PHRASE,
            `m/44'/60'/0'/0/${userId}`
        );
        return {
            publicKey: keypair.address,
            privateKey: null,
        };
    }

    if (chainType === 'solana') {
        const keypair = SolanaKeypair.generate();
        return {
            publicKey: keypair.publicKey.toString(),
            privateKey: Buffer.from(keypair.secretKey).toString('base64'),
        };
    }
};
