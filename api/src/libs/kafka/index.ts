import { Kafka, Partitioners } from 'kafkajs'
import config from '../../globalConfig'
import { models } from '@cainance/db'

export const kafka = new Kafka({
    clientId: 'api',
    brokers: config.kafka.brokers,
})

export const producer = kafka.producer({
    createPartitioner: Partitioners.DefaultPartitioner,
})
producer.on('producer.connect', () => {
    console.log(`KafkaProvider: connected`)
})
producer.on('producer.disconnect', () => {
    console.log(`KafkaProvider: could not connect`)
})

export const createTopics = async () => {
    const rows = await models.TradingPair.find().select('-_id name').lean()
    if (!rows) {
        throw new Error('Trading pair not found')
    }
    const topics = rows.map(row => {
        return {
            topic: row.name.toLowerCase().replace('/', '-') + '-orders',
        }
    })
    const admin = kafka.admin()
    await admin.connect()

    const result = await admin.createTopics({ topics })
    const createdTopics = await admin.listTopics()
    // console.log(createdTopics)

    await admin.disconnect()
}
