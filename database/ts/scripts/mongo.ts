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
        {
            name: 'Polygon',
            symbol: 'polygon',
            type: 'evm',
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
            chains: ['bsc', 'eth'],
            icon: '',
        },
        {
            name: 'Ethereum',
            symbol: 'ETH',
            chains: ['eth'],
            icon: '',
        },
        {
            name: 'TetherUs',
            symbol: 'USDT',
            chains: ['eth', 'bsc', 'sol', 'tron'],
            icon: '',
        },
        {
            name: 'BNB',
            symbol: 'BNB',
            chains: ['bsc'],
            icon: '',
        },
        {
            name: 'BUSD',
            symbol: 'BUSD',
            chains: ['bsc'],
            icon: '',
        },
        {
            name: 'Solana',
            symbol: 'SOL',
            chains: ['bsc', 'sol'],
            icon: '',
        },
        {
            name: 'Dogecoin',
            symbol: 'DOGE',
            chains: ['bsc'],
            icon: '',
        },
        {
            name: 'Polkadot',
            symbol: 'DOT',
            chains: ['dot'],
            icon: '',
        },
        {
            name: 'TRON',
            symbol: 'TRX',
            chains: ['tron'],
            icon: '',
        },
        {
            name: 'SHIBA INU',
            symbol: 'SHIB',
            chains: ['bsc'],
            icon: '',
        },
        {
            name: 'PancakeSwap',
            symbol: 'CAKE',
            chains: ['bsc'],
            icon: '',
        },
        {
            name: 'Uniswap',
            symbol: 'UNI',
            chains: ['eth'],
            icon: '',
        },
        {
            name: 'Matic',
            symbol: 'MATIC',
            chains: ['polygon', 'bsc', 'eth'],
            icon: '',
        },
        {
            name: 'NEAR Protocol',
            symbol: 'NEAR',
            chains: ['near'],
            icon: '',
        },
    ]

    const chains = await models.Chain.find().lean()
    const chainIdMap = new Map()
    for (const chain of chains) {
        chainIdMap.set(chain.symbol, chain._id)
    }

    const promises = tokens.map(async token => {
        const instance = new models.Token({
            name: token.name,
            symbol: token.symbol,
            chains: token.chains.map(item => chainIdMap.get(item)),
            icon: token.icon,
        })
        await instance.save()
    })
    await Promise.all(promises)
}

const insertTradingPairs = async () => {
    const quotes = await models.Token.find({
        $or: [{ symbol: 'USDT' }, { symbol: 'BUSD' }],
    })
        .select('symbol')
        .lean()
    // console.log(quotes)

    const bases = await models.Token.find({
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
    // console.log(bases)

    const promises = bases.map(async base => {
        const future = quotes.map(async quote => {
            const pair = new models.TradingPair({
                name: base.symbol + '/' + quote.symbol,
                pair: {
                    base: base._id,
                    quote: quote._id,
                },
            })
            await pair.save()
        })
        await Promise.all(future)
    })
    await Promise.all(promises)
}

!(async () => {
    await connectToMongo(
        'mongodb://localhost:27017/cainance-staging?replicaSet=replicaSet0'
    )

    await insertChains()
    await insertTokens()
    await insertTradingPairs()

    process.exit(0)
})()
