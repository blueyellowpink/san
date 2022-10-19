import { verifyJwtToken } from '../../../libs/jwt/jwt'

interface ResponseError extends Error {
    status?: number
}

const throwUnauthorized = () => {
    const e: ResponseError = new Error('You need to login')
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

export default isUserMiddleware
