import { models } from '../../src'

test('create a user', () => {
    const user = new models.user({
        email: 'email',
        password: '123',
        refCode: 'qwe123',
        twoFactorSecret: '2fa',
    })
    expect(user.email).toBe('email')
})

test('create a token', () => {
    const token = new models.Token({
        name: 'Bitcoin',
        symbol: 'BTC',
    })
    expect(token.name).toBe('Bitcoin')
    expect(token.symbol).toBe('BTC')
})

test('create a trading pair', () => {
    const ref = '634ee82058c172b74fea01a5'
    const pair = new models.TradingPair({
        name: 'BTC/USDT',
        token: {
            cryptocurrency: ref,
            stablecoin: ref,
        },
    })
})
