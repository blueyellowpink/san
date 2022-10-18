import { models } from '@cainance/db'

const getUser = async userId => {
    const select = 'email refCode'

    return models.user.findById(userId).select(select)
}

export default getUser
