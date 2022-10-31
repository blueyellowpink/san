import WebSocket, { WebSocketServer } from 'ws'
import queryString from 'query-string'
import { validateStream } from './validate'

const orderbookData = {
    stream: 'orderbook',
    data: {
        ask: [
            { price: 6.1, size: 10.1 },
            { price: 6.2, size: 10.1 },
        ],
        bid: [
            { price: 5.1, size: 10.1 },
            { price: 5.0, size: 10.1 },
        ],
    },
}

const tradeData = {
    stream: 'trade',
    data: [
        [5.5, 1.1, 1651228467000], // [price, amount, timestamp]
        [5.5, 1.1, 1651228467000], // [price, amount, timestamp]
        [5.5, 1.1, 1651228467000], // [price, amount, timestamp]
        [5.5, 1.1, 1651228467000], // [price, amount, timestamp]
    ],
}

const candlestickData = {
    stream: 'candlestick',
    data: [
        [
            469141.93222832156, // volume
            100.55555555, // open
            190.40247306, // close
            995.77643115, // high
            0.59536683, // low
            1655984139000, // timestamp
        ],
        [
            469141.93222832156, // volume
            100.55555555, // open
            190.40247306, // close
            995.77643115, // high
            0.59536683, // low
            1655984139000, // timestamp
        ],
    ],
}

const websocket = server => {
    const wss = new WebSocketServer({ server, path: '/streams' })

    wss.on('connection', (ws: WebSocket, req) => {
        try {
            const query: Array<string> = req?.url?.split('?')
            const params = validateStream(queryString.parse(query[1]))
            orderbookData.stream += params.symbol
            tradeData.stream += params.symbol
            candlestickData.stream += params.symbol
        } catch (err) {
            ws.send(JSON.stringify({ error: 'Error' }), () => {
                ws.close()
            })
        }

        let sendInterval = null
        ws.isAlive = true
        ws.on('pong', () => {
            ws.isAlive = true
        })

        ws.on('close', (code, message) => {
            clearInterval(sendInterval)
        })

        ws.on('message', (data: string) => {
            sendInterval = setInterval(() => {
                ws.send(JSON.stringify(orderbookData))
                ws.send(JSON.stringify(tradeData))
                ws.send(JSON.stringify(candlestickData))
            }, 5000)
        })
    })

    wss.on('error', error => {
        console.log('Cannot start server', error)
    })

    const interval = setInterval(() => {
        wss.clients.forEach(ws => {
            if (!ws.isAlive) {
                return ws.terminate()
            }

            ws.isAlive = false
            ws.ping()
        })
    }, 5000)

    wss.on('close', () => {
        clearInterval(interval)
    })
}

export default websocket
