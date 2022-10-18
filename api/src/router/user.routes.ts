import userActions from '../actions/user/userActions'

const userRoutes = [
    {
        path: '/user/ref',
        method: 'get',
        action: userActions.getRef,
        auth: true,
    },

    {
        path: '/user/2fa/generate',
        method: 'get',
        action: userActions.generate2FaQr,
        auth: true,
    },

    {
        path: '/user/2fa/save',
        method: 'post',
        action: userActions.save2FaQr,
        auth: true,
    },
]

export default userRoutes
