import { Request } from 'express';

export default interface AppRequest extends Request {
    user: any;
    logs: any;

    args: any;
}
