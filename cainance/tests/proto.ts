import { proto } from '../dist'

const order = new proto.Order()
console.log({ order: order.toObject() })
console.log(proto.OrderSide)
console.log(proto.OrderType)

const trade = new proto.Trade()
console.log({ trade: trade.toObject() })

const matchedPair = new proto.MatchedPair()
console.log({ matchedPair: matchedPair.toObject() })

const matchedOrder = new proto.MatchedOrder()
console.log({ matchedOrder: matchedOrder.toObject() })

const book = new proto.OrderBook()
console.log({ book: book.toObject() })

const pair = new proto.PriceSizePair()
console.log({ pair: pair.toObject() })

const add = new proto.Add()
console.log({ add: add.toObject() })

const cancel = new proto.Cancel()
console.log({ cancel: cancel.toObject() })

const modify = new proto.Modify()
console.log({ modify: modify.toObject() })

const request = new proto.Request()
console.log({ request: request.toObject() })

// tick proto
const tick = new proto.Tick()
console.log({ tick: tick.toObject() })

const ticks = new proto.Ticks()
console.log({ ticks: ticks.toObject() })

// candlestick proto
const candlestick = new proto.Candlestick()
console.log({ candlestick: candlestick.toObject() })

const candlesticks = new proto.Candlesticks()
console.log({ candlesticks: candlestick.toObject() })
