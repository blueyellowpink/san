import { models } from '@cainance/db'

export const getTradingPairList = async (req): Promise<string[] | []> => {
    try {
        const pairs = await models.TradingPair.find()
            .sort({ marketCap: -1 })
            .select('-_id -token -createdAt -updatedAt -__v')
            .lean()

        if (pairs) {
            return pairs
        }

        return []
    } catch (err) {
        throw new Error(err.message)
    }
}

/* export const getFavouritePairs = async (req): Promise<string[] | []> => {
    try {
        let pairs = await CainanceSequel.Pair.findAll({
            where: {
                isFavourite: true,
            }
        });

        if (pairs) {
            return pairs.map(pair => pair.toJSON());
        }

        return [];
    } catch (err) {
        throw new Error(err.message);
    }
}; */
