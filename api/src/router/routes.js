const authRoutes = require('./auth.routes')
const pingRoutes = require('./ping.routes')
const userRoutes = require('./user.routes')

const routes = [...authRoutes, ...userRoutes, ...pingRoutes]

module.exports = routes
