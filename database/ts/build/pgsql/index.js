"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sequelize_1 = require("sequelize");
const Order_1 = tslib_1.__importDefault(require("./models/Order"));
const Trade_1 = tslib_1.__importDefault(require("./models/Trade"));
const Wallet_1 = require("./models/Wallet");
class CainanceSequel {
    static connect({ database, user, password, host, }, options = {}) {
        var _a, _b, _c, _d, _e;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            options.port = (_a = options.port) !== null && _a !== void 0 ? _a : 5432;
            options.dev = (_b = options.dev) !== null && _b !== void 0 ? _b : true;
            options.logging = (_c = options.logging) !== null && _c !== void 0 ? _c : console.log;
            options.sync = (_d = options.sync) !== null && _d !== void 0 ? _d : false;
            options.force = (_e = options.force) !== null && _e !== void 0 ? _e : false;
            CainanceSequel.sequelize = new sequelize_1.Sequelize(database, user, password, {
                host,
                dialect: 'postgres',
                logging: options.logging,
                port: options.port,
                dialectOptions: { connectTimeout: 30000 },
            });
            try {
                yield CainanceSequel.sequelize.authenticate();
                console.log('pgSQL connection has been established successfully.');
            }
            catch (err) {
                console.log('Unable to connect to pgSQL', err.message);
            }
            CainanceSequel.initModel();
            CainanceSequel.initAssociation();
            if (options.sync) {
                yield CainanceSequel.sync(options.dev, options.force);
            }
        });
    }
    static sync(dev, force) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield CainanceSequel.sequelize
                .sync({ alter: true, force })
                .then(() => console.log('all models have been synced'));
        });
    }
    static initModel() {
        CainanceSequel.Order = (0, Order_1.default)(CainanceSequel.sequelize);
        CainanceSequel.Trade = (0, Trade_1.default)(CainanceSequel.sequelize);
        CainanceSequel.SpotWallet = (0, Wallet_1.spotWalletDefine)(CainanceSequel.sequelize);
    }
    static initAssociation() {
        /* An Order has many Trade(s) */
        CainanceSequel.Order.hasMany(CainanceSequel.Trade, {
            foreignKey: {
                allowNull: false
            }
        });
        CainanceSequel.Trade.belongsTo(CainanceSequel.Order);
    }
}
exports.default = CainanceSequel;
//# sourceMappingURL=index.js.map