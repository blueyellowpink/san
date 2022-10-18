const pingActions = require('../actions/ping/pingActions')

const pingRoutes = [
    {
        path: '/',
        method: 'get',
        action: pingActions.hello,
    },
    {
        path: '*',
        method: 'get',
        action: pingActions.hello,
    },
]

module.exports = pingRoutes
