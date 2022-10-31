import { CainanceSequel } from '../src'

const createSpotWalletTransaction = async () => {
	const accountId = 'a'
	const wallets = [
		{
			accountId,
			token: 'BTC',
		},
		{
			accountId,
			token: 'SOL',
		},
		{
			accountId,
			token: 'ETH',
		},
	]

	await CainanceSequel.SpotWallet.bulkCreate(wallets)
}

const getSpotWallet = async () => {
	const items = await CainanceSequel.SpotWallet.findAll({ where: { accountId: 'a' } })
	console.log(items.map(item => item.toJSON()))
}

!(async () => {
    await CainanceSequel.connect(
        {
            database: 'cainance-staging',
            user: 'postgres',
            password: 'qwe123',
            host: 'localhost',
        },
        {
            sync: true,
        }
    )

	// await createSpotWalletTransaction()
	// await getSpotWallet()
	// await findAllSpotWallet()
})()
