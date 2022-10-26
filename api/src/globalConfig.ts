const globalConfig = {
    appName: process.env.APP_NAME,

    server: {
        port: +process.env.PORT,
        basePath: process.env.BASE_PATH,
    },

    db: {
        mongo: {
            uri: process.env.MONGO_URI,
        },
        pgsql: {
            database: process.env.PGSQL_DATABASE,
            user: process.env.PGSQL_USER,
            password: process.env.PGSQL_PASSWORD,
            host: process.env.PGSQL_HOST,
        },
    },

    jwt: {
        secret: process.env.JWT_SECRET,
    },
}

export default globalConfig
