import { Router } from 'express';
import Route from 'interfaces/Route';
import { processAction } from 'libs/actionHelpers';
import routes from 'routes';

const router = Router();

const routeRegister: (route: Route) => void = route => {
    const { path, action, method, middleware } = route;

    if (middleware) {
        router[method](path, middleware, processAction(action));
    } else {
        router[method](path, processAction(action));
    }
};

routes.map(routeRegister);

export default router;
