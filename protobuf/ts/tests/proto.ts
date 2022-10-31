import { proto } from '../src'

test('OrderEnum protobuf', () => {
	expect(proto.OrderSide.ASK).toBe(0)
	expect(proto.OrderSide.BID).toBe(1)

	expect(proto.OrderType.LIMIT).toBe(0)
	expect(proto.OrderType.MARKET).toBe(1)
	expect(proto.OrderType.STOP_LIMIT).toBe(2)
	expect(proto.OrderType.OCO).toBe(3)
})

test('Order protobuf', () => {
	const order = new proto.Order()
	order.setOrderId(1)
	order.setAccountId('634ee82058c172b74fea01a5')
	order.setAllowance(100)
	order.setPair('BTC/USDT')
	order.setPrice(5.5)
	order.setAmount(1.1)
	order.setSide(proto.OrderSide.BID)
	order.setType(proto.OrderType.MARKET)

	expect(order.getOrderId()).toBe(1)
	expect(order.getAccountId()).toBe('634ee82058c172b74fea01a5')
	expect(order.getAllowance()).toBe(100)
	expect(order.getPair()).toBe('BTC/USDT')
	expect(order.getPrice()).toBe(5.5)
	expect(order.getAmount()).toBe(1.1)
	expect(order.getSide()).toBe(1)
	expect(order.getType()).toBe(1)
})

test('Trade protobuf', () => {
	const trade = new proto.Trade()
	trade.setInitSide(proto.OrderSide.BID)
	trade.setInitType(proto.OrderType.MARKET)
	// trade.setTradesList(proto.OrderType.MARKET)
})

test('PriceSizePair protobuf', () => {
	const pair = new proto.PriceSizePair()
	pair.setPrice(1)
	pair.setSize(1)

	expect(pair.getPrice()).toBe(1)
	expect(pair.getSize()).toBe(1)
})

test('OrderBook protobuf', () => {
	const book = new proto.OrderBook()
})

test('MatchedOrder protobuf', () => {
	const matchedOrder = new proto.MatchedOrder()
	matchedOrder.setOrderId(1)
	matchedOrder.setAccountId('634ee82058c172b74fea01a5')
	matchedOrder.setAmount(1)

	expect(matchedOrder.getOrderId()).toBe(1)
	expect(matchedOrder.getAccountId()).toBe('634ee82058c172b74fea01a5')
	expect(matchedOrder.getAmount()).toBe(1)
})

test('MatchedPair protobuf', () => {
	const matchedOrder = new proto.MatchedOrder()
	matchedOrder.setOrderId(1)
	matchedOrder.setAccountId('634ee82058c172b74fea01a5')
	matchedOrder.setAmount(1)

	const matchedPair = new proto.MatchedPair()
	matchedPair.setPrice(1)
	matchedPair.setInitOrder(matchedOrder)
	matchedPair.setMatchedOrdersList([matchedOrder])

	expect(matchedPair.getPrice()).toBe(1)
	expect(matchedPair.getInitOrder()).toBe(matchedOrder)
	// expect(matchedPair.getMatchedOrdersList()).toBe([matchedOrder])
})

test('Candlestick protobuf', () => {
	const candlestick = new proto.Candlestick()
	candlestick.setVolume(1)
	candlestick.setOpen(1)
	candlestick.setClose(1)
	candlestick.setHigh(1)
	candlestick.setLow(1)
	candlestick.setTimestamp(1)

	expect(candlestick.getVolume()).toBe(1)
	expect(candlestick.getOpen()).toBe(1)
	expect(candlestick.getClose()).toBe(1)
	expect(candlestick.getHigh()).toBe(1)
	expect(candlestick.getLow()).toBe(1)
	expect(candlestick.getTimestamp()).toBe(1)
})

test('Candlesticks protobuf', () => {
	const candlestick = new proto.Candlestick()
	candlestick.setVolume(1)
	candlestick.setOpen(1)
	candlestick.setClose(1)
	candlestick.setHigh(1)
	candlestick.setLow(1)
	candlestick.setTimestamp(1)

	const candlesticks = new proto.Candlesticks()
	candlesticks.setCandlesticksList([candlestick])
})

test('Request protobuf', () => {
	const order = new proto.Order()
	order.setOrderId(1)
	order.setAccountId('634ee82058c172b74fea01a5')
	order.setAllowance(100)
	order.setPair('BTC/USDT')
	order.setPrice(5.5)
	order.setAmount(1.1)
	order.setSide(proto.OrderSide.BID)
	order.setType(proto.OrderType.MARKET)

	const add = new proto.Add()
	add.setOrder(order)

	const request = new proto.Request()
	request.setAdd(add)

	const cancel = new proto.Cancel()
	cancel.setSide(proto.OrderSide.BID)
	cancel.setPrice(1)
	cancel.setOrderId(1)
	expect(cancel.getSide()).toBe(1)
	expect(cancel.getPrice()).toBe(1)
	expect(cancel.getOrderId()).toBe(1)

	request.setCancel(cancel)
})

test('Cancel protobuf', () => {
	const cancel = new proto.Cancel()
	cancel.setSide(proto.OrderSide.BID)
	cancel.setPrice(1)
	cancel.setOrderId(1)
})

test('Add protobuf', () => {
	const order = new proto.Order()
	order.setOrderId(1)
	order.setAccountId('634ee82058c172b74fea01a5')
	order.setAllowance(100)
	order.setPair('BTC/USDT')
	order.setPrice(5.5)
	order.setAmount(1.1)
	order.setSide(proto.OrderSide.BID)
	order.setType(proto.OrderType.MARKET)

	const add = new proto.Add()
	add.setOrder(order)
})

test('Tick protobuf', () => {
	const tick = new proto.Tick()
	tick.setPrice(1)
	tick.setAmount(1)
	tick.setTimestamp(1)

	expect(tick.getPrice()).toBe(1)
	expect(tick.getAmount()).toBe(1)
	expect(tick.getTimestamp()).toBe(1)
})

test('Ticks protobuf', () => {
	const tick = new proto.Tick()
	tick.setPrice(1)
	tick.setAmount(1)
	tick.setTimestamp(1)

	const ticks = new proto.Ticks()
	ticks.setTicksList([tick])
})
