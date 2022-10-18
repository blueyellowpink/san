import appConfig from 'appConfig';
import jwt from 'jsonwebtoken';

const verifyJwt = bearerToken => {
    const token = bearerToken.substring(7);
    return jwt.verify(token, appConfig.jwtPrivateKey);
};

export { verifyJwt };
