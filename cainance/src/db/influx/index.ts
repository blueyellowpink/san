import { InfluxDB, Point } from '@influxdata/influxdb-client'

class Influx {
    client: any
    query: any
    org: string

    constructor(params: { url: string; token: string; org: string }) {
        this.org = params.org
        this.client = new InfluxDB({
            url: params.url,
            token: params.token,
        })
    }

    async connect(): Promise<void> {
        this.query = this.client.getQueryApi(this.org)
    }

    queryRows(
        query: string,
        consumer: {
            next: (row: any, tableMeta: any) => void
            error: (error: any) => void
            complete: () => void
        }
    ): void {
        this.query.queryRows(query, consumer)
    }

    async writeOrderBookTick(
        point: Point,
        org: string,
        bucket: string,
        pair: string
    ): Promise<void> {
        const writeApi = this.client.getWriteApi(org, bucket, 'ms')
        writeApi.useDefaultTags({ pair })

        writeApi.writePoint(point)

        writeApi
            .close()
            .then(() => {
                console.log('FINISHED')
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    async writeBatchOrderBookTick(
        points: Point[],
        org: string,
        bucket: string,
        pair: string
    ): Promise<void> {
        const writeApi = this.client.getWriteApi(org, bucket, 'ms')
        writeApi.useDefaultTags({ pair })

        writeApi.writePoint(points)

        writeApi
            .close()
            .then(() => {
                console.log('FINISHED')
            })
            .catch(err => {
                console.log(err.message)
            })
    }
}

export default Influx
