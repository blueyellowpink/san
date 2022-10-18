import { connectToMongo } from '@cainance/db'

import config from './globalConfig'
console.log(config)
import './server'

connectToMongo(config.db.mongo.uri)
