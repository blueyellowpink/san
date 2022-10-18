"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.produceMessage = exports.kafkaConnect = void 0;
const tslib_1 = require("tslib");
const node_rdkafka_1 = tslib_1.__importDefault(require("node-rdkafka"));
const utils_1 = require("./utils");
const partition = -1;
const kafkaProducer = new node_rdkafka_1.default.Producer((0, utils_1.createConfigMap)((0, utils_1.configFromPath)('librdkafka.config')));
const kafkaConnect = () => {
    let pollLoop = null;
    kafkaProducer
        .on('delivery-report', (err, report) => {
        if (err) {
            console.log(err.message);
        }
        else {
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
exports.kafkaConnect = kafkaConnect;
const produceMessage = (topic, message, key) => {
    kafkaProducer.produce(topic, partition, Buffer.from(message), key, Date.now());
};
exports.produceMessage = produceMessage;
//# sourceMappingURL=index.js.map