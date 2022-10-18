const { models } = require('../../../db/mongo/mongoose')

const getRefer = async ({ refCode }) => {
    const where = { refCode }
    const select = `_id refCode`

    const refer = await models.user.findOne(where).select(select)

    if (!refer) return null

    return refer
}

module.exports = getRefer
