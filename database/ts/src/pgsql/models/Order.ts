import { Sequelize, DataTypes } from 'sequelize'

const orderDefine = sequelize => {
    const Order = sequelize.define('orders', {
        tradingPairId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
            type: DataTypes.ENUM,
            values: ['ask', 'bid'],
            allowNull: false,
        },
        orderType: {
            type: DataTypes.ENUM,
            values: ['limit', 'market', 'stop_limit', 'oco'],
            allowNull: false,
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM,
            values: [
                'pending',
                'filled',
                'partially_filled',
                'canceled',
                'expired',
            ],
            defaultValue: 'pending',
            allowNull: false,
        },
    })

    return Order
}

export type Order = {
    tradingPairId: number
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
    createdAt?: any
    updatedAt?: any
}

export default orderDefine
