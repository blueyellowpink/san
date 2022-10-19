import { models } from '@cainance/db'

export const getChainList = async (req): Promise<string[] | []> => {
    try {
        const chains = await models.Chain.find()
            .select('-_id name symbol type')
            .lean()

        if (chains) {
            return chains
        }

        return []
    } catch (err) {
        throw new Error(err.message)
    }
}
