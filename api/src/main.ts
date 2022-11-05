import { connectToMongo, CainanceSequel, redis } from '@cainance/db'
import { producer, kafka, createTopics } from './libs/kafka'

import { proto } from '@cainance/protobuf'

import config from './globalConfig'
console.log(config)
import './server'

connectToMongo(config.db.mongo.uri)

CainanceSequel.connect(
    {
        database: config.db.pgsql.database,
        user: config.db.pgsql.user,
        password: config.db.pgsql.password,
        host: config.db.pgsql.host,
    },
    {
        sync: false,
    }
)

// producer.connect()

!(async () => {
    await redis.connect()
    console.log('Redis connected')

    // await createTopics()

    /* const consumer = kafka.consumer({ groupId: 'api-consumer' })
	await consumer.connect()
	await consumer.subscribe({
		topics: ['sol-usdt-orders'],
		fromBeginning: true
	})

	await consumer.run({
		autoCommitInterval: 10000,
		eachMessage: async ({ topic, partition, message }) => {
			const orderPb = proto.Order.deserializeBinary(message.value)
			console.log(orderPb.toObject())
		}
	}) */
})()
