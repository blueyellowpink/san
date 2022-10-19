import mongoose from 'mongoose'
import UserModel from './mongo/models/user.model'
import Token from './mongo/models/token.model'
import TradingPair from './mongo/models/pair.model'
import Chain from './mongo/models/chain.model'

import CainanceSequel from './pgsql'

mongoose.set('debug', true)

export const connectToMongo = async (uri: string): Promise<void> => {
    await mongoose.connect(uri)
    console.log('Mongo connected')
}

export const models = {
    user: UserModel,
    Token,
    TradingPair,
    Chain,
}

export { CainanceSequel }
