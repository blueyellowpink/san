import isUserMiddleware from './isUser.middleware/isUser.middleware'
import loginAction from './login.action/login.action'
import registerAction from './register.action/register.action'
import twoFactorLoginAction from './twoFactorLogin.action/twoFactorLogin.action'

const authActions = {
    login: loginAction,
    register: registerAction,
    twoFactorLogin: twoFactorLoginAction,

    isUser: isUserMiddleware,
}

export default authActions
