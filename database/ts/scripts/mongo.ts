import { connectToMongo, models } from '../src'

const insertChains = async () => {
    const chains = [
        {
            name: 'Binance Smart Chain',
            symbol: 'bsc',
            type: 'evm',
        },
        {
            name: 'Tron',
            symbol: 'tron',
            type: 'evm',
        },
        {
            name: 'Ethereum',
            symbol: 'eth',
            type: 'evm',
        },
        {
            name: 'Solana',
            symbol: 'sol',
            type: 'solana',
        },
        {
            name: 'NEAR',
            symbol: 'near',
            type: 'near',
        },
        {
            name: 'Polkadot',
            symbol: 'dot',
            type: 'dot',
        },
    ]

    const promises = chains.map(async chain => {
        const instance = new models.Chain({
            name: chain.name,
            symbol: chain.symbol,
            type: chain.type,
        })
        await instance.save()
    })
    await Promise.all(promises)
}

const insertTokens = async () => {
    const tokens = [
        {
            name: 'Bitcoin',
            symbol: 'BTC',
            icon: '',
        },
        {
            name: 'Ethereum',
            symbol: 'ETH',
            icon: '',
        },
        {
            name: 'TetherUs',
            symbol: 'USDT',
            icon: '',
        },
        {
            name: 'BNB',
            symbol: 'BNB',
            icon: '',
        },
        {
            name: 'BUSD',
            symbol: 'BUSD',
            icon: '',
        },
        {
            name: 'Solana',
            symbol: 'SOL',
            icon: '',
        },
        {
            name: 'Dogecoin',
            symbol: 'DOGE',
            icon: '',
        },
        {
            name: 'Polkadot',
            symbol: 'DOT',
            icon: '',
        },
        {
            name: 'TRON',
            symbol: 'TRX',
            icon: '',
        },
        {
            name: 'SHIBA INU',
            symbol: 'SHIB',
            icon: '',
        },
        {
            name: 'PancakeSwap',
            symbol: 'CAKE',
            icon: '',
        },
        {
            name: 'Uniswap',
            symbol: 'UNI',
            icon: '',
        },
        {
            name: 'Polygon',
            symbol: 'MATIC',
            icon: '',
        },
        {
            name: 'NEAR Protocol',
            symbol: 'NEAR',
            icon: '',
        },
    ]

    const promises = tokens.map(async token => {
        const instance = new models.Token({
            name: token.name,
            symbol: token.symbol,
            icon: token.icon,
        })
        await instance.save()
    })
    await Promise.all(promises)
}

const insertTradingPairs = async () => {
    const stablecoins = await models.Token.find({
        $or: [{ symbol: 'USDT' }, { symbol: 'BUSD' }],
    })
        .select('symbol')
        .lean()
    // console.log(stablecoins)

    const tokens = await models.Token.find({
        $and: [
            {
                symbol: { $ne: 'USDT' },
            },
            {
                symbol: { $ne: 'BUSD' },
            },
        ],
    })
        .select('symbol')
        .lean()
    // console.log(tokens)

    const promises = tokens.map(async token => {
        const future = stablecoins.map(async coin => {
            const pair = new models.TradingPair({
                name: token.symbol + '/' + coin.symbol,
                token: {
                    cryptocurrency: token._id,
                    stablecoin: coin._id,
                },
            })
            await pair.save()
        })
        await Promise.all(future)
    })
    await Promise.all(promises)
}

!(async () => {
    await connectToMongo('mongodb://localhost:27017')

    // await insertChains()
    // await insertTokens()
    // await insertTradingPairs()

    process.exit(0)
})()
