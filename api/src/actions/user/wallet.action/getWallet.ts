import { CainanceSequel } from '@cainance/db'

type Asset = {
	token: string
	amout: string
}

export const getSpotWallet = async (req): Promise<Array<Asset>> => {
    try {
		const wallets = await CainanceSequel.SpotWallet.findAll({
			where: {
				accountId: req.user._id.toString()
			},
			attributes: ['token', 'amount'],
			order: [
				['amount', 'DESC'],
				['token']
			]
		})

        if (wallets) {
            return wallets.map(wallet => wallet.toJSON() as Asset)
        }

        return []
    } catch (err) {
        throw new Error(err.message)
    }
}
