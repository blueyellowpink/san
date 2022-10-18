import { CainanceMongo } from 'cainance';
import AppRequest from 'interfaces/AppRequest';

export const getSpotWallet = async (req: AppRequest) => {
    const wallet = await CainanceMongo.SpotWallet.findOne({
        accountId: req.user.id,
    })
        .populate({
            path: 'assets',
            populate: {
                path: 'token',
                model: CainanceMongo.Token,
                select: '-_id name chains',
                populate: {
                    path: 'chains',
                    model: CainanceMongo.Chain,
                    select: '-_id name type',
                },
            },
        })
        .populate({
            path: 'keypair',
            select: '-_id -accountId',
        })
        .select('-_id assets keypair')
        .lean();

    if (wallet) {
        const spotWallets = wallet.assets.map(asset => {
            const publicKey = {};
            asset.token.chains.map(chain => {
                publicKey[chain.name] = wallet.keypair[chain.type].publicKey;
            });

            return {
                token: asset.token.name,
                balance: asset.balance.toString(),
                publicKey,
            };
        });

        return spotWallets;
    }

    return [];
};
