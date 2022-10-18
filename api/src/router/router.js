const express = require('express')
const authActions = require('../actions/auth/authActions')
const {
    processAction,
    processMiddleware,
} = require('../libs/processor/processor')
const routes = require('./routes')

const router = express.Router()

routes.forEach(route => {
    const { method, action, path, auth, middlewares } = route

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

module.exports = router
