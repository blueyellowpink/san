import { connectToMongo, CainanceSequel } from '@cainance/db'

import config from './globalConfig'
console.log(config)
import './server'

connectToMongo(config.db.mongo.uri)

CainanceSequel.connect({
	database: config.db.pgsql.database,
	user: config.db.pgsql.user,
	password: config.db.pgsql.password,
	host: config.db.pgsql.host,
}, {
	sync: false
})
