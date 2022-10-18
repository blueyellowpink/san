const isUserMiddleware = require('./isUser.middleware/isUser.middleware')
const loginAction = require('./login.action/login.action')
const registerAction = require('./register.action/register.action')
const twoFactorLoginAction = require('./twoFactorLogin.action/twoFactorLogin.action')

const authActions = {
    login: loginAction,
    register: registerAction,
    twoFactorLogin: twoFactorLoginAction,

    isUser: isUserMiddleware,
}

module.exports = authActions
