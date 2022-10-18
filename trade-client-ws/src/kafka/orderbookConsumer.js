"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrderbookConsumer = void 0;
const tslib_1 = require("tslib");
const node_rdkafka_1 = tslib_1.__importDefault(require("node-rdkafka"));
const cainance_1 = require("cainance");
const cache_1 = require("../cache");
const kafkaConfig = cainance_1.KafkaConfig.createConsumerConfigMap(cainance_1.KafkaConfig.configFromPath('librdkafka.config'));
const createOrderbookConsumer = (nsp, pair) => {
    const topic = `${pair}-orderbook-data`;
    const consumer = new node_rdkafka_1.default.KafkaConsumer(Object.assign(Object.assign({}, kafkaConfig), { 'group.id': `${topic}-orderbook-consumer` }), {
        'auto.offset.reset': 'earliest',
    });
    consumer
        .on('ready', () => {
        console.log('kafka consumer ready');
        consumer.subscribe([topic]);
        consumer.consume(); // start consuming messages
    })
        .on('data', ({ topic, key, value }) => {
        cache_1.redis.hSet('orderbook', pair, Buffer.from(value));
        const orderbook = cainance_1.proto.OrderBook.deserializeBinary(value).toObject();
        nsp.emit('orderbook', orderbook);
    })
        .on('event.log', log => {
        console.log(log);
    })
        .on('disconnected', arg => {
        console.log('consumer disconnected. ' + JSON.stringify(arg));
    });
    consumer.connect();
};
exports.createOrderbookConsumer = createOrderbookConsumer;
//# sourceMappingURL=orderbookConsumer.js.map