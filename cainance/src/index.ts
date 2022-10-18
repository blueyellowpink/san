// kafka
import KafkaConfig from './kafka'

// kafka topic
import Topic from './topics'

// db
import CainanceSequel from './db/mysql'
import CainanceMongo from './db/mongo'
import Influx from './db/influx'

// proto
import Order from './proto/order_pb'
import Trade from './proto/trade_pb'
import Request from './proto/request_pb'
import OrderBook from './proto/orderbook_pb'
import Tick from './proto/tick_pb'
import Candlestick from './proto/candlestick_pb'

// config
import CainanceConfig, { Config } from './config'

// protobuf
const proto = {
    ...Order,
    ...Trade,
    ...Request,
    ...OrderBook,
    ...Tick,
    ...Candlestick,
}

// export types
export { Config }

// export objects
export {
    CainanceConfig,
    CainanceSequel,
    CainanceMongo,
    proto,
    Topic,
    Influx,
    KafkaConfig,
}

export enum OrderType {
    LIMIT,
    MARKET,
    STOP_LIMIT,
    OCO,
}

export enum OrderSide {
    ASK,
    BID,
}
