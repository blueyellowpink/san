import 'dotenv/config'
import { CainanceConfig, CainanceMongo, Config } from '../dist'
import { Wallet as EvmKeypair } from 'ethers'
import { Keypair as SolanaKeypair } from '@solana/web3.js'

const createChain = async () => {
    const eth = new CainanceMongo.Chain({
        name: 'ethereum',
        type: 'evm',
    })
    await eth.save()

    const bsc = new CainanceMongo.Chain({
        name: 'bsc',
        type: 'evm',
    })
    await bsc.save()

    const sol = new CainanceMongo.Chain({
        name: 'solana',
        type: 'solana',
    })
    await sol.save()
}

const createToken = async () => {
    const chains = await CainanceMongo.Chain.find().lean()

    const all = chains.map(chain => chain._id)
    const evmChain = chains.filter(chain => {
        if (chain.type === 'evm') return chain._id
    })
    const solChain = chains.filter(chain => {
        if (chain.type === 'solana') return chain._id
    })

    // solana
    const sol = new CainanceMongo.Token({
        name: 'sol',
        chains: solChain,
    })
    await sol.save()

    // busd
    const busd = new CainanceMongo.Token({
        name: 'busd',
        chains: evmChain,
    })
    await busd.save()

    // usdt
    const usdt = new CainanceMongo.Token({
        name: 'usdt',
        chains: evmChain,
    })
    await usdt.save()

    // btc
    const btc = new CainanceMongo.Token({
        name: 'btc',
        chains: evmChain,
    })
    await btc.save()
}

const getToken = async () => {
    const tokens = await CainanceMongo.Token.find()
        .populate({
            path: 'chains',
            select: '-_id name type',
        })
        .lean()

    console.log(tokens)
    tokens.map(token => console.log(token.chains))
}

const genKeypair = (userId: number, chainType: string) => {
    if (chainType === 'evm') {
        const keypair = EvmKeypair.fromMnemonic(
            CainanceConfig.EVM_MNEMONIC_PHRASE,
            `m/44'/60'/0'/0/${userId}`
        )
        return {
            publicKey: keypair.address,
            privateKey: null,
        }
    }

    if (chainType === 'solana') {
        const keypair = SolanaKeypair.generate()
        return {
            publicKey: keypair.publicKey.toString(),
            privateKey: Buffer.from(keypair.secretKey).toString('base64'),
        }
    }
}

const createKeypair = async accountId => {
    const obj = new CainanceMongo.Keypair({
        accountId,
        evm: genKeypair(accountId, 'evm'),
        solana: genKeypair(accountId, 'solana'),
    })
    await obj.save()
    return obj
}

const createWallet = async (tokens, keypair) => {
    const obj = new CainanceMongo.SpotWallet({
        accountId: 2,
        assets: tokens.map(token => ({ token: token._id })),
        keypair: keypair._id,
    })
    await obj.save()
}

!(async () => {
    try {
        await CainanceMongo.connect((CainanceConfig as Config).MONGO_URI)
        console.log('mongodb connected')
    } catch (err) {
        console.error(err.message)
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

    process.exit(1)
})()
