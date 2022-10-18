/* import './globalConfig'
import './server' */

// connectToMongo()

import models from '@cainance/db'

const user = new models.user({
	email: 'email',
	password: '123',
	refCode: 'qwe123',
	twoFactorSecret: '2fa'
})
console.log(user)
