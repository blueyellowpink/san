// protobuf
import Order from './proto/order_pb'
import Trade from './proto/trade_pb'
import Request from './proto/request_pb'
import OrderBook from './proto/orderbook_pb'
import Tick from './proto/tick_pb'
import Candlestick from './proto/candlestick_pb'

const proto = {
    ...Order,
    ...Trade,
    ...Request,
    ...OrderBook,
    ...Tick,
    ...Candlestick,
}

export { proto }
