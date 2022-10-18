import { Sequelize } from 'sequelize'
import Models from './models'

class CainanceSequel {
    static sequelize: any
    static Pair: any
    static Order: any
    static Trade: any
    static Account: any

    public static async connect(
        {
            database,
            user,
            password,
            host,
        }: {
            database: string
            user: string
            password: string
            host: string
        },
        options: {
            port?: number
            sync?: boolean
            dev?: boolean
            force?: boolean
            logging?: boolean
        } = {}
    ): Promise<void> {
        options.port = options.port ?? 25060
        options.dev = options.dev ?? true
        options.logging = options.logging ?? false
        options.sync = options.sync ?? false
        options.force = options.force ?? false

        CainanceSequel.sequelize = new Sequelize(database, user, password, {
            host,
            dialect: 'mysql',
            logging: options.logging,
            port: options.port,
            dialectOptions: { connectTimeout: 30000 },
        })

        try {
            await CainanceSequel.sequelize.authenticate()
            console.log('MySQL connection has been established successfully.')
        } catch (err) {
            console.log('Unable to connect to MySQL', err.message)
        }

        CainanceSequel.initModel()

        if (options.sync) {
            await CainanceSequel.sync(options.dev, options.force)
        }
    }

    private static async sync(dev: boolean, force: boolean): Promise<void> {
        if (dev) {
            await CainanceSequel.sequelize
                .sync({ alter: true, match: /dev$/, force }) // match all database end with 'dev'
                .then(() => console.log('all models have been synced'))
        } else {
            await CainanceSequel.sequelize
                .sync({ alter: true, force })
                .then(() => console.log('all models have been synced'))
        }
    }

    private static initModel(): void {
        CainanceSequel.Pair = Models.pairDefine(CainanceSequel.sequelize)
        CainanceSequel.Order = Models.orderDefine(CainanceSequel.sequelize)
        CainanceSequel.Trade = Models.tradeDefine(CainanceSequel.sequelize)
        CainanceSequel.Account = Models.accountDefine(CainanceSequel.sequelize)

        CainanceSequel.Order.belongsTo(CainanceSequel.Pair)
        CainanceSequel.Order.belongsTo(CainanceSequel.Account, {
            foreignKey: 'userId',
        })
        CainanceSequel.Account.hasMany(CainanceSequel.Order, {
            foreignKey: 'userId',
        })
    }
}

export default CainanceSequel
