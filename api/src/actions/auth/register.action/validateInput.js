const Joi = require('joi')

const registerFormSchema = Joi.object({
    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
    }),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/),
    refCode: Joi.string()
        .pattern(/^[A-Z0-9]{6}$/)
        .optional(),
})

const isRefCodeInvalid = validate => {
    const { details } = validate.error

    return details.some(error => error.context.key === 'refCode')
}

const validateInput = req => {
    const { body } = req
    const input = {
        email: body.email ? (body.email + '').trim().toLowerCase() : '',
        password: body.password,
        refCode: body.refCode ? (body.refCode + '').trim().toUpperCase() : '',
    }

    const validate = registerFormSchema.validate(input)

    if (!validate.error) return input

    if (isRefCodeInvalid(validate)) return { ...input, refCode: '' }

    if (validate.error) throw new Error('Invalid input')
}

module.exports = validateInput
