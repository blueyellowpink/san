import jwt from 'jsonwebtoken'
import config from '../../globalConfig'

export const signJwtToken = data => jwt.sign(data, config.jwt.secret)

export const verifyJwtToken = token => {
    try {
        return jwt.verify(token, config.jwt.secret)
    } catch (e) {
        return null
    }
}
