const { models } = require('../../../db/mongo/mongoose')

const getRefPoint = async userId => {
    const where = { refer: userId }

    return models.user.countDocuments(where)
}

module.exports = getRefPoint
