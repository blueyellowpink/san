export type Config = {
    MONGO_URI: string | undefined

    MYSQL_HOST: string | undefined
    MYSQL_DB: string | undefined
    MYSQL_USER: string | undefined
    MYSQL_PASSWORD: string | undefined

    KAFKA_PRODUCER_BROKER: string | undefined
    KAFKA_CONSUMER_BROKER: string | undefined

    REDIS_MASTER: string | undefined
    REDIS_SLAVE: string | undefined
    REDIS_PASSWORD: string | undefined

    INFLUX_HOST: string | undefined
    INFLUX_ORG: string | undefined
    INFLUX_TOKEN: string | undefined

    EVM_MNEMONIC_PHRASE: string | undefined
    SOL_MNEMONIC_PHRASE: string | undefined
}

const config: Config = {
    MONGO_URI: process.env.MONGO_URI,

    MYSQL_HOST: process.env.MYSQL_HOST,
    MYSQL_DB: process.env.MYSQL_DB,
    MYSQL_USER: process.env.MYSQL_USER,
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,

    KAFKA_PRODUCER_BROKER: process.env.KAFKA_PRODUCER_BROKER,
    KAFKA_CONSUMER_BROKER: process.env.KAFKA_CONSUMER_BROKER,

    REDIS_MASTER: process.env.REDIS_MASTER,
    REDIS_SLAVE: process.env.REDIS_SLAVE,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,

    INFLUX_HOST: process.env.INFLUX_HOST,
    INFLUX_ORG: process.env.INFLUX_ORG,
    INFLUX_TOKEN: process.env.INFLUX_TOKEN,

    EVM_MNEMONIC_PHRASE: process.env.EVM_MNEMONIC_PHRASE,
    SOL_MNEMONIC_PHRASE: process.env.SOL_MNEMONIC_PHRASE,
}

export default config
