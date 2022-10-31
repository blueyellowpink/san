"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const db_1 = require("@cainance/db");
const kafka_1 = require("./libs/kafka");
const globalConfig_1 = tslib_1.__importDefault(require("./globalConfig"));
console.log(globalConfig_1.default);
require("./server");
(0, db_1.connectToMongo)(globalConfig_1.default.db.mongo.uri);
db_1.CainanceSequel.connect({
    database: globalConfig_1.default.db.pgsql.database,
    user: globalConfig_1.default.db.pgsql.user,
    password: globalConfig_1.default.db.pgsql.password,
    host: globalConfig_1.default.db.pgsql.host,
}, {
    sync: false,
});
kafka_1.producer.connect();
!(() => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    yield db_1.redis.connect();
    console.log('Redis connected');
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
}))();
//# sourceMappingURL=main.js.map