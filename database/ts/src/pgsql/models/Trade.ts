import { Sequelize, DataTypes } from 'sequelize'

const tradeDefine = sequelize => {
    const Trade = sequelize.define('trades', {
        pairId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                key: 'id',
                model: 'orders',
            },
        },
        price: {
            type: DataTypes.DECIMAL(65, 8).UNSIGNED,
            allowNull: false,
        },
        executedPrice: {
            type: DataTypes.DECIMAL(65, 8).UNSIGNED,
            allowNull: false,
        },
        fee: {
            type: DataTypes.DECIMAL(65, 8).UNSIGNED,
            allowNull: false,
        },
    })

    return Trade
}

export type Trade = {
    pairId: number
    orderId: number
    price: number
    executedPrice: number
    fee: number
    createdAt?: any
    updatedAt?: any
}

export default tradeDefine
