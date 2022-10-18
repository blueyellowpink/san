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
		pg: {
			uri: process.env.PG_URI,
		}
    },

    jwt: {
        secret: process.env.JWT_SECRET,
    },
}

export default globalConfig
