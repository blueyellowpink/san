"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const appConfig_1 = tslib_1.__importDefault(require("appConfig"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const dayjs_1 = tslib_1.__importDefault(require("dayjs"));
const express_1 = tslib_1.__importDefault(require("express"));
const http_1 = require("http");
const router_1 = tslib_1.__importDefault(require("router"));
const i18next_http_middleware_1 = tslib_1.__importDefault(require("i18next-http-middleware"));
const i18next_1 = tslib_1.__importDefault(require("i18next"));
const i18next_fs_backend_1 = tslib_1.__importDefault(require("i18next-fs-backend"));
const cainance_1 = require("cainance");
const kafka_1 = require("./kafka");
const app = (0, express_1.default)();
i18next_1.default
    .use(i18next_fs_backend_1.default)
    .use(i18next_http_middleware_1.default.LanguageDetector)
    .init({
    fallbackLng: 'en',
    lowerCaseLng: true,
    load: 'languageOnly',
    backend: {
        loadPath: __dirname + '/locales/{{lng}}/{{ns}}.json',
        addPath: __dirname + '/locales/{{lng}}/{{ns}}.missing.json',
    },
    ns: ['common', 'register', 'login'],
    defaultNS: 'common',
})
    .then(() => {
    console.log('i18n init');
});
app.use(i18next_http_middleware_1.default.handle(i18next_1.default, {}));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((req, res, next) => {
    const current = (0, dayjs_1.default)();
    req.user = null;
    req.logs = {
        _startedAt: +current,
        _startedAtReadable: current.format('DDMMYY.HHmmss'),
        _url: req.url.split('?')[0],
        _method: req.method,
    };
    next();
});
app.use(appConfig_1.default.basePath, router_1.default);
app.use(router_1.default);
/* middleware error handler */
app.use((err, req, res, next) => {
    // if (!err.status) console.error(err.stack)
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        success: false,
    });
});
const server = (0, http_1.createServer)(app);
server.listen(appConfig_1.default.port);
const _onListening = () => {
    console.log(`Server started: http://127.0.0.1:${appConfig_1.default.port}`);
};
server.on('listening', _onListening);
(0, kafka_1.kafkaConnect)();
cainance_1.CainanceSequel.connect({
    database: appConfig_1.default.database.mysql.db,
    user: appConfig_1.default.database.mysql.user,
    password: appConfig_1.default.database.mysql.password,
    host: appConfig_1.default.database.mysql.host,
});
cainance_1.CainanceMongo.connect(appConfig_1.default.database.mongo).then(() => {
    console.log('mongo connected');
});
//# sourceMappingURL=server.js.map