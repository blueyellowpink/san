"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sequelize_1 = require("sequelize");
const models_1 = tslib_1.__importDefault(require("./models"));
class CainanceSequel {
    static connect({ database, user, password, host, }, options = {}) {
        var _a, _b, _c, _d, _e;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            options.port = (_a = options.port) !== null && _a !== void 0 ? _a : 25060;
            options.dev = (_b = options.dev) !== null && _b !== void 0 ? _b : true;
            options.logging = (_c = options.logging) !== null && _c !== void 0 ? _c : false;
            options.sync = (_d = options.sync) !== null && _d !== void 0 ? _d : false;
            options.force = (_e = options.force) !== null && _e !== void 0 ? _e : false;
            CainanceSequel.sequelize = new sequelize_1.Sequelize(database, user, password, {
                host,
                dialect: 'mysql',
                logging: options.logging,
                port: options.port,
                dialectOptions: { connectTimeout: 30000 },
            });
            try {
                yield CainanceSequel.sequelize.authenticate();
                console.log('MySQL connection has been established successfully.');
            }
            catch (err) {
                console.log('Unable to connect to MySQL', err.message);
            }
            CainanceSequel.initModel();
            if (options.sync) {
                yield CainanceSequel.sync(options.dev, options.force);
            }
        });
    }
    static sync(dev, force) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (dev) {
                yield CainanceSequel.sequelize
                    .sync({ alter: true, match: /dev$/, force }) // match all database end with 'dev'
                    .then(() => console.log('all models have been synced'));
            }
            else {
                yield CainanceSequel.sequelize
                    .sync({ alter: true, force })
                    .then(() => console.log('all models have been synced'));
            }
        });
    }
    static initModel() {
        CainanceSequel.Pair = models_1.default.pairDefine(CainanceSequel.sequelize);
        CainanceSequel.Order = models_1.default.orderDefine(CainanceSequel.sequelize);
        CainanceSequel.Trade = models_1.default.tradeDefine(CainanceSequel.sequelize);
        CainanceSequel.Account = models_1.default.accountDefine(CainanceSequel.sequelize);
        CainanceSequel.Order.belongsTo(CainanceSequel.Pair);
        CainanceSequel.Order.belongsTo(CainanceSequel.Account, {
            foreignKey: 'userId',
        });
        CainanceSequel.Account.hasMany(CainanceSequel.Order, {
            foreignKey: 'userId',
        });
    }
}
exports.default = CainanceSequel;
//# sourceMappingURL=index.js.map