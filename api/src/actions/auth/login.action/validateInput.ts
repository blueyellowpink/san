import Joi from 'joi'

const loginFormSchema = Joi.object({
    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
    }),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/),
})

const validateInput = req => {
    const { body } = req
    const input = {
        email: body.email ? (body.email + '').trim().toLowerCase() : '',
        password: body.password,
    }

    const validate = loginFormSchema.validate(input)

    if (validate.error) throw new Error('Invalid input')

    return input
}

export default validateInput
