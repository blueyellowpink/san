import { models } from '@cainance/db'
import md5 from 'md5'
import createRandomString from '../../../libs/random/createRandomString'

const createRefCode = async generatedCodes => {
    let code = createRandomString().toUpperCase()
    while (generatedCodes.includes(code)) {
        code = createRandomString().toUpperCase()
    }
    const refCode = code

    const sameRefCodeAccount = await models.user
        .findOne({ refCode: refCode })
        .select('_id')

    if (sameRefCodeAccount) return createRefCode([...generatedCodes, refCode])

    return refCode
}

const createAccount = async ({ email, password }) => {
    const refCode = await createRefCode([])

    const newAccount = new models.user({
        email: email,
        password: md5(password),
        refCode: refCode,
    })

    await newAccount.save()

    return newAccount
}

export default createAccount
