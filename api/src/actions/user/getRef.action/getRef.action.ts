import getRefPoint from './getRefPoint'
import getUser from './getUser'

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

export default getRefAction
