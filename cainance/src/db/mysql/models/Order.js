"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const orderDefine = sequelize => {
    const Order = sequelize.define('orders', {
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
            allowNull: false,
        },
        pairId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                key: 'id',
                model: 'pairs',
            },
        },
        userId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                key: 'id',
                model: 'accounts',
            },
        },
        initAllowance: {
            type: sequelize_1.DataTypes.DECIMAL(65, 8).UNSIGNED,
            allowNull: false,
        },
        allowance: {
            type: sequelize_1.DataTypes.DECIMAL(65, 8).UNSIGNED,
            allowNull: false,
        },
        price: {
            type: sequelize_1.DataTypes.DECIMAL(65, 8).UNSIGNED,
            allowNull: false,
        },
        initAmount: {
            type: sequelize_1.DataTypes.DECIMAL(65, 8).UNSIGNED,
            allowNull: false,
        },
        amount: {
            type: sequelize_1.DataTypes.DECIMAL(65, 8).UNSIGNED,
            allowNull: false,
        },
        orderSide: {
            type: sequelize_1.DataTypes.ENUM('ASK', 'BID'),
            allowNull: false,
        },
        orderType: {
            type: sequelize_1.DataTypes.ENUM('LIMIT', 'MARKET', 'STOP_LIMIT', 'OCO'),
            allowNull: false,
        },
        active: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
        status: {
            type: sequelize_1.DataTypes.ENUM('FILLED', 'PARTIALLY_FILLED', 'CANCELED', 'EXPIRED'),
            allowNull: true,
        },
    }, {
        timestamps: true,
        createdAt: true,
        updatedAt: true,
    });
    return Order;
};
exports.default = orderDefine;
//# sourceMappingURL=Order.js.map