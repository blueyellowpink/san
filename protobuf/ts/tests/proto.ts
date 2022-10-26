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
})

test('PriceSizePair protobuf', () => {
	const pair = new proto.PriceSizePair()
})

test('OrderBook protobuf', () => {
	const book = new proto.OrderBook()
})

test('MatchedOrder protobuf', () => {
	const matchedOrder = new proto.MatchedOrder()
})

test('MatchedPair protobuf', () => {
	const matchedPair = new proto.MatchedPair()
})

test('Candlestick protobuf', () => {
	const candlestick = new proto.Candlestick()
})

test('Candlesticks protobuf', () => {
	const candlesticks = new proto.Candlesticks()
})

test('Request protobuf', () => {
	const request = new proto.Request()
})

test('Modify protobuf', () => {
	const modify = new proto.Modify()
})

test('Cancel protobuf', () => {
	const cancel = new proto.Cancel()
})

test('Add protobuf', () => {
	const add = new proto.Add()
})

test('Tick protobuf', () => {
	const tick = new proto.Tick()
})

test('Ticks protobuf', () => {
	const ticks = new proto.Ticks()
})
