/* import Websocket from 'ws'

const ws = new Websocket(
    'ws://localhost:3000/streams?symbol=BTC/USDT&timeWindow=12'
)

ws.on('open', () => {
    ws.send('client send something')
})

ws.on('message', (data: string) => {
    console.log('received ', JSON.parse(data))
}) */

const forEach = (items, callback) => {
	for (let index = 0; index < items.length; index++) {
		callback(items[index])
	}
}

test('test', async () => {
	const mockCallback = jest.fn(x => 1 + x)
	console.log(mockCallback.mock.calls)

	forEach([0, 1], mockCallback)

	console.log(mockCallback.mock.calls)

	const mockFn = jest.fn()
	mockFn.mockReturnValueOnce(10).mockReturnValueOnce(20).mockReturnValue(true)
	console.log(mockFn(1), mockFn(), mockFn())

	expect(mockFn).toHaveBeenCalled()
	expect(mockFn).toHaveBeenCalledWith(1)
})

const funcs = {
	a: () => 'a'
}

class API {
	static hit() {
		return funcs.a()
	}
}

test('test #2', async () => {
	console.log(API.hit())
	// jest.spyOn(funcs, 'a').mockImplementationOnce(() => 'b')
	jest.spyOn(funcs, 'a').mockReturnValueOnce('b')

	const mockData = {
		data: 'mock',
	}

	expect(API.hit()).toBe('b')
	expect(API.hit()).toBe('a')
})
