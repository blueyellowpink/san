import { DataTypes } from 'sequelize'

const orderDefine = sequelize => {
    const order = sequelize.define(
        'orders',
        {
            tradingPair: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            accountId: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            initAllowance: {
                type: DataTypes.DECIMAL(19, 8).UNSIGNED,
                allowNull: false,
            },
            allowance: {
                type: DataTypes.DECIMAL(19, 8).UNSIGNED,
                allowNull: false,
            },
            price: {
                type: DataTypes.DECIMAL(19, 8).UNSIGNED,
                allowNull: false,
            },
            initAmount: {
                type: DataTypes.DECIMAL(19, 8).UNSIGNED,
                allowNull: false,
            },
            amount: {
                type: DataTypes.DECIMAL(19, 8).UNSIGNED,
                allowNull: false,
            },
            orderSide: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            orderType: {
                type: DataTypes.INTEGER,
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
                    'new',
                    'filled',
                    'partially_filled',
                    'canceled',
                    'rejected',
                    'expired',
                ],
                defaultValue: 'new',
                allowNull: false,
            },
        },
        {
            indexes: [
                {
                    using: 'BTREE',
                    fields: ['accountId'],
                },
            ],
        }
    )

    return order
}

export type Order = {
    tradingPair: string
    accountId: string
    initAllowance: number
    allowance: number
    price: number
    initAmount: number
    amount: number
    orderSide: number
    orderType: number
    active: boolean
    status: string
    createdAt?: any
    updatedAt?: any
}

export default orderDefine
