"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const http_1 = tslib_1.__importDefault(require("http"));
const express_1 = tslib_1.__importDefault(require("express"));
const globalConfig_1 = tslib_1.__importDefault(require("./globalConfig"));
const path_1 = tslib_1.__importDefault(require("path"));
const cookie_parser_1 = tslib_1.__importDefault(require("cookie-parser"));
const morgan_1 = tslib_1.__importDefault(require("morgan"));
const router_1 = tslib_1.__importDefault(require("./router/router"));
const { port, basePath } = globalConfig_1.default.server;
const app = (0, express_1.default)();
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(basePath, router_1.default);
app.use(router_1.default);
app.set(port);
const server = http_1.default.createServer(app);
server.listen(port);
server.on('error', e => {
    console.error(e);
    process.exit(1);
});
server.on('listening', () => console.log(`http://127.0.0.1:${port}${basePath}`));
//# sourceMappingURL=server.js.map