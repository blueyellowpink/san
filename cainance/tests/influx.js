"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const influxdb_client_1 = require("@influxdata/influxdb-client");
const src_1 = require("../src");
const influx = new src_1.Influx({
    url: 'https://us-west-2-2.aws.cloud2.influxdata.com',
    token: 'wgPtMEBxOtX8eiwNAI70wU82EWxCUh3w_63z09XYIDvBV0CvVhekKNSYJwvssA_Rsyc4ZApJdQSqjSwh5Cloog==',
    org: 'trasuadev@gmail.com',
});
const getRandomFloat = () => {
    return parseFloat((Math.random() * 1000).toFixed(8));
};
influx.connect().then(() => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    console.log('connected');
    const query = `
        from(bucket: "orderbook_ticks")
            |> range(start: 0)
            |> filter(fn: (r) => r._measurement == "orderbook_ticks" and r.pair == "sol-usdt")
            |> sort(columns: ["_time"], desc: true)
            |> limit(n: 100)
            |> pivot(rowKey: ["_time"], columnKey: ["_field"], valueColumn: "_value")
    `;
    /* const consumer = {
        next: (row, tableMeta) => {
            const o = tableMeta.toObject(row)
            console.log(`${o.price} ${o.amount} ${o._time}`)
        },
        error: err => {
            console.log(err.message)
        },
        complete: () => {
            console.log('completed')
        },
    }
    for (let i = 0; i < 1; i++) {
        // influx.queryRows(query, consumer)
        const rows = await influx.query.collectRows(query, row => [
            row[7],
            row[8],
            row[4],
        ])
        console.log(rows)
    } */
    setInterval(() => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const tick = new influxdb_client_1.Point('orderbook_ticks')
            .floatField('price', getRandomFloat())
            .floatField('amount', getRandomFloat())
            .timestamp(Date.now());
        yield influx.writeOrderBookTick(tick, 'trasuadev@gmail.com', 'orderbook_ticks', 'sol-usdt');
    }), 30000);
}));
//# sourceMappingURL=influx.js.map