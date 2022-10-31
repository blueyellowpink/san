import Joi from 'joi'

const streamArgs = Joi.object({
    symbol: Joi.string(),
    timeWindow: Joi.string().valid(
        '1m',
        '3m',
        '5m',
        '15m',
        '30m',
        '1h',
        '2h',
        '4h',
        '6h',
        '8h',
        '12h',
        '1d',
        '3d',
        '1w',
        '1M'
    ),
})

export const validateStream = params => {
    const args = streamArgs.validate(params)
    if (args.error) {
        throw new Error(args.error.details[0].message)
    }
    return args.value
}
