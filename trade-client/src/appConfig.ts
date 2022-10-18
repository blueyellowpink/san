const port: number = +process.env.PORT || 12100;

const basePath: string = process.env.BASE_PATH || '/api';

const mongoUri: string = process.env.MONGO_URI || '';

const jwtPrivateKey: string = process.env.JWT_PRIVATE_KEY + '';

const appConfig: AppConfig = {
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

export default appConfig;
