import { models } from '@cainance/db'

const getRefPoint = async userId => {
    const where = { refer: userId }

    return models.user.countDocuments(where)
}

export default getRefPoint
