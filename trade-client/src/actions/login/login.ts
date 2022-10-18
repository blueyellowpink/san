import appConfig from 'appConfig';
import loginParseArgs from 'actions/login/loginParseArgs';
import { loginArgs, loginResponse } from 'actions/login/types';
import { CainanceSequel } from 'cainance';
import jwt from 'jsonwebtoken';
import createOtp from './createOtp';

const login = async req => {
    const args: loginArgs = await loginParseArgs(req);

    let user = await CainanceSequel.Account.findOne({
        attributes: ['id', 'email', 'phone'],
        where: {
            email: args.email,
            phone: args.phoneNumber,
        },
    });

    if (!user) throw new Error('Invalid user');
    user = user.toJSON();

    await createOtp(user);

    const token = jwt.sign(user, appConfig.jwtPrivateKey, { expiresIn: '3d' });

    const response: loginResponse = { user, token };

    return response;
};

export default login;
