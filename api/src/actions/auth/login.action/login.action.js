const { signJwtToken } = require('../../../libs/jwt/jwt')
const findAccount = require('./findAccount')
const validateInput = require('./validateInput')

const loginAction = async req => {
    const input = validateInput(req)

    const account = await findAccount(input)

    if (account.twoFactorSecret) {
        const twoFactorToken = signJwtToken({ _id: account._id })

        return { twoFactorToken, twoFactorRequire: true }
    }

    const response = {
        _id: account._id,
        email: account.email,
    }
    const jwt = signJwtToken(response)

    return { account: response, token: jwt }
}

module.exports = loginAction
