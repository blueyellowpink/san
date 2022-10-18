import appConfig from 'appConfig';
import createUser from 'actions/register/createUser';
import registerParseArgs from 'actions/register/registerParseArgs';
import { registerArgs, registerResponse } from 'actions/register/types';
import { ActionType } from 'interfaces/Action';
import jwt from 'jsonwebtoken';

const register: ActionType = async req => {
    const args: registerArgs = await registerParseArgs(req);

    const userInfo = {
        email: args?.email,
        phoneNumber: args?.phoneNumber,
        password: args?.password,
    };

    const user = await createUser(userInfo);

    const userPublicInfo = {
        id: user.id,
        email: user.email,
        password: user.password,
    };

    const token = jwt.sign(userPublicInfo, appConfig.jwtPrivateKey);

    const response: registerResponse = {
        token: token,
        user: userPublicInfo,
    };

    return response;
};

export default register;
