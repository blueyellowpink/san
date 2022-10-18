import AppRequest from 'interfaces/AppRequest';
import { CainanceSequel } from 'cainance';

export const getPairs = async (req: AppRequest): Promise<string[] | []> => {
    try {
        let pairs = await CainanceSequel.Pair.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        });

        if (pairs) {
            return pairs.map(pair => pair.toJSON());
        }

        return [];
    } catch (err) {
        throw new Error(err.message);
    }
};

export const getFavouritePairs = async (
    req: AppRequest
): Promise<string[] | []> => {
    try {
        let pairs = await CainanceSequel.Pair.findAll({
            where: {
                isFavourite: true,
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        });

        if (pairs) {
            return pairs.map(pair => pair.toJSON());
        }

        return [];
    } catch (err) {
        throw new Error(err.message);
    }
};
