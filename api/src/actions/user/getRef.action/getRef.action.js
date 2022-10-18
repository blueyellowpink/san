const getRefPoint = require('./getRefPoint')
const getUser = require('./getUser')

const getRefAction = async req => {
    const {
        user: { _id: userId },
    } = req

    const [user, refPoint] = await Promise.all([
        getUser(userId),
        getRefPoint(userId),
    ])

    return {
        user,
        refPoint,
    }
}

module.exports = getRefAction
