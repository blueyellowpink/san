const { models } = require('../../../db/mongo/mongoose')
const md5 = require('md5')

const checkStatus = account => {
    // if (account.status === 'created')
    //     throw new Error('Please confirm your account')

    if (account.status === 'restricted')
        throw new Error('Your account has been restricted')

    return account.status === 'confirmed'
}

const checkPassword = (account, password) => {
    const hashedPassword = md5(password)

    if (hashedPassword !== account.password) throw new Error('Invalid password')
}

const findAccount = async ({ email, password }) => {
    const where = { email }
    const account = await models.user.findOne(where)
    if (!account) throw new Error('Account not found')

    checkStatus(account)

    checkPassword(account, password)

    return account
}

module.exports = findAccount
