const { models } = require('../../../db/mongo/mongoose')
const twoFactor = require('node-2fa')
const globalConfig = require('../../../globalConfig')
const { signJwtToken } = require('../../../libs/jwt/jwt')

const getUser = async userId => {
    const user = await models.user.findById(userId)

    if (!user) throw new Error('Invalid user')

    if (user.twoFactorSecret) throw new Error('2FA generated')

    return user
}

const generate2FaAction = async req => {
    const {
        user: { _id: userId },
    } = req

    const user = await getUser(userId)

    const { secret, qr } = twoFactor.generateSecret({
        name: globalConfig.appName,
        account: user.email,
    })

    const secretJwt = signJwtToken({
        secret,
        userId,
    })

    return { secret, qr, secretJwt }
}

module.exports = generate2FaAction
