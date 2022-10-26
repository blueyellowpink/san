"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const db_1 = require("@cainance/db");
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
    sync: false
});
//# sourceMappingURL=main.js.map