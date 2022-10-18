const { models } = require('../../../db/mongo/mongoose')

const checkExsited = async ({ email }) => {
    const where = { email }
    const select = `_id email`

    const found = await models.user.findOne(where).select(select)

    if (!found) return

    throw new Error('Existed account')
}

module.exports = checkExsited
