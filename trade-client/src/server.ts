import appConfig from 'appConfig';
import cors from 'cors';
import dayjs from 'dayjs';
import express, { NextFunction } from 'express';
import { Response } from 'express/ts4.0';
import { createServer } from 'http';
import AppRequest from 'interfaces/AppRequest';
import router from 'router';
import middleware from 'i18next-http-middleware';
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import { CainanceMongo, CainanceSequel } from 'cainance';
import { kafkaConnect } from './kafka';

const app = express();

i18next
    .use(Backend)
    .use(middleware.LanguageDetector)
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
app.use(middleware.handle(i18next, {}));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req: AppRequest, res: Response, next: NextFunction) => {
    const current = dayjs();

    req.user = null;
    req.logs = {
        _startedAt: +current,
        _startedAtReadable: current.format('DDMMYY.HHmmss'),
        _url: req.url.split('?')[0],
        _method: req.method,
    };

    next();
});

app.use(appConfig.basePath, router);
app.use(router);

/* middleware error handler */
app.use((err, req, res, next) => {
    // if (!err.status) console.error(err.stack)
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        success: false,
    });
});

const server = createServer(app);
server.listen(appConfig.port);

const _onListening: () => void = () => {
    console.log(`Server started: http://127.0.0.1:${appConfig.port}`);
};
server.on('listening', _onListening);

kafkaConnect();

CainanceSequel.connect({
    database: appConfig.database.mysql.db,
    user: appConfig.database.mysql.user,
    password: appConfig.database.mysql.password,
    host: appConfig.database.mysql.host,
});

CainanceMongo.connect(appConfig.database.mongo).then(() => {
    console.log('mongo connected');
});
