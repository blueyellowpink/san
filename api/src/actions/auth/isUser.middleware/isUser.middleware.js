const { verifyJwtToken } = require('../../../libs/jwt/jwt')

const throwUnauthorized = () => {
    const e = new Error('You need to login')
    e.status = 403
    throw e
}

const isUserMiddleware = async req => {
    const token = (
        (req.headers['Authorization'] || req.headers['authorization']) + ''
    ).split(' ')[1]

    if (!token) return throwUnauthorized()

    const decoded = verifyJwtToken(token)

    if (!decoded?._id) return throwUnauthorized()

    req.user = decoded
}

module.exports = isUserMiddleware
