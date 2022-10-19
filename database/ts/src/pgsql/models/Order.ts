import { Sequelize, DataTypes } from 'sequelize'

const orderDefine = sequelize => {
    const Order = sequelize.define(
        'orders',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
                allowNull: false,
            },
            pairId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    key: 'id',
                    model: 'pairs',
                },
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    key: 'id',
                    model: 'accounts',
                },
            },
            initAllowance: {
                type: DataTypes.DECIMAL(65, 8).UNSIGNED,
                allowNull: false,
            },
            allowance: {
                type: DataTypes.DECIMAL(65, 8).UNSIGNED,
                allowNull: false,
            },
            price: {
                type: DataTypes.DECIMAL(65, 8).UNSIGNED,
                allowNull: false,
            },
            initAmount: {
                type: DataTypes.DECIMAL(65, 8).UNSIGNED,
                allowNull: false,
            },
            amount: {
                type: DataTypes.DECIMAL(65, 8).UNSIGNED,
                allowNull: false,
            },
            orderSide: {
                type: DataTypes.ENUM('ASK', 'BID'),
                allowNull: false,
            },
            orderType: {
                type: DataTypes.ENUM('LIMIT', 'MARKET', 'STOP_LIMIT', 'OCO'),
                allowNull: false,
            },
            active: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
                allowNull: false,
            },
            status: {
                type: DataTypes.ENUM(
                    'FILLED',
                    'PARTIALLY_FILLED',
                    'CANCELED',
                    'EXPIRED'
                ),
                allowNull: true,
            },
        },
        {
            timestamps: true,
            createdAt: true,
            updatedAt: true,
        }
    )

    return Order
}

export type Order = {
    id: number
    pairId: number
    userId: number
    initAllowance: number
    allowance: number
    price: number
    initAmount: number
    amount: number
    orderSide: string
    orderType: string
    active: boolean
    status: string
    createdAt: any
    updatedAt: any
}

export default orderDefine
