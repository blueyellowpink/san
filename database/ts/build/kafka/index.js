"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// kafka
const kafkajs_1 = require("kafkajs");
class KafkaClient {
    constructor({ clientId, brokers }) {
        this.kafka = new kafkajs_1.Kafka({
            clientId,
            brokers,
        });
        this.producer = this.kafka.producer({ createPartitioner: kafkajs_1.Partitioners.DefaultPartitioner });
        this.producer.on('producer.connect', () => {
            console.log('KafkaProvider: connected');
        });
        this.producer.on('producer.disconnect', () => {
            console.log('KafkaProvider: could not connect');
        });
        this.consumer = this.kafka.consumer();
    }
}
exports.default = KafkaClient;
//# sourceMappingURL=index.js.map