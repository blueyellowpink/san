import { DataTypes } from 'sequelize'

const tradeDefine = sequelize => {
    const Trade = sequelize.define('trades', {
        price: {
            type: DataTypes.DECIMAL(19, 8).UNSIGNED,
            allowNull: false,
        },
        executedPrice: {
            type: DataTypes.DECIMAL(19, 8).UNSIGNED,
            allowNull: false,
        },
        fee: {
            type: DataTypes.DECIMAL(19, 8).UNSIGNED,
            allowNull: false,
        },
    })

    return Trade
}

export type Trade = {
    price: number
    executedPrice: number
    fee: number
    createdAt?: any
    updatedAt?: any
}

export default tradeDefine
