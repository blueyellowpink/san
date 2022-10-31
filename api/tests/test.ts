import Websocket from 'ws'

const ws = new Websocket(
    'ws://localhost:3000/streams?symbol=BTC/USDT&timeWindow=12'
)

ws.on('open', () => {
    ws.send('client send something')
})

ws.on('message', (data: string) => {
    console.log('received ', JSON.parse(data))
})
