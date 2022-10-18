const jwt = require('jsonwebtoken')
const {
    jwt: { secret },
} = require('../../globalConfig')

exports.signJwtToken = data => jwt.sign(data, secret)

exports.verifyJwtToken = token => {
    try {
        return jwt.verify(token, secret)
    } catch (e) {
        return null
    }
}
