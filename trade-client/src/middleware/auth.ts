import { NextFunction, Response } from 'express';
import AppRequest from 'interfaces/AppRequest';
import { TokenExpiredError } from 'jsonwebtoken';
import { verifyJwt } from '../utils';

const isLoggedIn = (req: AppRequest) => !!req.headers.authorization;

const isAuthenticated = (
    req: AppRequest,
    res: Response,
    next: NextFunction
) => {
    if (!isLoggedIn(req)) {
        return next(new Error('you are not logged in'));
    }

    try {
        const { id } = verifyJwt(req.headers.authorization);
        if (id) {
            if (req.user) req.user.id = id;
            else req.user = { id };
            return next();
        }
        return next(new Error('you are not logged in'));
    } catch (err) {
        if (err instanceof TokenExpiredError)
            return next(new Error('token expired'));
        else throw err;
    }
};

export default isAuthenticated;
