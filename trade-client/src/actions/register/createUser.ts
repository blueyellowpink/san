import { registerArgs } from 'actions/register/types';
import { CainanceMongo, CainanceSequel } from 'cainance';
import { genKeypair } from '../../utils';

const createKeypair = async (accountId: number) => {
    const keypair = new CainanceMongo.Keypair({
        accountId,
        evm: genKeypair(accountId, 'evm'),
        solana: genKeypair(accountId, 'solana'),
    });
    await keypair.save();

    return keypair;
};

const createSpotWallet = async (accountId: number) => {
    let tokens = await CainanceMongo.Token.find().select('_id').lean();
    let keypair = await createKeypair(accountId);
    try {
        [tokens, keypair] = await Promise.all([tokens, keypair]);
    } catch (err) {
        console.log('error creating keypair');
    }

    const spotWallet = new CainanceMongo.SpotWallet({
        accountId,
        assets: tokens.map(token => ({ token: token._id })),
        keypair: keypair._id,
    });
    await spotWallet.save();
};

const createUser = async (userInfo: registerArgs) => {
    let account = await CainanceSequel.Account.create({
        email: userInfo.email,
        phone: userInfo.phoneNumber,
        password: userInfo.password,
    });
    account = account.toJSON();

    await createSpotWallet(account.id);

    return account;
};

export default createUser;
