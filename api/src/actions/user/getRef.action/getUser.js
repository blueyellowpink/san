const { models } = require('../../../db/mongo/mongoose')

const getUser = async userId => {
    const select = 'email refCode'

    return models.user.findById(userId).select(select)
}

module.exports = getUser
