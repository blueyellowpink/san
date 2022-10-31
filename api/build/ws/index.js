"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ws_1 = require("ws");
const query_string_1 = tslib_1.__importDefault(require("query-string"));
const validate_1 = require("./validate");
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
};
const tradeData = {
    stream: 'trade',
    data: [
        [5.5, 1.1, 1651228467000],
        [5.5, 1.1, 1651228467000],
        [5.5, 1.1, 1651228467000],
        [5.5, 1.1, 1651228467000], // [price, amount, timestamp]
    ],
};
const candlestickData = {
    stream: 'candlestick',
    data: [
        [
            469141.93222832156,
            100.55555555,
            190.40247306,
            995.77643115,
            0.59536683,
            1655984139000, // timestamp
        ],
        [
            469141.93222832156,
            100.55555555,
            190.40247306,
            995.77643115,
            0.59536683,
            1655984139000, // timestamp
        ],
    ],
};
const websocket = server => {
    const wss = new ws_1.WebSocketServer({ server, path: '/streams' });
    wss.on('connection', (ws, req) => {
        var _a;
        try {
            const query = (_a = req === null || req === void 0 ? void 0 : req.url) === null || _a === void 0 ? void 0 : _a.split('?');
            const params = (0, validate_1.validateStream)(query_string_1.default.parse(query[1]));
            orderbookData.stream += params.symbol;
            tradeData.stream += params.symbol;
            candlestickData.stream += params.symbol;
        }
        catch (err) {
            ws.send(JSON.stringify({ error: 'Error' }), () => {
                ws.close();
            });
        }
        let sendInterval = null;
        ws.isAlive = true;
        ws.on('pong', () => {
            ws.isAlive = true;
        });
        ws.on('close', (code, message) => {
            clearInterval(sendInterval);
        });
        ws.on('message', (data) => {
            sendInterval = setInterval(() => {
                ws.send(JSON.stringify(orderbookData));
                ws.send(JSON.stringify(tradeData));
                ws.send(JSON.stringify(candlestickData));
            }, 5000);
        });
    });
    wss.on('error', error => {
        console.log('Cannot start server', error);
    });
    const interval = setInterval(() => {
        wss.clients.forEach(ws => {
            if (!ws.isAlive) {
                return ws.terminate();
            }
            ws.isAlive = false;
            ws.ping();
        });
    }, 5000);
    wss.on('close', () => {
        clearInterval(interval);
    });
};
exports.default = websocket;
//# sourceMappingURL=index.js.map