import { loginArgs } from 'actions/login/types';
import AppRequest from 'interfaces/AppRequest';

const loginParseArgs: (req: AppRequest) => Promise<loginArgs> = async req => {
    const args: loginArgs = {
        email: '',
        phoneNumber: '',
        password: '',
    };
    const { body } = req;

    const email = body.email ? (body.email + '').trim() : '';
    const phoneNumber = body.phoneNumber ? (body.phoneNumber + '').trim() : '';
    const password = body.password ? body.password + '' : '';

    if (!email || !phoneNumber || !password) throw new Error('Invalid args');

    args.email = email;
    args.phoneNumber = phoneNumber;
    args.password = password;

    return args;
};

export default loginParseArgs;
