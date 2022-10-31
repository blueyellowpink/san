import { CainanceSequel, models } from '@cainance/db'

const createSpotWallet = async (accountId: string): Promise<void> => {
    try {
        const tokens = await models.Token.find().select('symbol').lean()
        if (!tokens || tokens.length == 0) {
            throw new Error('createSpotWallet failed: no tokens')
        }

        const wallets = tokens.map(token => {
            return {
                accountId,
                token: token.symbol,
            }
        })

        await CainanceSequel.SpotWallet.bulkCreate(wallets)
    } catch (error) {
        throw new Error('createSpotWallet failed: ' + error.message)
    }
}

export default createSpotWallet
