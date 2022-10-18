"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const port = +process.env.PORT || 12100;
const basePath = process.env.BASE_PATH || '/api';
const mongoUri = process.env.MONGO_URI || '';
const jwtPrivateKey = process.env.JWT_PRIVATE_KEY + '';
const appConfig = {
    port: port,
    basePath: basePath,
    database: {
        mongo: mongoUri,
        mysql: {
            db: process.env.MYSQL_DB,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            host: process.env.MYSQL_HOST,
        },
    },
    jwtPrivateKey: jwtPrivateKey,
};
exports.default = appConfig;
//# sourceMappingURL=appConfig.js.map