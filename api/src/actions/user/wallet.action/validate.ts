import Joi from 'joi'

const getWalletArgs = Joi.object({
    page: Joi.number().greater(0).required(),
    limit: Joi.number().greater(0).default(10).required(),
})

export const validateWallet = query => {
    const args = getWalletArgs.validate(query)
    if (args.error) {
        throw new Error(args.error.details[0].message)
    }
    return args.value
}
