import Kafka from 'node-rdkafka';
import { configFromPath, createConfigMap } from './utils';

const partition = -1;

const kafkaProducer = new Kafka.Producer(
    createConfigMap(configFromPath('librdkafka.config'))
);

export const kafkaConnect = () => {
    let pollLoop = null;

    kafkaProducer
        .on('delivery-report', (err, report) => {
            if (err) {
                console.log(err.message);
            } else {
                let { topic, key } = report;
                console.log(`Produced event to ${topic} with key ${key} `);
            }
        })
        .on('event.log', log => {
            console.log(log);
        })
        .on('event.error', err => {
            console.log(err.message);
        })
        .on('ready', args => {
            console.log('Kafka ready');

            pollLoop = setInterval(() => {
                kafkaProducer.poll();
            }, 1000);
        })
        .on('disconnected', args => {
            clearInterval(pollLoop);
            console.log('Kafka disconnected');
        });

    kafkaProducer.connect();
};

export const produceMessage = (
    topic: string,
    message: Uint8Array,
    key: any
) => {
    kafkaProducer.produce(
        topic,
        partition,
        Buffer.from(message),
        key,
        Date.now()
    );
};
