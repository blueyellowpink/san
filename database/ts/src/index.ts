import mongoose from 'mongoose'
import UserModel from './mongo/models/user.model'

mongoose.set('debug', true)

export const connectToMongo = async (uri: string): Promise<void> => {
    await mongoose.connect(uri)
    console.log('Mongo connected')
}

export default {
    user: UserModel,
}
