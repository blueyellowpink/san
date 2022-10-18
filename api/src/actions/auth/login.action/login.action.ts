import { signJwtToken } from '../../../libs/jwt/jwt'
import findAccount from './findAccount'
import validateInput from './validateInput'

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

export default loginAction
