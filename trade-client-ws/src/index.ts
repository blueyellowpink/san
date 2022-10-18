import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import { redis } from './cache'
import { subscriber, createSubscribers } from './subscribers'
import { createNamespaces } from './namespaces'
import { CainanceConfig, CainanceSequel } from 'cainance'

!(async () => {
    const app = express()
    app.get('/', (req, res) => {
        res.send('Hello world')
    })

    const server = http.createServer(app)
    const io = new Server(server, {
        parser: require('socket.io-msgpack-parser'),
        path: '/ws/trade/',
        cors: {
            origin: '*',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            preflightContinue: false,
            optionsSuccessStatus: 204,
        },
    })

    await redis.connect()
    await subscriber.connect()
    console.log('redis connected')

    await CainanceSequel.connect({
        database: CainanceConfig.MYSQL_DB,
        user: CainanceConfig.MYSQL_USER,
        password: CainanceConfig.MYSQL_PASSWORD,
        host: CainanceConfig.MYSQL_HOST,
    })

    await createNamespaces(io)
    await createSubscribers(io)

    server.listen(3000, () => {
        console.log('listening on *:3000')
    })
})()
