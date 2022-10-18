"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const influxdb_client_1 = require("@influxdata/influxdb-client");
class Influx {
    constructor(params) {
        this.org = params.org;
        this.client = new influxdb_client_1.InfluxDB({
            url: params.url,
            token: params.token,
        });
    }
    connect() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.query = this.client.getQueryApi(this.org);
        });
    }
    queryRows(query, consumer) {
        this.query.queryRows(query, consumer);
    }
    writeOrderBookTick(point, org, bucket, pair) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const writeApi = this.client.getWriteApi(org, bucket, 'ms');
            writeApi.useDefaultTags({ pair });
            writeApi.writePoint(point);
            writeApi
                .close()
                .then(() => {
                console.log('FINISHED');
            })
                .catch(err => {
                console.log(err.message);
            });
        });
    }
    writeBatchOrderBookTick(points, org, bucket, pair) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const writeApi = this.client.getWriteApi(org, bucket, 'ms');
            writeApi.useDefaultTags({ pair });
            writeApi.writePoint(points);
            writeApi
                .close()
                .then(() => {
                console.log('FINISHED');
            })
                .catch(err => {
                console.log(err.message);
            });
        });
    }
}
exports.default = Influx;
//# sourceMappingURL=index.js.map