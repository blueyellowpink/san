import AppRequest from '../../interfaces/AppRequest';
import { CainanceMongo, CainanceSequel } from 'cainance';
import appConfig from '../../appConfig';
import jwt from 'jsonwebtoken';

const solveOtp: (
    _req: AppRequest
) => Promise<{ token: String }> = async req => {
    const userId = Number.isNaN(req.body.userId) ? 0 : +req.body.userId;
    const mail = req.body.mail + '';
    const phone = req.body.phone + '';

    const [user, otp] = await Promise.all([
        CainanceSequel.Account.findOne({
            where: { id: userId },
            attributes: ['id', 'email', 'phone'],
            raw: true,
        }),
        CainanceMongo.Otp.findOne({
            userId,
            type: 'register',
            status: 'created',
        }),
    ]);

    if (!user || !otp) throw new Error('Invalid user');
    if (otp.phone !== phone || otp.mail !== mail)
        throw new Error('Invalid OTP');

    const token = jwt.sign(user, appConfig.jwtPrivateKey, { expiresIn: '3d' });

    return {
        token: token,
    };
};

export default solveOtp;
