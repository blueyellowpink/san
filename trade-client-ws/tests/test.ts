import { io } from 'socket.io-client'

const ioConfig = {
    reconnectionDelayMax: 5000,
    transports: ['websocket', 'polling'], // use websocket first if available
    parser: require('socket.io-msgpack-parser'),
    path: '/ws/trade/',
}

const socket = io('http://cainance-dev.cainance.xyz/sol-usdt', ioConfig)
// const socket = io('ws://localhost:3000/sol-usdt', ioConfig)

socket.on('connect_error', () => {
    socket.io.opts.transports = ['polling', 'websocket']
})

socket.on('connect', () => {
    console.log('connected')
})

socket.on('orderbook', data => {
    console.log(data)
    /*
    {
        askPairsList: [ { price: 6.1, size: 10.1 }, { price: 6.2, size: 10.1 }, ... ], // sorted ascending by 'price'
        bidPairsList: [ { price: 5.1, size: 10.1 }, { price: 5.0, size: 10.1 }, ... ]  // sorted descending by 'price'
    }
    */
})

socket.on('ticks', data => {
    console.log('ticks', data.ticksList.length)
    /*
    [
        { price: 5.5, amount: 1.1, timestamp: 1651228467000 },
        { price: 5.5, amount: 1.1, timestamp: 1651228466000 },
        { price: 5.5, amount: 1.1, timestamp: 1651228465000 },
        { price: 5.5, amount: 1.1, timestamp: 1651228464000 },
        ...
    ]
    */
})

const getAggregationCandlestick = (timeWindow: string) => {
    socket.emit('candlesticks', { timeWindow }, resp => {
        console.log(timeWindow, resp.candlesticksList.length)
        /* [
          {
            volume: 469141.93222832156,
            open: 100.55555555,
            close: 190.40247306,
            high: 995.77643115,
            low: 0.59536683,
            timestamp: 1655984139000
          },
          {
            volume: 1159128.7484870914,
            open: 100.55555555,
            close: 921.36456811,
            high: 999.89332221,
            low: 0.43195921,
            timestamp: 1656028800000
          },
          {
            volume: 487848.6386070398,
            open: 586.98503282,
            close: 470.50793177,
            high: 999.54290627,
            low: 1.07324533,
            timestamp: 1656115200000
          },
          {
            volume: 119305.36618526997,
            open: 724.8626172,
            close: 446.64248623,
            high: 995.75303582,
            low: 3.80220826,
            timestamp: 1656201600000
          }
        ] */

        socket.on(`${timeWindow}-candlesticks`, data => {
            console.log(timeWindow, data.candlesticksList.length)
        })
    })
}

// minutes
getAggregationCandlestick('1m')
getAggregationCandlestick('3m')
getAggregationCandlestick('5m')
getAggregationCandlestick('15m')
getAggregationCandlestick('30m')

// hours
getAggregationCandlestick('1h')
getAggregationCandlestick('2h')
getAggregationCandlestick('4h')
getAggregationCandlestick('6h')
getAggregationCandlestick('8h')
getAggregationCandlestick('12h')

// days
getAggregationCandlestick('1d')
getAggregationCandlestick('3d')

// weeks
getAggregationCandlestick('1w')

// months
getAggregationCandlestick('1M')
