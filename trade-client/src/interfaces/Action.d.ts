import { registerResponse } from 'actions/register/types';
import { NextFunction, Response } from 'express';
import AppRequest from 'interfaces/AppRequest';

interface ActionType {
    (req: AppRequest, res: Response): Promise<any>;
}

interface MiddlewareType {
    (req: AppRequest, res: Response, next: NextFunction): void;
}

interface ProcessActionType {
    (action: ActionType): (req: AppRequest, res: Response) => Promise<any>;
}

interface ProcessMiddlewareType {
    (action: ActionType): (
        req: AppRequest,
        res: Response,
        next: NextFunction
    ) => Promise<any>;
}

interface ParseArgsType {
    (req: AppRequest): Promise<any>;
}
