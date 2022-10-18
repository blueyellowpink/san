import { CainanceMongo } from 'cainance';

type CreateOtp = (_args: {
    id: number;
    email: string;
    phone: string;
}) => Promise<boolean>;

const generateOtp: () => string = () => {
    const characters = '0123456789';
    const len = 6;

    return Array.from(new Array(len))
        .map(_ => {
            return Math.floor(Math.random() * characters.length);
        })
        .join('');
};

const createOtp: CreateOtp = async ({ id, email, phone }) => {
    await CainanceMongo.Otp.deleteMany({
        userId: id,
    });

    const newOtp = new CainanceMongo.Otp({
        userId: id,
        mail: generateOtp(),
        phone: generateOtp(),
        twoFa: '',
        status: 'created',
        type: 'register',
    });

    await newOtp.save();

    return true;
};

export default createOtp;
