import models from '@cainance/db'

export const getPairs = async (req): Promise<string[] | []> => {
    try {
        let pairs = await CainanceSequel.Pair.findAll({})

        if (pairs) {
            return pairs.map(pair => pair.toJSON())
        }

        return [];
    } catch (err) {
        throw new Error(err.message);
    }
};

export const getFavouritePairs = async (req): Promise<string[] | []> => {
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
};
