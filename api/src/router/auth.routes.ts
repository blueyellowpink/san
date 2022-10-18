import authActions from '../actions/auth/authActions'

const authRoutes = [
    {
        path: '/auth/sign-in',
        method: 'post',
        action: authActions.login,
    },
    {
        path: '/auth/sign-up',
        method: 'post',
        action: authActions.register,
    },

    {
        path: '/auth/sign-in/2fa',
        method: 'post',
        action: authActions.twoFactorLogin,
    },
]

export default authRoutes
