"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const orderDefine = sequelize => {
    const Order = sequelize.define('orders', {
        tradingPairId: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
        accountId: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
        initAllowance: {
            type: sequelize_1.DataTypes.DECIMAL(19, 8).UNSIGNED,
            allowNull: false,
        },
        allowance: {
            type: sequelize_1.DataTypes.DECIMAL(19, 8).UNSIGNED,
            allowNull: false,
        },
        price: {
            type: sequelize_1.DataTypes.DECIMAL(19, 8).UNSIGNED,
            allowNull: false,
        },
        initAmount: {
            type: sequelize_1.DataTypes.DECIMAL(19, 8).UNSIGNED,
            allowNull: false,
        },
        amount: {
            type: sequelize_1.DataTypes.DECIMAL(19, 8).UNSIGNED,
            allowNull: false,
        },
        orderSide: {
            type: sequelize_1.DataTypes.ENUM,
            values: ['ask', 'bid'],
            allowNull: false,
        },
        orderType: {
            type: sequelize_1.DataTypes.ENUM,
            values: ['limit', 'market', 'stop_limit', 'oco'],
            allowNull: false,
        },
        active: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
        status: {
            type: sequelize_1.DataTypes.ENUM,
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
    });
    return Order;
};
exports.default = orderDefine;
//# sourceMappingURL=Order.js.map