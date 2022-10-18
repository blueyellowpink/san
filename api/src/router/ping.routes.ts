import pingActions from '../actions/ping/pingActions'

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

export default pingRoutes
