interface AppConfig {
    port: number;
    basePath: string;

    database: {
        mysql: {
            db: string;
            user: string;
            password: string;
            host: string;
        };

        mongo: string;
    };

    jwtPrivateKey: string;
}
