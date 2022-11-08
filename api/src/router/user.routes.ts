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
    {
        path: '/user/spot_wallet',
        method: 'get',
        action: userActions.getSpotWallet,
        auth: true,
    },
    {
        path: '/user/funding_wallet',
        method: 'get',
        action: userActions.getFundingWallet,
        auth: true,
    },
    {
        path: '/user/buy',
        method: 'post',
        action: userActions.buy,
        auth: true,
    },
    {
        path: '/user/sell',
        method: 'post',
        action: userActions.sell,
        auth: true,
    },
    {
        path: '/user/cancel',
        method: 'post',
        action: userActions.cancel,
        auth: true,
    },
    {
        path: '/user/orders',
        method: 'get',
        action: userActions.getOrder,
        auth: true,
    },
]

export default userRoutes
