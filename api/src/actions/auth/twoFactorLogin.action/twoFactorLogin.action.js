const validateInput = require('./validateInput')
const { verifyJwtToken, signJwtToken } = require('../../../libs/jwt/jwt')
const { models } = require('../../../db/mongo/mongoose')
const twoFactor = require('node-2fa')

const getUser = async userId => {
    const user = await models.user.findById(userId)

    if (!user) throw new Error('Invalid user')
    if (!user.twoFactorSecret) throw new Error('Invalid user')

    return user
}

const verifyToken = (user, token) => {
    const result = twoFactor.verifyToken(user.twoFactorSecret, token)

    if (!result?.delta) throw new Error('Invalid token')
}

const twoFactorLoginAction = async req => {
    const input = validateInput(req)

    const decoded = verifyJwtToken(input.loginToken)
    if (!decoded) throw new Error('Invalid user')

    const user = await getUser(decoded._id)

    verifyToken(user, input.twoFactorToken)

    const response = {
        _id: user._id,
        email: user.email,
    }
    const jwt = signJwtToken(response)

    return { account: response, token: jwt }
}

module.exports = twoFactorLoginAction
