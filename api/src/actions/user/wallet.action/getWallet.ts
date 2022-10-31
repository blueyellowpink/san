import { CainanceSequel } from '@cainance/db'
import { validateWallet } from './validate'

type Row = {
    token: string
    amout: string
}

type Asset = {
    count: number
    rows: Array<Row>
}

export const getSpotWallet = async (req): Promise<Asset> => {
    const args = validateWallet(req.query)

    const { count, rows } = await CainanceSequel.SpotWallet.findAndCountAll({
        where: {
            accountId: req.user._id.toString(),
        },
        attributes: ['token', 'amount'],
        order: [['amount', 'DESC'], ['token']],
        limit: args.limit,
        offset: args.limit * (args.page - 1),
    })

    return { count, rows } as Asset
}
