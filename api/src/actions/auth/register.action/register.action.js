const checkExsited = require('./checkExisted')
const createAccount = require('./createAccount')
const getRefer = require('./getRefer')
const validateInput = require('./validateInput')

const registerAction = async args => {
    const input = validateInput(args)

    await checkExsited({ email: input.email })

    const [account, refer] = await Promise.all([
        createAccount(input),
        getRefer(input),
    ])

    if (refer?._id) account.refer = refer._id
    await account.save()

    return {
        account: {
            email: account.email,
            refer: account.refer,
        },
    }
}

module.exports = registerAction
