import { Sequelize, DataTypes } from 'sequelize'

const tradeDefine = sequelize => {
    const Trade = sequelize.define(
        'trades',
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
                allowNull: false,
            },
            pairId: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                references: {
                    key: 'id',
                    model: 'pairs',
                },
            },
            orderId: {
                type: DataTypes.INTEGER.UNSIGNED,
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
            executed: {
                type: DataTypes.DECIMAL(65, 8).UNSIGNED,
                allowNull: false,
            },
            fee: {
                type: DataTypes.DECIMAL(65, 8).UNSIGNED,
                allowNull: false,
            },
        },
        {
            timestamps: true,
            createdAt: true,
            updatedAt: true,
        }
    )

    return Trade
}

export type Trade = {
    id: number
    pairId: number
    orderId: number
    price: number
    executed: number
    fee: number
    createdAt: any
    updatedAt: any
}

export default tradeDefine
