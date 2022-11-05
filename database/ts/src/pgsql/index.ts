import { Sequelize } from 'sequelize'

import orderDefine, { Order } from './models/Order'
import tradeDefine, { Trade } from './models/Trade'
import { spotWalletDefine } from './models/Wallet'

export { Order, Trade }

class CainanceSequel {
    static sequelize: any
    static Order: any
    static Trade: any
    static SpotWallet: any

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
            logging?: boolean | ((input) => void)
        } = {}
    ): Promise<void> {
        options.port = options.port ?? 5432
        options.dev = options.dev ?? true
        options.logging = options.logging ?? console.log
        options.sync = options.sync ?? false
        options.force = options.force ?? false

        CainanceSequel.sequelize = new Sequelize(database, user, password, {
            host,
            dialect: 'postgres',
            logging: options.logging,
            port: options.port,
            dialectOptions: { connectTimeout: 30000 },
        })

        try {
            await CainanceSequel.sequelize.authenticate()
            console.log('pgSQL connection has been established successfully.')
        } catch (err) {
            console.log('Unable to connect to pgSQL', err.message)
        }

        CainanceSequel.initModel()
        CainanceSequel.initAssociation()

        if (options.sync) {
            await CainanceSequel.sync(options.dev, options.force)
        }
    }

    private static async sync(dev: boolean, force: boolean): Promise<void> {
        await CainanceSequel.sequelize
            .sync({ alter: true, force })
            .then(() => console.log('all models have been synced'))
    }

    private static initModel(): void {
        CainanceSequel.Order = orderDefine(CainanceSequel.sequelize)
        CainanceSequel.Trade = tradeDefine(CainanceSequel.sequelize)

        CainanceSequel.SpotWallet = spotWalletDefine(CainanceSequel.sequelize)
    }

    private static initAssociation(): void {
        /* An Order has many Trade(s) */
        CainanceSequel.Order.hasMany(CainanceSequel.Trade, {
            foreignKey: {
                allowNull: false,
            },
        })
        CainanceSequel.Trade.belongsTo(CainanceSequel.Order)
    }
}

export default CainanceSequel
