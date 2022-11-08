import { CainanceSequel } from '@cainance/db'
import { validateWallet } from './validate'
import { Request } from 'express'

type SpotRow = {
    token: string
    amount: string
	availableAmount: string
	inOrderAmount: string
}

type SpotAsset = {
    count: number
    rows: Array<SpotRow>
}

export const getSpotWallet = async (req: Request): Promise<SpotAsset> => {
    const args = validateWallet(req.query)

    const { count, rows } = await CainanceSequel.SpotWallet.findAndCountAll({
        where: {
            accountId: req.user._id.toString(),
        },
        attributes: ['token', 'amount', 'availableAmount', 'inOrderAmount'],
        order: [['amount', 'DESC'], ['token']],
        limit: args.limit,
        offset: args.limit * (args.page - 1),
    })

    return { count, rows } as SpotAsset
}

type FundingRow = {
    token: string
    amount: string
}

type FundingAsset = {
    count: number
    rows: Array<FundingRow>
}

export const getFundingWallet = async (req: Request): Promise<FundingAsset> => {
    const args = validateWallet(req.query)

    const { count, rows } = await CainanceSequel.FundingWallet.findAndCountAll({
        where: {
            accountId: req.user._id.toString(),
        },
        attributes: ['token', 'amount'],
        order: [['amount', 'DESC'], ['token']],
        limit: args.limit,
        offset: args.limit * (args.page - 1),
    })

    return { count, rows } as FundingAsset
}
