import express from 'express'
import globalConfig from './globalConfig'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
// import router from './router/router'

console.log(globalConfig)

/* const { port, basePath } = globalConfig.server
const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(basePath, router)
app.use(router)
app.set(port)

const server = require('http').createServer(app)
server.listen(port)
server.on('error', e => {
    console.error(e)
    process.exit(1)
})
server.on('listening', () => console.log(`http://127.0.0.1:${port}${basePath}`)) */
