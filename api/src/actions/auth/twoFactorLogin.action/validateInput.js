const Joi = require('joi')

const login2FaFormSchema = Joi.object({
    loginToken: Joi.string().not(''),
    twoFactorToken: Joi.string().not(''),
})

const validateInput = req => {
    const { body } = req

    const input = {
        loginToken: body.loginToken ? (body.loginToken + '').trim() : '',
        twoFactorToken: body.twoFactorToken
            ? (body.twoFactorToken + '').trim()
            : '',
    }

    const validate = login2FaFormSchema.validate(input)

    if (validate.error) throw new Error('Invalid input')

    return input
}

module.exports = validateInput
