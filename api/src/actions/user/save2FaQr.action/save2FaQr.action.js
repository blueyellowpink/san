const { verifyJwtToken } = require('../../../libs/jwt/jwt')
const { models } = require('../../../db/mongo/mongoose')

const save2FaQrAction = async req => {
    const {
        user: { _id: userId },
        body: { token },
    } = req
    const decodedToken = verifyJwtToken(token)

    if (!decodedToken) throw new Error('Invalid token')
    if (decodedToken?.userId !== userId) throw new Error('Invalid token')

    const user = await models.user.findById(userId)
    if (!user) throw new Error('Invalid user')

    user.twoFactorSecret = decodedToken.secret
    await user.save()

    return true
}

module.exports = save2FaQrAction
