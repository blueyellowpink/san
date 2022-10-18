import { ParseArgsType } from 'interfaces/Action';
import { registerArgs } from 'actions/register/types';
import { isEmail } from 'libs/regex';
import localeKeys from 'locales/localeKeys';
import { CainanceSequel } from 'cainance';
import md5 from 'md5';

const checkExistedUser: (userInfo: {
    email: string;
    phoneNumber: string;
}) => Promise<boolean> = async ({ email, phoneNumber }) => {
    const existed = await CainanceSequel.Account.findOne({
        where: {
            email: email,
            phone: phoneNumber,
        },
    });

    return !!existed;
};

const registerParseArgs: ParseArgsType = async req => {
    const { body, t } = req;

    const email: string = body.email
        ? (body.email + '').trim().toLowerCase()
        : '';
    const phoneNumber: string = body.phoneNumber ? body.phoneNumber + '' : '';
    const password: string = body.password ? md5(body.password + '') : '';

    if (!password) throw new Error(t(localeKeys.register.passwordIsNotValid));
    if (!isEmail(email))
        throw new Error(t(localeKeys.register.emailIsNotValid));

    const args: registerArgs = {
        email: email,
        phoneNumber: phoneNumber,
        password: password,
    };

    const existed = await checkExistedUser({
        email: args.email,
        phoneNumber: args.phoneNumber,
    });

    if (existed) throw new Error(t(localeKeys.register.existedUser));

    req.args = args;

    return args;
};

export default registerParseArgs;
