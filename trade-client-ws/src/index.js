"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const http_1 = tslib_1.__importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cache_1 = require("./cache");
const subscribers_1 = require("./subscribers");
const namespaces_1 = require("./namespaces");
const cainance_1 = require("cainance");
!(() => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    app.get('/', (req, res) => {
        res.send('Hello world');
    });
    const server = http_1.default.createServer(app);
    const io = new socket_io_1.Server(server, {
        parser: require('socket.io-msgpack-parser'),
        path: '/ws/trade/',
        cors: {
            origin: '*',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            preflightContinue: false,
            optionsSuccessStatus: 204,
        },
    });
    yield cache_1.redis.connect();
    yield subscribers_1.subscriber.connect();
    console.log('redis connected');
    yield cainance_1.CainanceSequel.connect({
        database: cainance_1.CainanceConfig.MYSQL_DB,
        user: cainance_1.CainanceConfig.MYSQL_USER,
        password: cainance_1.CainanceConfig.MYSQL_PASSWORD,
        host: cainance_1.CainanceConfig.MYSQL_HOST,
    });
    yield (0, namespaces_1.createNamespaces)(io);
    yield (0, subscribers_1.createSubscribers)(io);
    server.listen(3000, () => {
        console.log('listening on *:3000');
    });
}))();
//# sourceMappingURL=index.js.map