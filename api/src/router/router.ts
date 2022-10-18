import express from 'express'
import authActions from '../actions/auth/authActions'
import { processAction, processMiddleware } from '../libs/processor/processor'
import routes, { Route } from './routes'

const router = express.Router()

routes.forEach(route => {
    const { method, action, path, auth, middlewares } = route as Route

    const routesMiddlewares = [
        ...(auth ? [processMiddleware(authActions.isUser)] : []),
        ...(Array.isArray(middlewares)
            ? middlewares.map(processMiddleware)
            : []),
    ]

    router[method.toLocaleLowerCase()](
        path,
        routesMiddlewares,
        processAction(action)
    )
})

export default router
