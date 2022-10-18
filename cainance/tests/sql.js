"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("dotenv/config");
const dist_1 = require("../dist");
const createPairs = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const pairs = [
        'SOL/USDT',
        'BNB/USDT',
        'ETH/USDT',
        'BTC/USDT',
        'SOL/BUSD',
        'BNB/BUSD',
        'ETH/BUSD',
        'BTC/BUSD',
    ];
    for (const pair of pairs) {
        const resp = yield dist_1.CainanceSequel.Pair.create({
            name: pair,
            slug: pair.toLowerCase().replace('/', '-'),
        });
    }
});
!(() => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    yield dist_1.CainanceSequel.connect({
        database: dist_1.CainanceConfig.MYSQL_DB,
        user: dist_1.CainanceConfig.MYSQL_USER,
        password: dist_1.CainanceConfig.MYSQL_PASSWORD,
        host: dist_1.CainanceConfig.MYSQL_HOST,
    }, {
        sync: false,
        dev: true,
    });
    /* const pairs = await CainanceSequel.Pair.findAll({
        where: { isFavourite: true },
    })
    console.log(pairs.map(pair => pair.toJSON())) */
    /* const orders = await CainanceSequel.Order.findOne({
        where: {
            id: 246
        },
        include: [
            { model: CainanceSequel.Pair },
            { model: CainanceSequel.Account },
        ]
    })
    console.log(orders.toJSON()) */
    /* const accounts = await CainanceSequel.Account.findOne({
        where: {
            id: 9
        },
        include: [{
            model: CainanceSequel.Order,
            required: true
        }]
    })
    console.log(accounts.toJSON()) */
}))();
//# sourceMappingURL=sql.js.map