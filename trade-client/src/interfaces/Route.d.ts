import { ActionType, MiddlewareType } from './Action';

interface Route {
    path: string;
    method: string;
    action: ActionType;
    middleware?: MiddlewareType;
}

export default Route;
