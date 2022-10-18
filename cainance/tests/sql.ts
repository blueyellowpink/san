import 'dotenv/config'
import { CainanceConfig, CainanceSequel } from '../dist'
import { Sequelize } from 'sequelize'

const createPairs = async () => {
    const pairs = [
        'SOL/USDT',
        'BNB/USDT',
        'ETH/USDT',
        'BTC/USDT',

        'SOL/BUSD',
        'BNB/BUSD',
        'ETH/BUSD',
        'BTC/BUSD',
    ]

    for (const pair of pairs) {
        const resp = await CainanceSequel.Pair.create({
            name: pair,
            slug: pair.toLowerCase().replace('/', '-'),
        })
    }
}

!(async () => {
    await CainanceSequel.connect(
        {
            database: CainanceConfig.MYSQL_DB,
            user: CainanceConfig.MYSQL_USER,
            password: CainanceConfig.MYSQL_PASSWORD,
            host: CainanceConfig.MYSQL_HOST,
        },
        {
            sync: false,
            dev: true,
        }
    )

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
})()
