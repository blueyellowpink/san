"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTopics = exports.producer = exports.kafka = void 0;
const tslib_1 = require("tslib");
const kafkajs_1 = require("kafkajs");
const globalConfig_1 = tslib_1.__importDefault(require("../../globalConfig"));
const db_1 = require("@cainance/db");
exports.kafka = new kafkajs_1.Kafka({
    clientId: 'api',
    brokers: globalConfig_1.default.kafka.brokers,
});
exports.producer = exports.kafka.producer({
    createPartitioner: kafkajs_1.Partitioners.DefaultPartitioner,
});
exports.producer.on('producer.connect', () => {
    console.log(`KafkaProvider: connected`);
});
exports.producer.on('producer.disconnect', () => {
    console.log(`KafkaProvider: could not connect`);
});
const createTopics = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const rows = yield db_1.models.TradingPair.find().select('-_id name').lean();
    if (!rows) {
        throw new Error('Trading pair not found');
    }
    const topics = rows.map(row => {
        return {
            topic: row.name.toLowerCase().replace('/', '-') + '-orders',
        };
    });
    const admin = exports.kafka.admin();
    yield admin.connect();
    const result = yield admin.createTopics({ topics });
    const createdTopics = yield admin.listTopics();
    // console.log(createdTopics)
    yield admin.disconnect();
});
exports.createTopics = createTopics;
//# sourceMappingURL=index.js.map